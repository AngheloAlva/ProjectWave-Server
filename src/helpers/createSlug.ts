export const createSlug = (name: string): string => {
	return name
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
}
