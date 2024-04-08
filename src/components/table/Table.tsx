import TableHeader from "../tableHeader/TableHeader";
import TableRow from "../tableRow/TableRow";
import { Rows } from "../../types";

type TableProps = {
	rows: Rows;
	handleDeleteRow: (id: string) => void;
	handleEditRow: (id: string, userData: object) => void;
};

const Table = ({ rows, handleDeleteRow, handleEditRow }: TableProps) => {
	return (
		<table className="w-full">
			<TableHeader />
			<TableRow
				rows={rows}
				handleDeleteRow={handleDeleteRow}
				handleEditRow={handleEditRow}
			/>
		</table>
	);
};

export default Table;
