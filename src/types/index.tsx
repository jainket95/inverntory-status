import { ReactNode } from "react";

export type Products = Product[];

export type Product = {
	category: string;
	name: string;
	price: string;
	quantity: number;
	value: string;
};

export type Widgets = Widget[];

export type Widget = {
	id: string;
	heading: string;
	widgetCount: number;
	icon: ReactNode;
};

type ProductDetails = {
	productData: (string | number)[];
	productItem: object;
};

export type Row = {
	id: string;
	product: ProductDetails;
	isDisabled: boolean;
	isEditing: boolean;
};

export type Rows = Row[];

export type Page = {
	pageData: Rows;
	page: number;
	start: number;
	end: number;
};
