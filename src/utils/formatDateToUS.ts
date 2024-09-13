export function formatDateToUs(date: string) {
	if (date) {
		const [day, month, year] = date.split("/");

		return `${year}-${month}-${day}`;
	}
}
