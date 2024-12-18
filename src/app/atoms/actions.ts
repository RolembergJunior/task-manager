"use client";

import { useAtom } from "jotai";
import { modalsAtom } from "./Atoms";

const openModal =
	(modals, setModals) => (modalName: string, modalText: string) => {
		setModals({
			...modals,
			[modalName]: { isOpen: true, text: modalText },
		});
	};

const closeModal = (modals, setModals) => (modalName: string) => {
	setModals({
		...modals,
		[modalName]: { isOpen: false, text: null },
	});
};

export const useUpdateAtomModal = () => {
	const [modals, setModals] = useAtom(modalsAtom);

	return {
		openModal: openModal(modals, setModals),
		closeModal: closeModal(modals, setModals),
	};
};
