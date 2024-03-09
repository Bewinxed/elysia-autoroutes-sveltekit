export function handleParameters(token: string) {
	const replacements = [
		// Handle wildcard parameters - [...param]
		{ regex: /\[\.\.\.(\w+)\]/g, replacement: ":$1*" },
		// Handle optional parameters - [[param]]
		{ regex: /\[\[(\w+)\]\]/g, replacement: ":$1?" },
		// Handle generic square bracket based routes - [id] -> :id
		{
			regex: /\[(.*?)\]/g,
			replacement: (_subString: string, match: string) => `:${match}`,
		},
	];

	let url = token;

	for (const { regex, replacement } of replacements) {
		url = url.replace(regex, replacement as any);
	}

	return url;
}
