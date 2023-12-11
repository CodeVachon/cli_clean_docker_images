import { camelCase } from "./camelCase";

describe("camelCase", () => {
    test("throws an error if a none string is passed in", () => {
        expect(() => {
            // @ts-ignore
            camelCase(true);
        }).toThrowError(new RegExp("boolean", "i"));
    });

    test.each`
        value               | expected
        ${"ReviewQuestion"} | ${"reviewQuestion"}
        ${"Foo Bar"}        | ${"fooBar"}
        ${"foo bar"}        | ${"fooBar"}
        ${"foo_bar"}        | ${"fooBar"}
        ${"foo_bar_baz"}    | ${"fooBarBaz"}
        ${"foo_Bar"}        | ${"fooBar"}
        ${"foo-bar"}        | ${"fooBar"}
        ${"foo-bar-baz"}    | ${"fooBarBaz"}
        ${"foo-Bar"}        | ${"fooBar"}
    `(`returns the expected result for "$value"`, ({ value, expected }) => {
        expect(camelCase(value)).toMatch(expected);
    });
});
