export function dateTimeFormat(
	date: Date | string | number,
	fmt = "yyyy-MM-dd HH:mm:ss",
) {
	if (!date) {
		return "";
	}
	if (typeof date === "string") {
		date = date.replace("T", " ").replace("Z", "");
		date = new Date(date.replace(/-/g, "/"));
	}
	if (typeof date === "number") {
		date = new Date(date);
	}
	const o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
		"H+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		S: date.getMilliseconds(),
	};
	type To = keyof typeof o;
	const week = {
		"0": "\u65E5",
		"1": "\u4E00",
		"2": "\u4E8C",
		"3": "\u4E09",
		"4": "\u56DB",
		"5": "\u4E94",
		"6": "\u516D",
	};
	type Tweek = keyof typeof week;
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length),
		);
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(RegExp.$1.length > 1
				? RegExp.$1.length > 2
					? "\u661F\u671F"
					: "\u5468"
				: "") + week[(date.getDay() + "") as Tweek],
		);
	}
	for (const k in o) {
		const kk = k as To;
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				(RegExp.$1.length === 1
					? o[kk]
					: ("00" + o[kk]).substr(("" + o[kk]).length)) as string,
			);
		}
	}
	return fmt;
}
