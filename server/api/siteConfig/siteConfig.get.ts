export default eventHandler(async (event) => {
	const siteConfig = await getConfig(event);
	return siteConfig.map((v) => {
		return {
			key: v.key,
			value: v.value,
			describe: v.describe,
		};
	});
});
