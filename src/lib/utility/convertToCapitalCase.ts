export const convertToCapitialCase = (
	contentTypes: readonly string[] | string[] 
): string[] => {
	return contentTypes.map(
		(type) => type.charAt(0).toUpperCase() + type.slice(1)
	);
};
