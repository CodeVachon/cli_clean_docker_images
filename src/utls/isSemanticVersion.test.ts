import { isSemanticVersion } from "./isSemanticVersion";

describe("isSemanticVersion function", () => {
    it("should return true for valid semantic versions", () => {
        expect(isSemanticVersion("1.0.0")).toBe(true);
        expect(isSemanticVersion("2.3.4.2")).toBe(true);
        expect(isSemanticVersion("2.3.4.beta")).toBe(true);
        expect(isSemanticVersion("2.3.4-beta.2")).toBe(true);
    });

    it("should return false for invalid semantic versions", () => {
        expect(isSemanticVersion("1.0")).toBe(false);
        expect(isSemanticVersion("2.3.4-beta.2.5")).toBe(false);
        expect(isSemanticVersion("abc")).toBe(false);
    });
});
