"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";
import { useFetch, useFetchFolder } from "@/hooks/useFetch";
import { mutate } from "swr";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogContent,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
	type FolderProps,
	Modals,
	Prioritys,
	Status,
	type tasksProps,
} from "@/app/types/Types";
import { format } from "date-fns";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { IoIosClose } from "react-icons/io";
import { useUpdateAtomModal } from "@/app/atoms/actions";
import { toast } from "sonner";
import TextArea from "@/components/TextArea";

export default function Task() {
	const [dataTask, setDataTask] = useState<tasksProps>({} as tasksProps);
	const [isOpenInput, setIsOpenInput] = useState(false);
	const [inputText, setInputText] = useState("");
	const { openModal, closeModal } = useUpdateAtomModal();
	const { theme } = useTheme();
	const route = useRouter();
	const param = useParams();
	const urlTask = `http://localhost:3000/tarefas/${param.id}`;
	const { data, error, isLoading } = useFetch({ url: urlTask });
	const dataFolders = useFetchFolder({ url: "http://localhost:3000/pastas" });

	useEffect(() => {
		if (data) {
			setDataTask({
				...data,
			});

			closeModal(Modals.LOADING);
		}
	}, [data]);

	function verifyDateAndStylize() {
		if (dataTask.creationDate !== undefined && dataTask.finalizationDate) {
			const currentDate = new Date(format(Date.now(), "yyyy-MM-dd"));
			const inputedDate = new Date(dataTask?.finalizationDate);

			if (currentDate.getTime() === inputedDate.getTime()) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<div className="bg-orange-600 w-3 h-3 mx-auto rounded-full" />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>Último dia</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
			if (currentDate.getTime() < inputedDate.getTime()) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<div className="bg-green-600 w-3 h-3 mx-auto rounded-full" />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>No prazo</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
			if (currentDate.getTime() > inputedDate.getTime()) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<div className="bg-red-600 w-3 h-3 mx-auto rounded-full" />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>Atrasado</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
		}
	}

	function onClickGoHome() {
		openModal(Modals.LOADING, "CARREGANDO");

		mutate("http://localhost:3000/tarefas");

		route.push("/");
	}

	const options = {
		method: "DELETE",
	};

	async function onHandleRemoveTask() {
		await fetch(urlTask, options).catch((error) =>
			console.error("ERRO:", error),
		);

		route.push("/");
	}

	function getIdFolderSelected(folderNameSelected: string | null) {
		const findFolderSelected = dataFolders.data?.find(
			(folder: FolderProps) => folder.name === folderNameSelected,
		);

		return findFolderSelected?.name;
	}

	async function onEditTask() {
		await fetch(urlTask, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				name: dataTask.name,
				description: dataTask.description,
				responsible: dataTask.responsible,
				creationDate: dataTask.creationDate,
				finalizationDate: dataTask.finalizationDate,
				priority: dataTask.priority,
				status: dataTask.status,
				folder: getIdFolderSelected(dataTask.folder),
				checklist: dataTask.checklist,
			}),
		}).catch((error) => console.error("ERRO:", error));
	}

	useEffect(() => {
		if (
			Object.keys(dataTask).length &&
			JSON.stringify(data) !== JSON.stringify(dataTask)
		) {
			onEditTask();
		}
	}, [dataTask]);

	function onHandleDeleteItemChecklist(indexItem: number) {
		const deleteItemCheckList = dataTask.checklist.filter(
			(_, index) => index !== indexItem,
		);

		setDataTask({
			...dataTask,
			checklist: deleteItemCheckList,
		});

		toast.success("CheckBox excluído!", {
			duration: 3000,
		});
	}

	function onHandleClickCheckBox(
		item: { name: string; isCheck: boolean },
		indexItem: number,
	) {
		const updateCheckboxItems = dataTask.checklist.map(
			(itemIsChecked, index) =>
				index === indexItem
					? { ...item, isCheck: !item.isCheck }
					: itemIsChecked,
		);

		setDataTask({
			...dataTask,
			checklist: updateCheckboxItems,
		});
	}

	function onHandleSaveTask() {
		if (inputText !== "") {
			setInputText("");
			setIsOpenInput(false);

			setDataTask({
				...dataTask,
				checklist: [
					{ name: inputText, isCheck: false },
					...dataTask.checklist.map((item) => item),
				],
			});
		}

		toast.success("CheckBox adicionado!", {
			duration: 3000,
		});
	}

	const renderSelectors = () => {
		return (
			<>
				<section className="flex items-center gap-6">
					<div>
						<span className="font-medium text-black/50 dark:text-white/70">
							Responsável
						</span>
						<Select
							onValueChange={(value) =>
								setDataTask({ ...dataTask, responsible: value })
							}
						>
							<SelectTrigger className="w-34 border-none focus:outline-none">
								<SelectValue placeholder={dataTask.responsible} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="Rolemberg Junior">
										Rolemberg Junior
									</SelectItem>
									<SelectItem value="Pitter Antonio">Pitter Antonio</SelectItem>
									<SelectItem value="Fernanda Sales">Fernanda Sales</SelectItem>
									<SelectItem value="Ruan Pablo">Ruan Pablo</SelectItem>
									<SelectItem value="Luan Carlos">Luan Carlos</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div>
						<span className="font-medium text-black/50 dark:text-white/70">
							Data de criação
						</span>
						<p className="">{dataTask.creationDate}</p>
					</div>
					<div>
						<span className="font-medium text-black/50 dark:text-white/70">
							Data de finalização
						</span>
						<Input
							onChange={(e) =>
								setDataTask({
									...dataTask,
									finalizationDate: e.target.value,
								})
							}
							type="date"
							color="white"
							className="border-none focus:outline-none"
							value={dataTask.finalizationDate}
						/>
					</div>
					<div>
						<span className="font-medium text-black/50 dark:text-white/70">
							Prioridade
						</span>
						<Select
							onValueChange={(value) =>
								setDataTask({ ...dataTask, priority: value })
							}
						>
							<SelectTrigger className="w-34 border-none " color="white">
								<SelectValue placeholder={dataTask.priority} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={Prioritys.HIGH_PRORITY}>
										URGENTE
									</SelectItem>
									<SelectItem value={Prioritys.MEDIUM_PRIORITY}>
										MÉDIA URGÊNCIA
									</SelectItem>
									<SelectItem value={Prioritys.LOW_PRIORITY}>
										BAIXA URGÊNCIA
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div>
						<span className="font-medium text-black/50 dark:text-white/70">
							Status
						</span>
						<Select
							onValueChange={(value) =>
								setDataTask({ ...dataTask, status: value })
							}
						>
							<SelectTrigger className="w-34 border-none" color="white">
								<SelectValue placeholder={dataTask.status} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={Status.NOT_INICIATE}>
										Não inciado
									</SelectItem>
									<SelectItem value={Status.TO_DO}>Fazer</SelectItem>
									<SelectItem value={Status.WORKING}>Em andamento</SelectItem>
									<SelectItem value={Status.CLOSED}>Concluído</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div>
						<span className="font-medium text-black/50 dark:text-white/70">
							Pasta
						</span>
						<Select
							onValueChange={(value) =>
								setDataTask({ ...dataTask, folder: value })
							}
						>
							<SelectTrigger>
								<SelectValue
									placeholder={getIdFolderSelected(dataTask.folder)}
								/>
							</SelectTrigger>
							<SelectContent>
								{dataFolders.data?.map((folder: FolderProps) => (
									<SelectItem value={folder.name} key={folder.id}>
										{folder.name}
									</SelectItem>
								))}
								;
							</SelectContent>
						</Select>
					</div>
				</section>
			</>
		);
	};

	const renderCheckList = () => {
		if (dataTask.checklist?.length || isOpenInput)
			return (
				<section className="bg-[#F5F6FA] dark:bg-black/50 rounded-lg p-3 max-h-52 overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
					{isOpenInput && (
						<div className="flex gap-2">
							<Input
								onChange={(e) => setInputText(e.target.value)}
								type="text"
								placeholder="Digite aqui..."
							/>
							<Button onClick={() => onHandleSaveTask()}>Salvar</Button>
						</div>
					)}
					{dataTask.checklist?.map((item, indexItem) => (
						<div
							key={`${item.name}-${indexItem}`}
							className="flex items-center justify-between w-full border-b border-black/10 dark:border-white/20"
						>
							{item.isCheck ? (
								<div className="relative">
									<label>{item.name}</label>
									<hr className="absolute top-[43%] bg-black dark:bg-white w-full h-[2px]" />
								</div>
							) : (
								<label>{item.name}</label>
							)}
							<div className="flex items-center gap-3">
								<Input
									checked={item.isCheck}
									onClick={() => onHandleClickCheckBox(item, indexItem)}
									type="checkbox"
									className="w-5"
								/>
								<div onClick={() => onHandleDeleteItemChecklist(indexItem)}>
									<IoIosClose size={25} />
								</div>
							</div>
						</div>
					))}
				</section>
			);
	};

	if (!isLoading && !error)
		return (
			<ThemeProvider attribute="class">
				<section className="flex bg-[#F5F6FA] dark:bg-black/20">
					<SideBar />
					<div className="w-[90%] my-auto">
						<div className="bg-white dark:bg-[#1e293b] mx-auto w-[95%] h-[95vh] rounded-xl shadow-md shadow-black/20 p-5">
							<header className="flex justify-between">
								<BiLeftArrowAlt
									onClick={() => onClickGoHome()}
									className="hover:cursor-pointer"
									size={30}
								/>
								<Dialog>
									<DialogTrigger>
										<Button>
											<FaRegTrashAlt />
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Excluir tarefa</DialogTitle>
											<DialogDescription>
												Tem certeza que deseja limpar as tarefas da caixa de
												entrada?
											</DialogDescription>
											<div className="flex items-center justify-end gap-3">
												<DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-black/10 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
													Cancelar
												</DialogClose>
												<DialogClose>
													<Button onClick={() => onHandleRemoveTask()}>
														Limpar
													</Button>
												</DialogClose>
											</div>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</header>
							<main className="flex">
								<section className="mt-16 px-10 space-y-10 w-[70%]">
									<div className="flex items-center bg-[#F5F6FA] dark:bg-black/50 gap-4 p-2 rounded-md">
										<div className="w-3 h-3 mx-auto rounded-full">
											{verifyDateAndStylize()}
										</div>
										<textarea
											onBlur={(e) =>
												setDataTask({ ...dataTask, name: e.target.value })
											}
											defaultValue={dataTask.name}
											className="bg-transparent h-10 w-full text-3xl font-semibold focus:outline-none resize-none overflow-auto"
										/>
									</div>
									{renderSelectors()}
									{/* <textarea
									value={dataTask.description}
									contentEditable={true}
									onChange={(e) =>
										setDataTask({ ...dataTask, description: e.target.value })
									}
									color={`${theme === "dark" ? "white" : "default"}`}
									placeholder="Digite uma descrição para a tarefa"
									className="bg-[#F5F6FA] dark:bg-black/50 w-full h-10 rounded-md focus:h-52 transition-all duration-300 outline-none p-2 resize-none"
								/> */}
									<TextArea state={dataTask} setState={setDataTask} />
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<h1 className="text-xl font-semibold ">ChekList</h1>
											<div
												onClick={() => setIsOpenInput(!isOpenInput)}
												className="transition-colors hover:bg-black/10 hover:cursor-pointer rounded-full p-2"
											>
												<FaPlus />
											</div>
										</div>
										{renderCheckList()}
									</div>
								</section>
								<div className="mt-16 space-y-5 w-[20%] mx-auto h-full">
									<h1 className="text-center text-xl font-semibold">
										Atividade
									</h1>
									<div className="bg-[#F5F6FA] dark:bg-black/50 h-[62vh] w-full rounded-md">
										<p className="text-center text-black/50" />
									</div>
									<div className="flex items-center justify-between gap-1">
										<textarea
											placeholder="Digite aqui"
											className="bg-[#F5F6FA] dark:bg-black/50 h-10 px-4 py-2 w-full resize-none focus:outline-none scrollbar-none"
										/>
										<Button>Enviar</Button>
									</div>
								</div>
							</main>
						</div>
					</div>
				</section>
			</ThemeProvider>
		);
}
