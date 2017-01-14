export function stage(n) {
	let value;
	switch (n){
		case 0:
			value = "Beginner";
			break;
		case 1:
			value = "Junior";
			break;
		case 2:
			value = "Senior";
			break;
		case 3:
			value = "Expertise";
			break;
		case 4:
			value = "Master";
			break;
		default:
			value = "Erro";
	};
	return value;
}