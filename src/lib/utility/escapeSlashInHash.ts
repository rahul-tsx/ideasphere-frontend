export const escapeSlashInHash = (hash: string) => {
	// Replace all '/' with '%2F' in the given string
	return hash.replace(/\//g, '%2F');
};
