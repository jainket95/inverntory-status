import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
import { generateWidgetsData } from "./utils";
import Widgets from "./components/widgets/Widgets";
import { Product, Row, Rows } from "./types";
import { v4 } from "uuid";
import Table from "./components/table/Table";

function App() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productRows, setProductRows] = useState([]);

	useEffect(() => {
		if (Array.isArray(products) && products.length === 0) fetchProducts();
	}, [products]);

	const fetchProducts = async () => {
		setLoading(true);
		const response = await fetch(
			"https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
		);

		const data = await response.json();

		const rowsData = data.map((item: Product) => ({
			// id: `${item.name}-${item.id}`,
			id: `${v4()}`,
			product: {
				productItem: item,
				productData: [...Object.values(item), "actions"],
			},
			isChecked: false,
			isEditing: false,
		}));
		setProducts(data);
		setProductRows(rowsData);
		setLoading(false);
	};

	const handleDeleteRow = (id: string) => {
		const rowsData = productRows.filter((row: Row) => row.id !== id);

		setProductRows([...rowsData]);
	};

	const handleEditRow = (id: string, userData: object) => {
		const rowsData = productRows
			.map((row: Row) => {
				if (row.id === id) {
					if (row.isEditing && Object.keys(userData).length > 0) {
						return {
							...row,
							isEditing: !row.isEditing,
							user: {
								...row.product,
								productItem: { ...row.product.productItem, ...userData },
							},
						};
					}
					return {
						...row,
						isEditing: !row.isEditing,
					};
				}

				return row;
			})
			.map((row: Row) => ({
				...row,
				user: {
					...row.product,
					userData: [...Object.values(row.product.productItem), "actions"],
				},
			}));

		setProductRows(rowsData);
	};

	console.log(products, productRows);

	return (
		<div className="w-[100vw] h-[100vh] bg-black text-white">
			<div className="container mx-auto bg-black">
				<Header />
				<div className="flex flex-col items-start justify-between pt-10">
					<h1 className="text-4xl font-formal mb-8">Inventory Stats</h1>
					{loading ? (
						<Loader />
					) : (
						<div className="w-full">
							<Widgets widgets={generateWidgetsData(products)} />
							<div className="flex flex-col items-start justify-between pt-10">
								<Table
									rows={productRows}
									handleDeleteRow={handleDeleteRow}
									handleEditRow={handleEditRow}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
