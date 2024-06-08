"use client";

import {
	BarChart,
	Book,
	CreditCard,
	Headphones,
	Home,
	List,
	Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
	{
		icon: Home,
		label: "Dashboard",
		href: "/",
	},
	{
		icon: Book,
		label: "Courses",
		href: "/courses",
	},
	{
		icon: CreditCard,
		label: "Payments",
		href: "/payments",
	},
];

const teacherRoutes = [
	{
		icon: List,
		label: "Courses",
		href: "/teacher/courses",
	},
	{
		icon: BarChart,
		label: "Analytics",
		href: "/teacher/analytics",
	},
];

const bottomRoutes = [
	{
		icon: Headphones,
		label: "Support",
		href: "/support",
	},
	{
		icon: Settings,
		label: "Settings",
		href: "/settings",
	},
];

export const SidebarRoutes = () => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.includes("/teacher");

	const routes = isTeacherPage ? teacherRoutes : guestRoutes;

	return (
		<div className='flex flex-col h-full'>
			<div className='grow flex flex-col w-full gap-1'>
				{routes.map((route) => (
					<SidebarItem
						key={route.href}
						icon={route.icon}
						label={route.label}
						href={route.href}
					/>
				))}
			</div>
			{/* BOTTOM ROUTES */}
			<div className='border-[#d9d9d9]/30 border-t-[0.3px]'>
				<div className='pt-[20px] w-full'>
					{bottomRoutes.map((route) => (
						<SidebarItem
							key={route.href}
							icon={route.icon}
							label={route.label}
							href={route.href}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
