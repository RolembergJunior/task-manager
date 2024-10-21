import React, { useCallback, useEffect, useState } from "react";
import { Editable, withReact, Slate, type RenderLeafProps } from "slate-react";
import { createEditor, Editor } from "slate";
import { withHistory } from "slate-history";
import { useTheme } from "next-themes";
import type { tasksProps, ValueProps } from "@/app/types/Types";
import ToolBar from "./components/Toolbar";
import dynamic from "next/dynamic";

interface PropsState {
	state: tasksProps;
	setState: (value: tasksProps) => void;
}

interface LeafProps extends RenderLeafProps {
	leaf: { [x: string]: any; text: string };
}

export default function TextArea({ state, setState }: PropsState) {
	const [editor, setEditor] = useState(() =>
		withHistory(withReact(createEditor())),
	);
	const [isCheckedInput, setIsCheckedInput] = useState(false);
	const [valueEditor, setValueEditor] = useState<ValueProps[]>(
		state.description,
	);

	const { theme } = useTheme();

	useEffect(() => {
		if (state.description) {
			setValueEditor(state.description);
		}

		setEditor((prevEditor) => ({
			...prevEditor,
			children: valueEditor,
		}));
	}, [state.description]);

	useEffect(() => {
		if (
			valueEditor !== null &&
			JSON.stringify(state.description) !== JSON.stringify(valueEditor)
		) {
			setState({ ...state, description: valueEditor });
		}
	}, [valueEditor]);

	const Leaf = ({ attributes, children, leaf }: LeafProps) => {
		if (leaf.bold) {
			children = <strong>{children}</strong>;
		}
		if (leaf.italic) {
			children = <em>{children}</em>;
		}
		if (leaf.underline) {
			children = <u>{children}</u>;
		}
		if (leaf.link) {
			children = (
				<a className="cursor-pointer underline text-blue-500" href={leaf.text}>
					{children}
				</a>
			);
		}
		if (leaf.list) {
			children = <li>{children}</li>;
		}
		if (leaf.checkBox) {
			children = (
				<div className="flex gap-2">
					<input
						checked={isCheckedInput}
						onClick={() => setIsCheckedInput(!isCheckedInput)}
						type="checkbox"
					/>
					{isCheckedInput ? <del>{children}</del> : <p>{children}</p>}
				</div>
			);
		}
		if (leaf.code) {
			children = (
				<pre className={`bg-[#2d2d2d] text-white font-mono text-base p-3`}>
					{children}
				</pre>
			);
		}

		return <span {...attributes}>{children}</span>;
	};

	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <Leaf {...props} />;
	}, []);

	if (valueEditor)
		return (
			<>
				<ToolBar editor={editor} />
				<Slate
					editor={editor}
					onValueChange={(newValue) => setValueEditor(newValue)}
					initialValue={valueEditor}
				>
					<Editable
						color={`${theme === "dark" ? "white" : "default"}`}
						placeholder="Digite uma descrição para a tarefa"
						className="bg-[#F5F6FA] dark:bg-black/50 w-full h-10 rounded-md focus:h-52 transition-all duration-300 outline-none p-2 resize-none"
						renderLeaf={renderLeaf}
					/>
				</Slate>
			</>
		);
}
