import { sortSemanticVersions } from "./sortSemanticVersions";

describe("sortSemanticVersions function", () => {
    it("sorts the passed values as expected", () => {
        const testValues = ["2.3.4", "1.2.3", "2.85.2", "1.02.5", "1.1.8", "0.4.23"];
        const expected = ["0.4.23", "1.1.8", "1.2.3", "1.02.5", "2.3.4", "2.85.2"];

        const result = sortSemanticVersions(...testValues);

        expect(result).toHaveLength(testValues.length);
        expect(result).toMatchObject(expected);
    });

    it("sorts the passed values as expected", () => {
        const testValues = ["2.3.4", "1.2.3", "2.85.2", "1.02.5", "1.1.8", "0.4.23"];
        const expected = ["0.4.23", "1.1.8", "1.2.3", "1.02.5", "2.3.4", "2.85.2"];

        const result = sortSemanticVersions(testValues);

        expect(result).toHaveLength(testValues.length);
        expect(result).toMatchObject(expected);
    });

    it("throws an error if a non-semantic version is passed", () => {
        expect(() => sortSemanticVersions("1.b.4", "1.2.3")).toThrowError(
            new RegExp("Semantic Version", "i")
        );
    });
});
