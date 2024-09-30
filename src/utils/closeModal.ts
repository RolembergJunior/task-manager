'use client'

import { modalsAtom } from "@/app/Atoms";
import { useAtom } from "jotai";


export function closeModal(modalName: string): void{
    const [modals, setModals] = useAtom(modalsAtom);

    setModals({
        ...modals,
        [modalName]: { isOpen: false, text: null },
    });
}