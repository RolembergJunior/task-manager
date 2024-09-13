import { format } from "date-fns";

export function getValueWorkingByDateTask(dateEnd: string): number | undefined {
	const currentDate = new Date(format(Date.now(), "yyyy-MM-dd"));
	const inputedDate = new Date(dateEnd);

	if (currentDate.getTime() === inputedDate.getTime()) {
		return 0;
	}
	if (currentDate.getTime() < inputedDate.getTime()) {
		return 1;
	}
	if (currentDate.getTime() > inputedDate.getTime()) {
		return -1;
	}
}
