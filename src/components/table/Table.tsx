import TableHeader from "../tableHeader/TableHeader";
import TableRow from "../tableRow/TableRow";
import { Rows } from "../../types";

type TableProps = {
	isAdmin: boolean;
	rows: Rows;
	handleDeleteRow: (id: string) => void;
	handleEditRow: (id: string, type: string, userData?: object) => void;
};

const Table = ({
	isAdmin,
	rows,
	handleDeleteRow,
	handleEditRow,
}: TableProps) => {
	return (
		<table className="w-full">
			<TableHeader />
			<TableRow
				isAdmin={isAdmin}
				rows={rows}
				handleDeleteRow={handleDeleteRow}
				handleEditRow={handleEditRow}
			/>
		</table>
	);
};

export default Table;
