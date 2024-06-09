import { NavbarRoutes } from "@/components/navbar-routes";

export const Navbar = () => {
	return (
		<div className='pt-[25px] flex items-center bg-white'>
			{/* <MobileSidebar /> */}
			<h1 className='text-lg font-medium'>Course Details</h1>
			<NavbarRoutes />
		</div>
	);
};
