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

      this.drawLineInstances = [];

      if (properties) {
        this.enabled = properties[0];
        this.velocity = properties[1];
        this.angle = properties[2];
        this.gravity = properties[3];
        this.gravityAngle = properties[4];
        this.stopOnSolid = properties[5];
      }

      if(this.enabled) {
        this._StartTicking();
      }
    }

    Tick(){
      if(!this.enabled) {
        this._StopTicking();
        return;
      }

      const wi = this._inst.GetWorldInfo();
      const dt = this._runtime.GetDt(this.inst);

      const startX = wi.GetX();
      const startY = wi.GetY();
      const starAngle = wi.GetAngle();
      
      wi.SetXY(
        this.GetXAt(this.currentTime),
        this.GetYAt(this.currentTime)
      );

      wi.SetBboxChanged();
      this.CheckForCollision(startX, startY, starAngle);
      this.currentTime += dt;
    }

    DrawTrajectoryLine(sprite, layer, steps) {
      for(let i = 0; i < steps; i++) {
        const time = i / steps;
        const x = this.GetXAt(time);
        const y = this.GetYAt(time);
        const angle = this.GetAngleAt(i);
        const instance = this._runtime.CreateInstance(sprite, layer, x, y);
        instance.GetWorldInfo().SetAngle(angle);

        this.drawLineInstances.push(instance);
      }
    }

    ClearDrawnTrajectory() {
      this.drawLineInstances.forEach((instance) => {
        this._runtime.DestroyInstance(instance);
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

    SetTrajectoryByVelocity(velocity, angle, start, stopOnSolid) {
      const {vx, vy} = this.GetVectorComponents(velocity, angle);
      const wi = this._inst.GetWorldInfo();

      this.SetEnabled(start);
      this.stopOnSolid = stopOnSolid;
      this.velocity = velocity;
      this.angle = angle;
      this.vx = vx;
      this.vy = vy;
      this.curX = wi.GetX();
      this.curY = wi.GetY();
      this.currentTime = 0;
    };

    SetTrajectoryByTarget(targetX, targetY, time) {
      // implementation
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
      return null;
    };

    GetVelocityY() {
      return null;
    };

    GetAngleAt(time) {
      return null;
    };

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
