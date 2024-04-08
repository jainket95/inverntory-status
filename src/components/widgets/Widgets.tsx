import { Widgets } from "../../types";
import Widget from "../widget/Widget";

type WidgetProps = {
	widgets: Widgets;
};

const Widgets = ({ widgets }: WidgetProps) => {
	return (
		<div className="flex justify-between items-center gap-4 w-full">
			{widgets.length > 0 &&
				widgets.map((widget) => <Widget key={widget.id} {...widget} />)}
		</div>
	);
};

export default Widgets;
