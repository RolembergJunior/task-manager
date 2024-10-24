"use client";

import SelectCompetency from "../SelectCompetency";
import SelectStatus from "../SelectStatus";
import SelectWorking from "../SelectWorking";
import SelectPriority from "../SelectPriority";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { useAtom } from "jotai";
import { filtersAtom } from "@/app/atoms/Atoms";
import AddTaskModal from "../AddTaskModal";
import AddNewFolder from "../AddNewFolder";

interface PropsHeader {
	title: string;
	ContentStyle?: {
		content: { [x: string]: string };
		title: { [x: string]: string };
		filters: { [x: string]: string };
		titleButton: { [x: string]: string };
	};
	titleButton?: string;
	hasSearchFilter?: boolean;
	hasAddTaskButton?: boolean;
	hasFolderButton?: boolean;
	onClickButton?: () => void;
}

export default function Header(props: PropsHeader) {
	const [filters, setFilters] = useAtom(filtersAtom);
	const {
		title,
		ContentStyle,
		titleButton,
		hasSearchFilter,
		hasAddTaskButton,
		hasFolderButton,
		onClickButton,
	} = props;

	return (
		<header
			style={ContentStyle?.content}
			className="flex justify-between items-center bg-white dark:bg-[#1e293b] border-b w-full h-[81px] p-5 "
		>
			<h1
				style={ContentStyle?.title}
				className="text-2xl font-semibold text-start"
			>
				{title}
			</h1>
			<div className="flex space-x-10">
				{hasSearchFilter && (
					<div className="relative w-80 flex items-center">
						<CiSearch className="absolute focus:hidden m-2" />
						<Input
							type="text"
							className="h-10 focus:border-0 overflow-hidden"
							onChange={(e) =>
								setFilters({ ...filters, search: e.target.value })
							}
						/>
					</div>
				)}
				<div style={ContentStyle?.filters} className="flex space-x-3 ">
					<SelectCompetency />
					<SelectStatus />
					<SelectPriority />
					<SelectWorking />
				</div>
			</div>
			{hasAddTaskButton && hasFolderButton && (
				<div className="flex gap-2">
					<AddNewFolder />
					<AddTaskModal />
				</div>
			)}
			{!hasAddTaskButton && !hasFolderButton && (
				<Button
					style={ContentStyle?.titleButton}
					onClick={onClickButton}
					className="text-white dark:text-black p-2"
				>
					{titleButton}
				</Button>
			)}
		</header>
	);
}
