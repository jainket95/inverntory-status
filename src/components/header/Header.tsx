import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import SwitchButton from "../switch-button/SwitchButton";

const Header = () => {
	return (
		<div className="w-[96%] flex justify-end items-center fixed z-10 my-2 bg-black">
			<div className="flex justify-between items-center">
				<p className="text-md font-light text-gray-200 mr-5">admin</p>
				<SwitchButton />
				<p className="text-md font-light text-gray-200 mx-5">user</p>
				<div className="w-6 mr-3 text-white">
					<ArrowRightEndOnRectangleIcon />
				</div>
			</div>
		</div>
	);
};

export default Header;
