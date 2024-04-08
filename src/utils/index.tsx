import {
	CurrencyDollarIcon,
	ShoppingCartIcon,
	TagIcon,
} from "@heroicons/react/24/outline";
import { Product, Products } from "../types";
import { v4 } from "uuid";

export const generateWidgetsData = (products: Products) => {
	const totalProducts = products.length;
	const totalPrice = products.reduce((acc: number, product: Product) => {
		return acc + Number(product.price.split("$")[1]) * product.quantity;
	}, 0);
	const outOfStock = products.filter(
		(product: Product) => product.quantity === 0
	).length;

	const categories = Array.from(
		new Set(products.map((product) => product.category))
	);

	return [
		{
			id: v4(),
			heading: "Total Products",
			widgetCount: totalProducts,
			icon: <ShoppingCartIcon />,
		},
		{
			id: v4(),
			heading: "Total store value",
			widgetCount: totalPrice,
			icon: <CurrencyDollarIcon />,
		},
		{
			id: v4(),
			heading: "Out of stock",
			widgetCount: outOfStock,
			icon: <ShoppingCartIcon />,
		},
		{
			id: v4(),
			heading: "No of Category",
			widgetCount: categories.length,
			icon: <TagIcon />,
		},
	];
};
