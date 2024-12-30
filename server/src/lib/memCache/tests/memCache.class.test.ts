import { describe, test, expect } from "vitest";
import MemCache from "../memCache.class.js";

describe("MemCache Unit test", () => {
    test("MemCache creation", () => {
        const memCache = new MemCache();
        expect(memCache.data.size, "memCache length").toBe(0);
        expect(memCache.expiryTime, "memCache expiry time").toBe(600);
    });
    test("MemCache creation with expiry", () => {
        const memCache = new MemCache(10);
        expect(memCache.data.size, "memCache length").toBe(0);
        expect(memCache.expiryTime, "memCache expiry time").toBe(10);
    });
    test("MemCache add data and get data", () => {
        const memCache = new MemCache<string>();
        memCache.add("s1", "s1value");
        memCache.add("s2", "s2value");
        expect(
            memCache.data.size,
            "memCache length after first 2 elements",
        ).toBe(2);
        expect(memCache.get("s1"), "memCache get key s1").toBe("s1value");
        expect(memCache.get("s3"), "memCache get s3 which is null").toBe(null);
        memCache.add("s2", "s2newValue");
        expect(memCache.get("s2"), "memCache get key s2 with new Value").toBe(
            "s2newValue",
        );
    });
    test("MemCache data expiry and auto removal of expiry when accessed", () => {
        const memCache = new MemCache<string>();
        memCache.add("s1", "s1value");
        memCache.add("s2", "s2value");
        memCache.expiryTime = 1;
        const s1 = memCache.data.get("s1");
        memCache.data.set("s1", {
            createdAt: new Date(Date.now() - 10000),
            value: s1?.value!,
        });
        expect(memCache.get("s1"), "memCache get s1 which is expired").toBe(
            null,
        );
        expect(memCache.data.size, "memCache size after expiry").toBe(1);
    });
});
