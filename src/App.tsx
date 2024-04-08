import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
import { generateWidgetsData } from "./utils";
import Widgets from "./components/widgets/Widgets";
import { Product, Products, Row, Rows } from "./types";
import { v4 } from "uuid";
import Table from "./components/table/Table";

const data = [
	{
		name: "Bluetooth",
		category: "Electronic",
		value: "$150",
		quantity: 5,
		price: "$30",
	},
	{
		name: "Edifier M43560",
		category: "Electronic",
		value: "100",
		quantity: 10,
		price: "$10",
	},
	{
		name: "Sony 4k ultra 55 inch TV",
		category: "Electronic",
		value: "$1190",
		quantity: 17,
		price: "$70",
	},
	{
		name: "Samsumg 55 inch TV",
		category: "Electronic",
		value: "$600",
		quantity: 50,
		price: "$12",
	},
	{
		name: "samsumg S34 Ultra",
		category: "phone",
		value: "$0",
		quantity: 0,
		price: "$0",
	},
];

function App() {
	const [products, setProducts] = useState<Products>([]);
	const [loading, setLoading] = useState(false);
	const [productRows, setProductRows] = useState<Rows>([]);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (Array.isArray(products) && products.length === 0) fetchProducts();
	}, [products]);

	const fetchProducts = async () => {
		setLoading(true);
		// const response = await fetch(
		// 	"https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
		// );

		// const data = await response.json();

		const rowsData = data.map((item: Product) => ({
			// id: `${item.name}-${item.id}`,
			id: `${v4()}`,
			product: {
				productItem: item,
				productData: [...Object.values(item), "actions"],
			},
			isDisabled: false,
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
	const handleEditRow = (id: string, type: string, productData?: object) => {
		const rowsData = productRows
			.map((row: Row) => {
				if (row.id === id && type === "edit") {
					if (
						row.isEditing &&
						productData &&
						Object.keys(productData).length > 0
					) {
						return {
							...row,
							isEditing: !row.isEditing,
							product: {
								...row.product,
								productItem: { ...row.product.productItem, ...productData },
							},
						};
					}
					return {
						...row,
						isEditing: !row.isEditing,
					};
				} else if (row.id === id && type === "disable") {
					if (!row.isDisabled) {
						return {
							...row,
							isDisabled: !row.isDisabled,
						};
					}
				}

				return row;
			})
			.map((row: Row) => ({
				...row,
				product: {
					...row.product,
					productData: [...Object.values(row.product.productItem), "actions"],
				},
			}));

		setProductRows(rowsData);
	};

	console.log(productRows);

	return (
		<div className="w-[100vw] h-[100vh] bg-black text-white relative overflow-hidden">
			<div className="container mx-auto bg-black">
				<Header isAdmin={isAdmin} setAdmin={setIsAdmin} />
				<div className="flex flex-col items-start justify-between pt-10">
					<h1 className="text-4xl font-formal mb-8">Inventory Stats</h1>
					{loading ? (
						<Loader />
					) : (
						<div className="w-full">
							<Widgets widgets={generateWidgetsData(products)} />
							<div className="flex flex-col items-start justify-between pt-10">
								<Table
									isAdmin={isAdmin}
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
