import camelCase from 'camel-case';
let instance = null;

export class Cache{
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }
    cache = {};
    isValueCached(key){
        return this.getCachedValue(key);
    }
    cacheValue(key, value){
        this.cache[camelCase(key)] = value;
    }
    getCachedValue(key){
        return this.cache[camelCase(key)];
    }

}