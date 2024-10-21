"use client";

import { useTheme } from "next-themes";
import {
	BoldButton,
	CheckButton,
	ItalicButton,
	LinkButton,
	ListButton,
	UnderlineButton,
	AlignButton,
	CodeButton,
} from "../Buttons";
import type { BaseEditor } from "slate";

interface ToolBarProps {
	editor: BaseEditor;
}

export default function ToolBar({ editor }: ToolBarProps) {
	const { theme } = useTheme();

	return (
		<div className="flex gap-3 ">
			<BoldButton currentTheme={theme} editor={editor} />
			<ItalicButton currentTheme={theme} editor={editor} />
			<UnderlineButton currentTheme={theme} editor={editor} />
			<LinkButton currentTheme={theme} editor={editor} />
			<ListButton currentTheme={theme} editor={editor} />
			<CheckButton currentTheme={theme} editor={editor} />
			<AlignButton currentTheme={theme} editor={editor} />
			<CodeButton currentTheme={theme} editor={editor} />
		</div>
	);
}
