'use client'

import { modalsAtom } from "@/app/Atoms";
import { useAtom } from "jotai";


export function openModal(modalName: string, modalText: string): void{
    const [modals, setModals] = useAtom(modalsAtom);

    setModals({
        ...modals,
        [modalName]: { isOpen: true, text: modalText },
    });
}