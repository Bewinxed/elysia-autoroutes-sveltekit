import path from "node:path";
import { handleParameters } from "./handleParameters";

export function transformPathToUrl(filePath: string) {
	let url = `/${filePath}`; // Add leading slash to the URL

	// Handle the case when the input is just "/"
	if (url === "/") return url;

	const resultUrl = url
		.split(path.sep)
		.map((part) => handleParameters(part))
		.join("/"); // Map and join the URL parts using handleParameters function

	// Handle SvelteKit-like route naming conventions
	let finalUrl = resultUrl.replace(/\+\w+\.\w+$/g, ""); // Remove '+page.svelte' or similar from the URL
	finalUrl = finalUrl.replace(/\[\.\.\.(\w+)\]/g, ":$1*"); // Replace '[...param]' with ':param*'

	// Remove leading and trailing slashes if they exist
	finalUrl = finalUrl.replace(/^\/+|\/+$/g, "");

	// Handle the case when the result is an empty string
	if (finalUrl === "") return "/";

	// Replace multiple slashes with a single slash
	return `/${finalUrl.replace(/\/{2,}/g, "/")}`;
}
