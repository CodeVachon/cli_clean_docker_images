import { isSemanticVersion } from "./isSemanticVersion";
import { SemanticVersion } from "./types";

/**
 * Sort an Array of Versions
 *
 * @param versions The Semantic Versions to be sorted
 * @returns an New Array of Sorted Versions
 */
export function sortSemanticVersions(
    ...versions: Array<SemanticVersion> | [Array<SemanticVersion>]
): Array<SemanticVersion> {
    if (versions.length === 1) {
        // Handle if an Array is passed as a single argument
        if (Array.isArray(versions[0])) {
            return sortSemanticVersions(...versions[0]);
        } else {
            return versions as Array<SemanticVersion>;
        }
    } else {
        if ((versions as Array<SemanticVersion>).every(isSemanticVersion)) {
            return ([...versions] as Array<SemanticVersion>).sort((a, b) => {
                const [aMajor, aMinor, aPatch, aRevision] = a
                    .split(".")
                    .map((v) => v.split("-")[0]);
                const [bMajor, bMinor, bPatch, bRevision] = b
                    .split(".")
                    .map((v) => v.split("-")[0]);

                if (Number(aMajor) < Number(bMajor)) {
                    return -1;
                } else if (Number(aMajor) > Number(bMajor)) {
                    return 1;
                } else {
                    if (Number(aMinor) < Number(bMinor)) {
                        return -1;
                    } else if (Number(aMinor) > Number(bMinor)) {
                        return 1;
                    } else {
                        if (Number(aPatch) < Number(bPatch)) {
                            return -1;
                        } else if (Number(aPatch) > Number(bPatch)) {
                            return 1;
                        } else {
                            if (aRevision < bRevision) {
                                return -1;
                            } else if (aRevision > bRevision) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    }
                }
            });
        } else {
            throw new Error("Expected very value to be a Semantic Version");
        }
    }
} // sortSemanticVersions
