import React, { ChangeEvent, useEffect, useState } from "react";
import { Rows } from "../../types";

type ModalProps = {
	rows: Rows;
	modal: {
		check: boolean;
		id: string;
	};
	closeModal: React.Dispatch<
		React.SetStateAction<{
			check: boolean;
			id: string;
		}>
	>;
	handleEdit: (id: string, type: string, userData?: object) => void;
};

type ModalState = {
	category: string;
	price: string;
	quantity: number;
	value: string;
	name: string;
};

const Modal = ({ rows, modal, closeModal, handleEdit }: ModalProps) => {
	const [productData, setProductData] = useState<ModalState>({
		category: "",
		price: "",
		quantity: 0,
		value: "",
		name: "",
	});

	useEffect(() => {
		if (!modal.id) return;
		const rowToEdit = rows.filter((row) => row.id === modal.id)[0];
		const items = rowToEdit.product.productItem;

		console.log(rowToEdit);

		setProductData({ ...items } as ModalState);
	}, [modal.id]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setProductData({ ...productData, [e.target.name]: e.target.value });
	};

	const toggleModal = () => {
		closeModal({ ...modal, check: !modal.check });
	};

	const handleCancel = () => {
		toggleModal();
	};
	const handleSave = () => {
		toggleModal();
		handleEdit(modal.id, "edit", productData);
		setProductData({
			category: "",
			price: "",
			quantity: 0,
			value: "",
			name: "",
		});
	};

	console.log(modal);

	if (modal.check) {
		return (
			<div className="flex w-[100vw] h-[100vh] bg-transparent absolute overflow-hidden justify-center items-center -top-20">
				<div className="flex w-[32rem] h-[25rem] flex-col justify-start items-start bg-gray-900 absolute rounded-lg p-8">
					<div className="flex justify-between items-center w-full">
						<h1 className="text-4xl font-normal capitalize mb-2">
							Edit Product
						</h1>
						<p
							className="text-3xl font-normal text-lime-400"
							onClick={toggleModal}>
							x
						</p>
					</div>
					<h3 className="text-lg font-normal capitalize mb-10 ">
						{productData.name}
					</h3>
					<div className="flex justify-between items-center w-full flex-wrap gap-8 mb-6">
						<label className="flex flex-col text-lg font-normal text-gray-500 w-[10rem] capitalize">
							category
							<input
								className="mt-2 w-full bg-gray-700 rounded-lg text-white pl-3 text-md "
								type="text"
								name="category"
								value={productData.category}
								onChange={handleInputChange}
								placeholder="category"
							/>
						</label>
						<label className="flex flex-col text-lg font-normal text-gray-500 w-[10rem] capitalize">
							price
							<input
								className="mt-2 w-full bg-gray-700 rounded-lg text-white pl-3 text-md "
								type="text"
								name="price"
								value={productData.price}
								onChange={handleInputChange}
								placeholder="price"
							/>
						</label>
						<label className="flex flex-col text-lg font-normal text-gray-500 w-[10rem] capitalize">
							quantity
							<input
								className="mt-2 w-full bg-gray-700 rounded-lg text-white pl-3 text-md "
								type="number"
								name="quantity"
								value={productData.quantity}
								onChange={handleInputChange}
								placeholder="quantity"
							/>
						</label>
						<label className="flex flex-col text-lg font-normal text-gray-500 w-[10rem] capitalize">
							value
							<input
								className="mt-2 w-full bg-gray-700 rounded-lg text-white pl-3 text-md "
								type="text"
								name="value"
								value={`$${
									Number(productData.price.split("$")[1]) * productData.quantity
								}`}
								onChange={handleInputChange}
								placeholder="value"
							/>
						</label>
					</div>
					<div className="flex justify-end items-center w-full">
						<button
							className="text-lg font-normal capitalize text-lime-400 p-2 mr-2"
							onClick={handleCancel}>
							cancel
						</button>
						<button
							className="text-lg font-normal capitalize rounded-lg bg-gray-700 p-1 px-2"
							onClick={handleSave}>
							Save
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Modal;
