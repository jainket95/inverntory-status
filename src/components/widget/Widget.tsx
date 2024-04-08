import { ReactNode } from "react";

type WidgetProps = {
	heading: string;
	icon: ReactNode;
	widgetCount: number;
};

const Widget = ({ heading, icon, widgetCount }: WidgetProps) => {
	return (
		<div className="flex justify-start items-start p-4 bg-emerald-950 w-full h-28 rounded-xl">
			<div className="flex justify-center items-center mr-2 px-2">
				<div className="w-6 mr-3 text-white">{icon}</div>
			</div>
			<div className="flex flex-col justify-between items-start">
				<p className="text-lg font-normal mb-4">{heading}</p>
				<p className="text-xl font-semibold">{widgetCount}</p>
			</div>
		</div>
	);
};

export default Widget;
