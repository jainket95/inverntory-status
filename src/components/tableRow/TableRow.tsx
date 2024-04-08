import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Rows } from "../../types";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type RowInputProps = {
	name: string;
	currentValue: string | number;
	updateUserData: (data: object) => void;
};

const RowInput = ({ name, currentValue, updateUserData }: RowInputProps) => {
	const [value, setValue] = useState(currentValue);

	useEffect(() => {
		updateUserData({ [name]: currentValue });
	}, [name, currentValue, updateUserData]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateUserData({ [e.target.name]: e.target.value });
	};

	return (
		<td colSpan={3}>
			<input
				type="text"
				name={name}
				value={value}
				onChange={handleInputChange}
			/>
		</td>
	);
};

type TableRowProps = {
	rows: Rows;
	handleDeleteRow: (id: string) => void;
	handleEditRow: (id: string, userData: object) => void;
};

const TableRow = ({ rows, handleDeleteRow, handleEditRow }: TableRowProps) => {
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		role: "",
	});

	const getUserItem = (index: number) => {
		return index === 1 ? "name" : index === 2 ? "email" : "role";
	};

	const updateUserData = useCallback((data: object) => {
		setUserData((prevUserData) => ({ ...prevUserData, ...data }));
	}, []);

	const handleEdit = (id: string) => {
		handleEditRow(id, userData);
	};

	return (
		<tbody>
			{rows.map((row) => (
				<tr
					key={row.id}
					className="flex justify-between items-center w-full mb-6">
					{row.product.productData.map((item, j) => {
						if (item === "actions") {
							return (
								<td
									className="text-lg font-normal text-emerald-600 w-[10rem] text-start"
									key={`action-${j}`}
									colSpan={6}>
									<button
										className={!row.isEditing ? "edit" : "save"}
										onClick={handleEdit.bind(null, row.id)}>
										<div className="w-4 mr-3 text-gray-400">
											<PencilIcon />
										</div>
									</button>
									<button
										className={!row.isEditing ? "edit" : "save"}
										onClick={handleEdit.bind(null, row.id)}>
										<div className="w-4 mr-3 text-gray-400">
											<EyeIcon />
										</div>
									</button>
									<button
										className="delete"
										onClick={handleDeleteRow.bind(null, row.id)}>
										<div className="w-4 mr-3 text-gray-400">
											<TrashIcon />
										</div>
									</button>
								</td>
							);
						} else {
							if (row.isEditing) {
								return (
									<RowInput
										key={`${item}-${j}`}
										name={getUserItem(j)}
										currentValue={item}
										updateUserData={updateUserData}
									/>
								);
							} else {
								return (
									<td
										key={`${item}-${j}`}
										colSpan={3}
										className="text-lg font-normal capitalize w-[14rem] text-start">
										{item}
									</td>
								);
							}
						}
					})}
				</tr>
			))}
		</tbody>
	);
};

export default TableRow;
