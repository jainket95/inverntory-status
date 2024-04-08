const tableHeader = [
	"name",
	"category",
	"Price",
	"Quantity",
	"value",
	"actions",
];

// type TableHeaderProps = {};

const TableHeader = () => {
	return (
		<thead className="w-full">
			<tr className="flex justify-between items-center w-full mb-5 border-b-2 border-b-gray-700">
				{tableHeader.map((item, j) => (
					<th
						key={`${item}-${j}`}
						className="text-lg font-normal text-lime-500 uppercase w-[10rem] text-start">
						{item}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
