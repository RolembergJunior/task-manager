import { modalsAtom } from "@/app/Atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const initialState = {
	isOpen: false,
	text: null,
	params: {},
};

export function useModal(modalName: string): {
	isOpen: boolean;
	text: string | null;
	params: any;
} {
	const [modalProps, setModalProps] = useState(initialState);
	const [modals] = useAtom(modalsAtom);

	useEffect(() => {
		findAndReturnModalProps();
	}, [modals]);

	const findAndReturnModalProps = () => {
		if (modals[modalName]) {
			setModalProps(modals[modalName]);
		}
	};

	return modalProps;
}
