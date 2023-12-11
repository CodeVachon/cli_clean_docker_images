import { capitalize } from "./capitalize";

/**
 * camelCase the provided string
 * @param value The value to be camelCased
 * @returns the value camelCased
 */
export const camelCase = (value: string): string => {
    const type = typeof value;
    if (type !== "string") {
        throw new Error(`Expected a string to be passed into camelCase. Got ${type}`);
    }

    const split = value.split(new RegExp("[\\s_-]", "g")).filter((record) => record.length > 0);

    return split
        .map((record, index) => {
            if (index === 0) {
                return record.charAt(0).toLowerCase() + record.slice(1);
            } else {
                return capitalize(record);
            }
        })
        .join("");
};
