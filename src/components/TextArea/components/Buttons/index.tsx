"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { useState } from "react";
import { CiCircleList } from "react-icons/ci";
import {
	FaAlignCenter,
	FaAlignLeft,
	FaAlignRight,
	FaBold,
	FaCode,
	FaItalic,
	FaList,
	FaUnderline,
	FaUnlink,
} from "react-icons/fa";
import { type BaseEditor, Editor, Element } from "slate";

interface PropsButton {
	editor: BaseEditor;
	currentTheme: string | undefined;
}

function getCurrentNode(
	editor: BaseEditor,
	type: string,
): [Node | null, Path | null] {
	const [match] = Editor.nodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) && Element.isElement(n) && n.type === type,
	});

	if (match) {
		return [match[0], match[1]];
	}
	return [null, null];
}

function isMarkActive(editor: BaseEditor, format: string): boolean {
	const [match] = Editor.nodes(editor, {
		match: (n) => n[format] === true,
		universal: true,
	});

	return !!match;
}

function toggleMark(editor: BaseEditor, format: string) {
	const isActive = isMarkActive(editor, format);

	if (!isActive) {
		Editor.addMark(editor, format, true);
	} else {
		Editor.removeMark(editor, format);
	}
}

export const BoldButton = ({ editor, currentTheme }: PropsButton) => {
	return (
		<Button
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, "bold");
			}}
			className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
			variant={`${currentTheme === "dark" ? "secondary" : "ghost"}`}
		>
			<FaBold />
		</Button>
	);
};

export const ItalicButton = ({ editor, currentTheme }: PropsButton) => (
	<Button
		onMouseDown={(event) => {
			event.preventDefault();
			toggleMark(editor, "italic");
		}}
		className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
		variant={`${currentTheme === "dark" ? "secondary" : "ghost"}`}
	>
		<FaItalic />
	</Button>
);

export const UnderlineButton = ({ editor, currentTheme }: PropsButton) => (
	<Button
		onMouseDown={(event) => {
			event.preventDefault();
			toggleMark(editor, "underline");
		}}
		className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
		variant={`${currentTheme === "dark" ? "secondary" : "ghost"}`}
	>
		<FaUnderline />
	</Button>
);

export const LinkButton = ({ editor, currentTheme }: PropsButton) => (
	<Button
		onMouseDown={(event) => {
			event.preventDefault();
			toggleMark(editor, "link");
		}}
		className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
		variant={`${currentTheme === "dark" ? "secondary" : "ghost"}`}
	>
		<FaUnlink />
	</Button>
);

export const ListButton = ({ editor, currentTheme }: PropsButton) => (
	<Button
		onMouseDown={(event) => {
			event.preventDefault();
			toggleMark(editor, "list");
		}}
		className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
		variant={`${currentTheme === "dark" ? "secondary" : "ghost"}`}
	>
		<FaList />
	</Button>
);

export const CheckButton = ({ editor, currentTheme }: PropsButton) => (
	<Button
		onMouseDown={(event) => {
			event.preventDefault();
			toggleMark(editor, "checkBox");
		}}
		className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
		variant={`${currentTheme === "dark" ? "secondary" : "ghost"}`}
	>
		<CiCircleList />
	</Button>
);

export const AlignButton = ({ editor, currentTheme }: PropsButton) => {
	return (
		<div>
			<Select dir="ltr">
				<SelectTrigger className="bg-black/70">
					<FaAlignCenter />
				</SelectTrigger>
				<SelectContent className="flex">
					<SelectItem
						className={`${currentTheme === "dark" ? "bg-black/70 border hover:bg-black/80" : "border"}`}
						onMouseDown={(event) => {
							event.preventDefault();
							toggleMark(editor, "alignLeft");
						}}
						key={"align-left"}
						value="align-left"
					>
						<FaAlignLeft />
					</SelectItem>
					<SelectItem
						className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
						onMouseDown={(event) => {
							event.preventDefault();
							toggleMark(editor, "alignCenter");
						}}
						key={"align-center"}
						value="align-center"
					>
						<FaAlignCenter />
					</SelectItem>
					<SelectItem
						className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
						onMouseDown={(event) => {
							event.preventDefault();
							toggleMark(editor, "alignRight");
						}}
						key={"align-right"}
						value="align-right"
					>
						<FaAlignRight />
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export const CodeButton = ({ editor, currentTheme }: PropsButton) => {
	return (
		<Button
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, "code");
			}}
			className={`${currentTheme === "dark" ? "bg-black/70 border" : "border"}`}
			variant={`${currentTheme === "dark" ? "secondary" : "ghost"}`}
		>
			<FaCode />
		</Button>
	);
};
