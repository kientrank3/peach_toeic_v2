export function capitalize(name) {
	name = name.trim();
	name = name.split(" ");
	name = name.map((item) => item[0].toUpperCase() + item.substring(1));
	return name.join(" ");
}

export function capitalizeFirst(name) {
	name = name.trim();
	return name[0].toUpperCase() + name.substring(1);
}

export function transformName(name) {
	name = name.trim();
	name = name.toLowerCase();
	name = name.split(" ");
	return `${name.join("_")}`;
}

// Vocabulary item
export function getPath(item, type = "img") {
	let extension = "";
	switch (type) {
		case "sounds":
			extension = "mp3";
			break;
		default:
			extension = "jpg";
	}
	return `https://raw.githubusercontent.com/kientrank3/img_peach_toeic/main/${type}/${transformName(item?.topic)}/${transformName(
		item.name
	)}.${extension}`;
	
}
