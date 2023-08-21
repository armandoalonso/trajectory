function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      this.enabled = false;
      this.isMoving = false;
      this.gravity = 0;
      this.gravityAngle = 270;
      this.velocity = 0;
      this.angle = 0;
      this.vx = 0;
      this.vy = 0;
      this.curX = 0;
      this.curY = 0;
      this.currentTime = 0;
      this.stopOnSolid = false;
      this.setMovementAngle = false;

      this.drawLineInstances = [];
      this.objectPool = new globalThis._P305.objectPool(this._runtime);

      if (properties) {
        this.enabled = properties[0];
        this.velocity = properties[1];
        this.angle = properties[2];
        this.gravity = properties[3];
        this.gravityAngle = properties[4];
        this.stopOnSolid = properties[5];
        this.setMovementAngle = properties[6];
      }

      if(this.enabled) {
        this._StartTicking();
      }
    }

    Tick(){
      if(!this.enabled) {
        this._StopTicking();
        this.isMoving = false;
        return;
      }

      this.isMoving = true;
      const wi = this._inst.GetWorldInfo();
      const dt = this._runtime.GetDt(this.inst);

      const startX = wi.GetX();
      const startY = wi.GetY();
      const starAngle = wi.GetAngle();
      
      wi.SetXY(this.GetXAt(this.currentTime), this.GetYAt(this.currentTime));
      wi.SetAngle(this.setMovementAngle && this.currentTime > 0.1 ? this.GetAngleAt(this.currentTime) : 0);
      wi.SetBboxChanged();

      this.CheckForCollision(startX, startY, starAngle);
      this.currentTime += dt;
    }

    DrawTrajectoryLineWithEndSprite(sprite, endSprite, layer, steps, time, setAngle) {
      this.objectPool.Preload(sprite, layer, steps+steps/2);
      const instances = this.objectPool.Get(sprite, layer, steps);
      const timeStep = time / steps;

      for(let i = 0; i < steps; i++) {
        const t = timeStep * i;
        const instance = instances[i];
        instance.GetWorldInfo().SetXY(this.GetXAt(t), this.GetYAt(t));
        instance.GetWorldInfo().SetAngle(setAngle ? this.GetAngleAt(t) : 0);
        this.drawLineInstances.push(instance);
      }

      //draw end sprite
      if(endSprite) {
        const instance = this.objectPool.GetOne(endSprite, layer);
        instance.GetWorldInfo().SetXY(this.GetXAt(time), this.GetYAt(time));
        instance.GetWorldInfo().SetAngle(setAngle ? this.GetAngleAt(time) : 0);
        this.drawLineInstances.push(instance);
      }
    }

    DrawTrajectoryLine(sprite, layer, steps, time, setAngle) {
      this.objectPool.Preload(sprite, layer, steps+steps/2);
      const instances = this.objectPool.Get(sprite, layer, steps);
      const timeStep = time / steps;

      for(let i = 0; i < steps; i++) {
        const t = timeStep * i;
        const instance = instances[i];
        instance.GetWorldInfo().SetXY(this.GetXAt(t), this.GetYAt(t));
        instance.GetWorldInfo().SetAngle(setAngle ? this.GetAngleAt(t) : 0);
        this.drawLineInstances.push(instance);
      }
    }

    ClearDrawnTrajectory() {
      this.drawLineInstances.forEach((instance) => {
        this.objectPool.AddToPool(instance);
      });
      this.drawLineInstances = [];
    }

    SetEnabled(enabled) {
      this.enabled = enabled;
      if (this.enabled) {
        this._StartTicking();
      } else {
        this._StopTicking();
      }
    };

    SetGravityAngle(gravityAngle) {
      this.gravityAngle = gravityAngle;
    };

    OnStartMovingAlongTrajectory() {
      return true;
    };

    IsMovingAlongTrajectory() {
      return this.isMoving;
    }

    SetTrajectoryByVelocity(velocity, angle, start, stopOnSolid, setMovementAngle) {
      const {vx, vy} = this.GetVectorComponents(velocity, angle);
      const wi = this._inst.GetWorldInfo();

      this.SetEnabled(start);
      this.stopOnSolid = stopOnSolid;
      this.velocity = velocity;
      this.angle = angle;
      this.setMovementAngle = setMovementAngle;
      this.vx = vx;
      this.vy = vy;
      this.curX = wi.GetX();
      this.curY = wi.GetY();
      this.currentTime = 0;

      if(start){
        this.Trigger(C3.Behaviors.piranha305_trajectory.Cnds.OnStartMovingAlongTrajectory);
      }
    };

    SetTrajectoryByTarget(targetX, targetY, time, start, stopOnSolid, setMovementAngle) {
      const wi = this._inst.GetWorldInfo();
      this.curX = wi.GetX();
      this.curY = wi.GetY();

      this.SetEnabled(start);
      this.stopOnSolid = stopOnSolid;
      this.vx = (targetX - this.curX)/time;
      this.vy = (targetY - this.curY + 0.5 * this.GetGravityY() * time * time)/time;
      this.velocity = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
      this.angle = this.ToDegrees(Math.atan(this.vy/this.vx));
      if(this.vx < 0) {
        this.angle += 180;
      }
      this.setMovementAngle = setMovementAngle;
      this.currentTime = 0;

      if(start){
        this.Trigger(C3.Behaviors.piranha305_trajectory.Cnds.OnStartMovingAlongTrajectory);
      }
    };

    CheckForCollision(startX, startY, starAngle) {
      const collisionEngine = this._runtime.GetCollisionEngine();
      if(this.stopOnSolid && collisionEngine.TestOverlapSolid(this._inst)) {
        this.StopMovement();

        const wi = this._inst.GetWorldInfo();
        const x = wi.GetX();
        const y = wi.GetY();
        const angle = C3.angleTo(x, y, startX, startY);
        const dist = C3.distanceTo(x, y, startX, startY);

        if(!collisionEngine.PushOutSolid(this._inst, Math.cos(angle), Math.sin(angle), Math.max(1, dist))) {
          wi.SetXY(startX, startY);
          wi.SetAngle(starAngle);
          wi.SetBboxChanged();
        }
        this.Trigger(C3.Behaviors.piranha305_trajectory.Cnds.OnHitSolid);
      }
    }

    StopMovement() {
      this.SetEnabled(false);
      this.isMoving = false;
    }

    OnHitSolid() {
      return true;
    } 

    IsEnabled() {
      return true;
    };

    GetXAt(time) {
      const {vx} = this.GetVectorComponents(this.velocity, this.angle);
      const x = vx * time + this.curX - 0.5 * this.GetGravityX() * time * time;
      return x;
    };

    GetYAt(time) {
      const {vy} = this.GetVectorComponents(this.velocity, this.angle);
      const y = vy * time + this.curY - 0.5 * this.GetGravityY() * time * time;
      return y;
    };

    GetVectorComponents(velocity, angle) {
      const vx = velocity * Math.cos(this.ToRadians(angle));
      const vy = velocity * Math.sin(this.ToRadians(angle));
      return {vx, vy};
    };

    GetGravityX() {
      return this.gravity * Math.cos(this.ToRadians(180-this.gravityAngle));
    };

    GetGravityY() {
      return this.gravity * Math.sin(this.ToRadians(180-this.gravityAngle));
    };

    ToRadians(angle) {
      return angle * (Math.PI / 180);
    };

    ToDegrees(angle) {
      return angle * (180 / Math.PI);
    };

    GetVelocityX() {
      const {vx} = this.GetVectorComponents(this.velocity, this.angle);
      return vx
    };

    GetVelocityY() {
      const {vy} = this.GetVectorComponents(this.velocity, this.angle);
      return vy
    };

    GetAngleAt(time) {
      const x1 = this.GetXAt(time);
      const y1 = this.GetYAt(time);
      const x2 = this.GetXAt(time+0.1);
      const y2 = this.GetYAt(time+0.1);
      
      return C3.angleTo(x1, y1, x2, y2);
    }

    GetMaxHeight() {
      const {vy} = this.GetVectorComponents(this.velocity, this.angle);
      const time = vy / this.GetGravityY();
      const yInverse = this.GetYAt(time);
      const y = this._runtime.GetMainRunningLayout().GetHeight() - yInverse;
      return y;
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    LoadFromJson(o) {
      // load state for savegames
    }

    Trigger(method) {
      super.Trigger(method);
      const addonTrigger = addonTriggers.find((x) => x.method === method);
      if (addonTrigger) {
        this.GetScriptInterface().dispatchEvent(new C3.Event(addonTrigger.id));
      }
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }
  };
}
