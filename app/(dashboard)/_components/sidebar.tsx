import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
	return (
		<div className='h-full rounded-[20px] flex flex-col overflow-y-auto bg-[#1B1B1B] shadow-sm py-[30px] px-5'>
			<div className='mb-12'>
				<Logo />
			</div>
			<div className='flex flex-col w-full grow'>
				<SidebarRoutes />
			</div>
		</div>
	);
};
