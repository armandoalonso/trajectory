const objectPool = class ObjectPool {
    constructor(runtime) {
        this._runtime = runtime;
        this._pool = {}
    }

    Preload(objectClass, layer, count) {
        const name = objectClass.GetName();

        if (!this._pool[name]) {
            this._pool[name] = [];
        }

        if (this._pool[name].length >= count) {
            return;
        }

        for (let i = 0; i < count; i++) {
            const instance = this._runtime.CreateInstance(objectClass, layer, 0, 0);
            this._SetEnableInsatnce(instance, false);
            this._pool[name].push(instance);
        }
    }

    GetOne(objectClass, layer) {
        const name = objectClass.GetName();

        if (!this._pool[name]) {
            this._pool[name] = [];
        }

        if (this._pool[name].length === 0) {
            const instance = this._runtime.CreateInstance(objectClass, layer, 0, 0);
            this._SetEnableInsatnce(instance, true);
            return instance;
        }

        const instance = this._pool[name].pop();
        this._SetEnableInsatnce(instance, true);
        return instance;
    }

    Get(objectClass, layer, count) {
        const name = objectClass.GetName();

        if (!this._pool[name]) {
            this._pool[name] = [];
        }

        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(this.GetOne(objectClass, layer));
        }

        return result;
    }

    _SetEnableInsatnce(instance, value) {
        instance.GetWorldInfo().SetVisible(value);
        instance.GetWorldInfo().SetCollisionEnabled(value);
    }

    AddToPool(instance) {
        const name = instance.GetObjectClass().GetName();

        if (!this._pool[name]) {
            this._pool[name] = [];
        }
        
        this._SetEnableInsatnce(instance, false);
        this._pool[name].push(instance);
    }
}

if(!globalThis._P305){
    globalThis._P305 = {};   
}
globalThis._P305.objectPool = objectPool;