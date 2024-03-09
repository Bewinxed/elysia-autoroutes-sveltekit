import { describe, expect, it } from "bun:test";
import { transformPathToUrl } from "../src/utils";

describe("cleanUrlString", () => {
	it("1 - profile", () => {
		expect(transformPathToUrl("user/profile/+page.svelte")).toBe(
			"/user/profile",
		);
	});

	it("2 - profile :id", () => {
		expect(transformPathToUrl("user/profile/[id]")).toBe("/user/profile/:id");
	});

	it("3 - profile wildcard", () => {
		expect(transformPathToUrl("user/[...profile]/settings")).toBe(
			"/user/:profile*/settings",
		);
	});

	it("4 - user :game", () => {
		expect(transformPathToUrl("user/[game]")).toBe("/user/:game");
	});

	it("5 - index", () => {
		expect(transformPathToUrl("/")).toBe("/");
	});

	it("6 - +page.svelte", () => {
		expect(transformPathToUrl("+page.svelte")).toBe("/");
	});

	it("7 - /profile/[game]/+page.svelte", () => {
		expect(transformPathToUrl("/profile/[game]/+page.svelte")).toBe(
			"/profile/:game",
		);
	});

	it("8 - optional parameter", () => {
		expect(transformPathToUrl("/profile/[[game]]/+page.svelte")).toBe(
			"/profile/:game?",
		);
	});
});
