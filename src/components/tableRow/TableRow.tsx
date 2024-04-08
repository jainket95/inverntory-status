import { useState } from "react";
import { Rows } from "../../types";
import {
	EyeIcon,
	EyeSlashIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "../modal/Modal";

type TableRowProps = {
	isAdmin: boolean;
	rows: Rows;
	handleDeleteRow: (id: string) => void;
	handleEditRow: (id: string, type: string, userData?: object) => void;
};

const TableRow = ({
	isAdmin,
	rows,
	handleDeleteRow,
	handleEditRow,
}: TableRowProps) => {
	const [showModal, setShowModal] = useState({ check: false, id: "" });

	const handleEdit = (id: string) => {
		if (isAdmin) return;
		setShowModal({ check: true, id: id });
		handleEditRow(id, "edit");
	};
	const handleDisable = (id: string) => {
		if (isAdmin) return;
		handleEditRow(id, "disable");
	};

	return (
		<>
			<tbody className="flex flex-col justify-between w-full">
				{rows.map((row) => (
					<tr
						key={row.id}
						className={`flex justify-between items-center w-full mb-6 border-b-2 border-b-gray-700 ${
							row.isDisabled ? "text-gray-500" : "text-white"
						}`}>
						{row.product.productData.map((item, j) => {
							if (item === "actions") {
								return (
									<td
										className="text-lg font-normal text-emerald-600 w-[10rem] text-start"
										key={`action-${j}`}
										colSpan={6}>
										<button onClick={handleEdit.bind(null, row.id)}>
											<div
												className={`w-4 mr-3  ${
													!isAdmin ? "text-green-400" : "text-gray-500"
												}`}>
												<PencilIcon />
											</div>
										</button>
										<button onClick={handleDisable.bind(null, row.id)}>
											<div
												className={`w-4 mr-3  ${
													!isAdmin ? "text-purple-400" : "text-gray-500"
												}`}>
												{row.isDisabled ? <EyeSlashIcon /> : <EyeIcon />}
											</div>
										</button>
										<button onClick={handleDeleteRow.bind(null, row.id)}>
											<div
												className={`w-4 mr-3  ${
													!isAdmin ? "text-red-400" : "text-gray-500"
												}`}>
												<TrashIcon />
											</div>
										</button>
									</td>
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
						})}
					</tr>
				))}
			</tbody>
			{showModal && (
				<Modal
					rows={rows}
					modal={showModal}
					closeModal={setShowModal}
					handleEdit={handleEditRow}
				/>
			)}
		</>
	);
};

export default TableRow;
