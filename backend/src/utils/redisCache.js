const Redis = require("ioredis");

const redis = new Redis();

const cacheWrapper = async (func) => {
    const newFun = async (...args) => {
        const key = `cache:${func.name}:${JSON.stringify(args)}`;
        const cachedResult = await redis.get(key);
        if (cachedResult) {
            return JSON.parse(cachedResult);
        }
        const result = await func(...args);
        await redis.set(key, JSON.stringify(result), 'EX', 60);
        return result;
    }
    return newFun;
}

module.exports = cacheWrapper;