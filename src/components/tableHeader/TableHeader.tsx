import { FC } from "react";

const tableHeader = [
	"name",
	"category",
	"Price",
	"Quantity",
	"value",
	"actions",
];

type TableHeaderProps = {};

const TableHeader: FC<TableHeaderProps> = () => {
	return (
		<thead className="w-full h-1">
			<tr className="flex justify-between items-center w-full mb-5 ">
				{tableHeader.map((item, j) => (
					<th
						key={`${item}-${j}`}
						// colSpan={item === "actions" ? 6 : 3}
						className="text-lg font-normal text-emerald-600 uppercase w-[10rem] text-start">
						{item}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
