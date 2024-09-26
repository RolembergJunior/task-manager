import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { FiltersProps, ModalProps } from "./types/Types";

export const filtersAtom = atom<FiltersProps>({
	search: "",
	priority: "Todos",
	status: "Todos",
	working: "Todos",
	folder: null,
	competency: null,
});

export const darkModeAtom = atomWithStorage("dark", false);

export const modalsAtom = atom<ModalProps>({
	modalLoading: {
		isOpen: false,
		text: null,
	},
	modalPage: {
		isOpen: false,
		title: null,
		params: null,
	},
});
