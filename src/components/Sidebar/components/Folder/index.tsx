import { FaChevronRight } from "react-icons/fa";

export default function Folder() {
	const folders = [
		{
			id: 1,
			name: "Tasks futuras",
		},
		{
			id: 2,
			name: "Tasks de desenvolvimento",
		},
		{
			id: 3,
			name: "Bugs",
		},
		{
			id: 4,
			name: "Melhorias",
		},
	];
	return folders.map((folder) => (
		<div
			key={folder.id}
			className="flex items-center justify-between hover:cursor-pointer hover:bg-[#1b2631] hover:rounded-lg transition-all px-3 py-2"
		>
			<h1 className="text-[#5C5E64] text-md font-bold">{folder.name}</h1>
			<FaChevronRight color="gray" />
		</div>
	));
}
