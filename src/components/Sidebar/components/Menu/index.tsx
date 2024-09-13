"use client";

import { Select as BaseSelect, Select } from "@mui/base/Select";
import { Option } from "@mui/base";

export default function Menu() {
	return (
		<Select defaultValue={10}>
			<Option value={10}>O</Option>
			<Option value={20}>Opções</Option>
			<Option value={30}>Usuarios</Option>
		</Select>
	);
}
