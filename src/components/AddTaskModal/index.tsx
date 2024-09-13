"use client";

import { useState } from "react";
import { FolderProps, Prioritys, Status, tasksProps } from "@/app/types/Types";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFetchFolder } from "@/hooks/useFetch";
import { mutate } from "swr";

export default function AddTaskModal() {
	const [dataTask, setDataTask] = useState<tasksProps>({
		name: "",
		description: "",
		responsible: null,
		creationDate: new Intl.DateTimeFormat("pt-BR").format(new Date(Date.now())),
		finalizationDate: "",
		priority: "",
		folder: null,
		status: "",
		checklist: [],
	});
	const dataFolders = useFetchFolder({ url: "http://localhost:3000/pastas" });

	async function onHandleAddTask() {
		if (
			(dataTask.name != "",
			dataTask.finalizationDate != "",
			dataTask.status != "")
		) {
			try {
				await fetch("http://localhost:3000/tarefas", {
					method: "POST",
					headers: {
						"content-Type": "application/json",
					},
					body: JSON.stringify(dataTask),
				}).then((response) => response.json());
			} catch (error) {
				console.error("Hoube um erro ao adicionar uma task", error);
			}

			mutate("http://localhost:3000/tarefas");
		} else alert("Adicione o nome, a data de finalização e o status da tarefa");
	}

	return (
		<Dialog>
			<DialogTrigger color="white">
				<Button>Adicionar Tarefa</Button>
			</DialogTrigger>
			<DialogContent className="dark:bg-black/80">
				<DialogHeader className="space-y-3">
					<DialogTitle className="text-center dark:text-white">
						TAREFA
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-3">
					<div className="space-y-3">
						<div>
							<label htmlFor="name">Nome da tarefa</label>
							<Input
								onChange={(e) =>
									setDataTask({ ...dataTask, name: e.target.value })
								}
								id="name"
								type="text"
								placeholder="Colocar lixo para..."
								required
							/>
						</div>
						<div>
							<label htmlFor="name">Descrição</label>
							<Input
								onChange={(e) =>
									setDataTask({ ...dataTask, description: e.target.value })
								}
								id="name"
								type="text"
								placeholder="Usar o saco azul para lixos sólidos e preto..."
							/>
						</div>
					</div>
					<div className="flex justify-between">
						<div className="w-40">
							<label htmlFor="date">Data de finalização</label>
							<Input
								onChange={(e) =>
									setDataTask({ ...dataTask, finalizationDate: e.target.value })
								}
								id="date"
								type="date"
							/>
						</div>
						<div>
							<div className="w-40">
								<label>Status</label>
								<Select
									onValueChange={(value) =>
										setDataTask({ ...dataTask, status: value })
									}
									required
								>
									<SelectTrigger>
										<SelectValue placeholder="Selecione um Status" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value={Status.NOT_INICIATE}>
												Não inciado
											</SelectItem>
											<SelectItem value={Status.TO_DO}>Fazer</SelectItem>
											<SelectItem value={Status.WORKING}>
												Em andamento
											</SelectItem>
											<SelectItem value={Status.CLOSED}>Concluído</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="w-40">
							<label>Responsável</label>
							<Select
								onValueChange={(value) =>
									setDataTask({ ...dataTask, responsible: value })
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Selecione um responsável" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Rolemberg Junior">
											Rolemberg Junior
										</SelectItem>
										<SelectItem value="Pitter Antonio">
											Pitter Antonio
										</SelectItem>
										<SelectItem value="Fernanda Sales">
											Fernanda Sales
										</SelectItem>
										<SelectItem value="Ruan Pabli">Ruan Pablo</SelectItem>
										<SelectItem value="Luan Carlos">Luan Carlos</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="w-40">
							<label>Categoria</label>
							<Select
								onValueChange={(value) =>
									setDataTask({ ...dataTask, priority: value })
								}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder="Selecione uma categoria" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value={Prioritys.HIGH_PRORITY}>
											Urgente
										</SelectItem>
										<SelectItem value={Prioritys.MEDIUM_PRIORITY}>
											Média urgência
										</SelectItem>
										<SelectItem value={Prioritys.LOW_PRIORITY}>
											Baixa urgência
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div>
						<label>Pasta</label>
						<Select
							onValueChange={(value) =>
								setDataTask({ ...dataTask, folder: value })
							}
						>
							<SelectTrigger>
								<SelectValue placeholder={"Adicione uma pasta"} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{dataFolders.data?.map((folders: FolderProps) => (
										<SelectItem value={folders.id}>{folders.name}</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogClose>
					<Button onClick={() => onHandleAddTask()} className="w-full">
						Adicionar
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
