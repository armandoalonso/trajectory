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
      this.targetX = -1;
      this.targetY = -1;
      this.time = -1;
      this.vx = 0;
      this.vy = 0;
      this.curX = 0;
      this.curY = 0;
      this.currentTime = 0;
      this.stopOnSolid = false;
      this.stopOnTargetReached = false;
      this.setMovementAngle = false;

      //variables used during loop
      this._loopTimeStep = 0;
      this._loopX = 0;
      this._loopY = 0;
      this._loopAngle = 0;

      this._drawLineInstances = [];
      this._objectPool = new globalThis._P305.objectPool(this._runtime);

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

      this.CheckIfTargetReached(wi.GetX(), wi.GetY());
      this.CheckForCollision(startX, startY, starAngle);
      this.currentTime += dt;
    }

    StartTrajectory() {
      this.SetEnabled(true);
    }

    StopTrajectory() {
      this.SetEnabled(false);
    }

    CheckIfTargetReached(startX, startY) {
      if(this.stopOnTargetReached && this.targetX != -1 && this.targetY != -1) {
        const dist = C3.distanceTo(startX, startY, this.targetX, this.targetY);

        if(dist < 1) {
          this.StopMovement();
          debugger;
          this.Trigger(C3.Behaviors.piranha305_trajectory.Cnds.OnTargetReached);
        }
      }
    }

    DrawTrajectoryLineWithEndSprite(sprite, endSprite, layer, steps, time, setAngle) {
      this._objectPool.Preload(sprite, layer, steps+steps/2);
      const instances = this._objectPool.Get(sprite, layer, steps);
      const timeStep = time / steps;

      for(let i = 0; i < steps; i++) {
        const t = timeStep * i;
        const instance = instances[i];
        instance.GetWorldInfo().SetXY(this.GetXAt(t), this.GetYAt(t));
        instance.GetWorldInfo().SetAngle(setAngle ? this.GetAngleAt(t) : 0);
        this._drawLineInstances.push(instance);
      }

      //draw end sprite
      if(endSprite) {
        const instance = this._objectPool.GetOne(endSprite, layer);
        instance.GetWorldInfo().SetXY(this.GetXAt(time), this.GetYAt(time));
        instance.GetWorldInfo().SetAngle(setAngle ? this.GetAngleAt(time) : 0);
        this._drawLineInstances.push(instance);
      }
    }

    DrawTrajectoryLine(sprite, layer, steps, time, setAngle) {
      this._objectPool.Preload(sprite, layer, steps+steps/2);
      const instances = this._objectPool.Get(sprite, layer, steps);
      const timeStep = time / steps;

      for(let i = 0; i < steps; i++) {
        const t = timeStep * i;
        const instance = instances[i];
        instance.GetWorldInfo().SetXY(this.GetXAt(t), this.GetYAt(t));
        instance.GetWorldInfo().SetAngle(setAngle ? this.GetAngleAt(t) : 0);
        this._drawLineInstances.push(instance);
      }
    }

    ClearDrawnTrajectory() {
      this._drawLineInstances.forEach((instance) => {
        this._objectPool.AddToPool(instance);
      });
      this._drawLineInstances = [];
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

    OnTargetReached() {
      return true;
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
      this.targetX = -1;
      this.targetY = -1;
      this.time = -1;

      if(start){
        this.Trigger(C3.Behaviors.piranha305_trajectory.Cnds.OnStartMovingAlongTrajectory);
      }
    };

    SetTrajectoryByTarget(targetX, targetY, time, start, stopOnSolid, setMovementAngle, stopOnTargetReached) {
      const wi = this._inst.GetWorldInfo();
      this.curX = wi.GetX();
      this.curY = wi.GetY();

      this.SetEnabled(start);
      this.stopOnSolid = stopOnSolid;
      this.stopOnTargetReached = stopOnTargetReached;
      this.targetX = targetX;
      this.targetY = targetY;
      this.time = time;
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

    SetSetTrajectoryByTaregtAngle(targetX, targetY, angle, start, stopOnSolid, setMovementAngle, stopOnTargetReached) {
      const wi = this._inst.GetWorldInfo();
      this.curX = wi.GetX();
      this.curY = wi.GetY();

      this.SetEnabled(start);
      this.stopOnSolid = stopOnSolid;
      this.stopOnTargetReached = stopOnTargetReached;
      this.targetX = targetX;
      this.targetY = targetY;
      this.vx = (targetX - this.curX)/time;
      this.vy = (targetY - this.curY + 0.5 * this.GetGravityY() * time * time)/time;
      this.angle = angle;
      //if(this.vx < 0) {
      //  this.angle += 180;
      //}
      this.velocity = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
      this.setMovementAngle = setMovementAngle;
      this.currentTime = 0;
      this.time = -1;

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

    MaxHeight() {
      const {vy} = this.GetVectorComponents(this.velocity, this.angle);
      const time = vy / this.GetGravityY();
      const yInverse = this.GetYAt(time);
      const y = this._runtime.GetMainRunningLayout().GetHeight() - yInverse;
      return y;
    }

    Time() {
      return this.time;
    }

    TargetX() {
      return this.targetX;
    }

    TargetY() {
      return this.targetY;
    }

    Velocity() {
      return this.velocity;
    }

    LaunchAngle() {
      return this.angle;
    }

    LoadFromJSON(json) {
      try {
        const data = JSON.parse(json);
        this.LoadFromJson(data);
      } catch(e) {
        console.warn("Invalid JSON", e);
      }
    }

    AsJSON() {
      return JSON.stringify(this.SaveToJson());
    }

    PredictTrajectoryCollision(steps, time) {
      const timeStep = (time * 3) / steps;
      const wi = this._inst.GetWorldInfo();
      const collisionEngine = this._runtime.GetCollisionEngine();
      const points = [];
      for(let i = 0; i < steps; i++) {
        const t = timeStep * i;
        points.push({x: this.GetXAt(t), y: this.GetYAt(t)});
      }

      // create temp rect to test collision
      const tempRect = C3.New(C3.Rect);
      tempRect.copy(wi.GetBoundingBox());

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const w = (tempRect.width() / 2);
        const h = (tempRect.height() / 2);
        tempRect.set(point.x-w, point.y-h, point.x+w, point.y-h);
        const collision = collisionEngine.TestRectOverlapSolid(tempRect, this._inst);

        if(collision){
          this.collisionX = tempRect.midX();
          this.collisionY = tempRect.midY();
          this.Trigger(C3.Behaviors.piranha305_trajectory.Cnds.OnPredictedCollision);
          return;
        };
      }

      this.Trigger(C3.Behaviors.piranha305_trajectory.Cnds.NoPredictedCollisionFound);
    }

    OnPredictedCollision() {
      return true;
    }

    NoPredictedCollisionFound() {
      return true;
    }

    CollisionX() {
      return this.collisionX;
    }

    CollisionY() {
      return this.collisionY;
    }

    TimeOfFlightToTarget(initialVelocity, targetX, targetY) {
      const targetDistance = Math.sqrt(Math.pow(targetX, 2) + Math.pow(targetY, 2));
      const launchAngle = Math.atan2(targetPosition.y, targetPosition.x);
      
      const timeOfFlight = (2 * initialVelocity * Math.sin(launchAngle)) / this.gravity;
      return timeOfFlight;
    } 

    _DoForEachTrigger(eventSheetManager, currentEvent, solModifiers, oldFrame, newFrame) {
      eventSheetManager.PushCopySol(solModifiers);
      currentEvent.Retrigger(oldFrame, newFrame);
      eventSheetManager.PopSol(solModifiers)
    }

    ForEachStepInTrajectory(steps, time) {
      const runtime = this._runtime;
      const eventSheetManager = runtime.GetEventSheetManager();
      const currentEvent = runtime.GetCurrentEvent();
      const solModifiers = currentEvent.GetSolModifiers();
      const eventStack = runtime.GetEventStack();
      const oldFrame = eventStack.GetCurrentStackFrame();
      const newFrame = eventStack.Push(currentEvent);

      const timeStep = time / steps;

      runtime.SetDebuggingEnabled(false); 
      for(let i = 0; i < steps; i++) {
        this._loopTimeStep = timeStep * i;
        this._loopX = this.GetXAt(this._loopTimeStep);
        this._loopY = this.GetYAt(this._loopTimeStep);
        this._loopAngle = this.GetAngleAt(this._loopTimeStep);

        this._DoForEachTrigger(eventSheetManager, currentEvent, solModifiers, oldFrame, newFrame);
      }
      runtime.SetDebuggingEnabled(true);

      eventStack.Pop();
      return false;
    }

    LoopTimeStep() {
       return this._loopTimeStep;
    }

    LoopX() {
        return this._loopX;
    }

    LoopY() {
        return this._loopY;
    }

    LoopAngle() {
        return  this.ToDegrees(this._loopAngle);
    }

    Release() {
      super.Release();
      this._objectPool = null;
    }

    SaveToJson() {
      return {
        enabled: this.enabled,
        isMoving: this.isMoving,
        gravity: this.gravity,
        gravityAngle: this.gravityAngle,
        velocity: this.velocity,
        angle: this.angle,
        vx: this.vx,
        vy: this.vy,
        curX: this.curX,
        curY: this.curY,
        currentTime: this.currentTime,
        stopOnSolid: this.stopOnSolid,
        setMovementAngle: this.setMovementAngle,
        _loopTimeStep: this._loopTimeStep,
        _loopX: this._loopX,
        _loopY: this._loopY,
        _loopAnle: this._loopAnle,
        _drawLineInstances: this._drawLineInstances.map((instance) => instance.GetUID()),
      };
    }

    LoadFromJson(o) {
      this.enabled = o.enabled;
      this.isMoving = o.isMoving;
      this.gravity = o.gravity;
      this.gravityAngle = o.gravityAngle;
      this.velocity = o.velocity;
      this.angle = o.angle;
      this.vx = o.vx;
      this.vy = o.vy;
      this.curX = o.curX;
      this.curY = o.curY;
      this.currentTime = o.currentTime;
      this.stopOnSolid = o.stopOnSolid;
      this.setMovementAngle = o.setMovementAngle;
      this._loopTimeStep = o._loopTimeStep;
      this._loopX = o._loopX;
      this._loopY = o._loopY;
      this._loopAnle = o._loopAnle;
      this._drawLineInstances = o._drawLineInstances.map((uid) => this._runtime.GetInstanceByUID(uid));
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
