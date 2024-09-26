"use client";

import Modal from "..";
import { useModal } from "@/hooks/useModal";
import { Modals } from "@/app/types/Types";
import Loading from "@/components/Loading";

export default function ModalLoading() {
	const { isOpen, text, params } = useModal(Modals.LOADING);

	if (!isOpen) return;

	const loadingStyle = {
		content: {
			background: "transparent",
			border: "none",
			color: "#FFF",
			width: "20%",
			height: "10%",
			overflow: "hidden",
		},
	};

	return (
		<Modal
			isOpen={isOpen}
			style={loadingStyle}
			onRequestClose={() => null}
			onAfterClose={() => null}
		>
			<div className="flex items-center gap-2">
				<Loading />
				<h1 className="text-md font-semibold text-white">{text}</h1>
			</div>
		</Modal>
	);
}
