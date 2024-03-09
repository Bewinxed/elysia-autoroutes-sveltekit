import { describe, expect, it } from "bun:test";
import { handleParameters } from "../src/utils";

describe("handleParameters", () => {
	it("1 - :param", () => {
		expect(handleParameters("[param]")).toBe(":param");
	});

	it("2 - index", () => {
		expect(handleParameters("index")).toBe("index");
	});

	it("3 - :param?", () => {
		expect(handleParameters("[[param]]")).toBe(":param?");
	});
});
