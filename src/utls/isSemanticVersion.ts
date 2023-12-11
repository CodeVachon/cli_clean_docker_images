import { SemanticVersion } from "./types";

/**
 * Check to see if a Value is a Semantic Version
 * @param value the value to check
 * @returns if the passed value matches a Semantic Version
 */
export function isSemanticVersion(value: SemanticVersion | string): value is SemanticVersion {
    if (String(value ?? "").length > 0) {
        const split = value.split(".");

        if (split.length >= 3 && split.length <= 4) {
            if (split.length === 3) {
                return split.every((value) => !isNaN(Number(value.split("-")[0])));
            } else {
                const revision = split.pop();
                return split.every((value) => !isNaN(Number(value.split("-")[0])));
            }
        }
    }

    return false;
}
