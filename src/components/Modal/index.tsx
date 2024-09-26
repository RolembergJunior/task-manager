"use client";

import { useEffect, useState, type ReactElement } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#modal-root");

interface ModalProps {
	isOpen: boolean;
	onAfterClose: () => void;
	onRequestClose: () => void;
	style: StyleProps;
	children: ReactElement;
}

interface StyleProps {
	content: object;
	overlay?: object;
}

const defaultModalStyles = {
	content: {
		position: "fixed",
		top: "45%",
		left: "45%",
		right: 0,
		bottom: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1000,
		maxWidht: "100%",
		minWidht: "80%",
		minHeight: "80%%",
		maxHeight: "100%",
	},
	overlay: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
};

export default function Modal(props: ModalProps): ReactElement {
	const { isOpen, onRequestClose, style, children } = props;
	const [normalizedStyle, setNormalizedStyle] = useState(defaultModalStyles);

	useEffect(() => {
		getNewStyleFn(style);
	}, [style]);

	function getNewStyleFn(props: StyleProps) {
		const contentNewStyle = props.content;
		const contentDefaultStyle = defaultModalStyles.content;
		const overlayDefaultStyle = defaultModalStyles.overlay;

		const normalizedStyle = {
			content: {
				...contentDefaultStyle,
				...contentNewStyle,
			},
			overlay: {
				...overlayDefaultStyle,
			},
		};

		setNormalizedStyle(normalizedStyle);
	}

	return (
		<ReactModal
			onRequestClose={onRequestClose}
			isOpen={isOpen}
			style={normalizedStyle}
		>
			{children}
		</ReactModal>
	);
}
