import { sleep } from "./sleep";
import { performance } from "perf_hooks";

describe("sleep function", () => {
    it("should delay execution for the specified number of milliseconds", async () => {
        const delay = 300; // 3 ms
        const start = performance.now();

        await sleep(delay);

        const end = performance.now();
        const elapsed = end - start;

        expect(elapsed).toBeGreaterThanOrEqual(delay);
    });
});
