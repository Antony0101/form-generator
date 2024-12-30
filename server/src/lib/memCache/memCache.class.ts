class MemCache<T> {
    data: Map<string, { createdAt: Date; value: T }>;
    lastCleaned: Date;
    expiryTime: number;
    cleaningInterval = 10;

    /**
     * MemCache is a in-memory cache
     *
     * @param {number} expiryTime - expiry time in seconds default 10 mins
     */
    constructor(expiryTime: number = 600) {
        this.data = new Map();
        this.lastCleaned = new Date();
        this.expiryTime = expiryTime;
    }

    add(key: string, value: T) {
        if (
            Date.now() - this.lastCleaned.getTime() >
            this.cleaningInterval * 60 * 1000
        ) {
            // bulk cleaning logic for expired entries is pending
        }
        this.data.set(key, { createdAt: new Date(), value });
    }

    remove(key: string) {
        return this.data.delete(key);
    }

    get(key: string) {
        const data = this.data.get(key);
        if (!data) {
            return null;
        }
        if (Date.now() - data.createdAt.getTime() > this.expiryTime * 1000) {
            this.remove(key);
            return null;
        }
        return data.value;
    }
}

export default MemCache;
