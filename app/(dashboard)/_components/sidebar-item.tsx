"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
	const pathname = usePathname();
	const router = useRouter();

	let isActive =
		(pathname === "/" && href === "/") ||
		pathname === href ||
		pathname?.startsWith(`${href}/`);

	// if (label == "Browse") {
	// 	isActive = pathname?.startsWith(`/courses/`) || pathname === "/search";
	// }

	// const onClick = () => {
	// 	router.push(href);
	// };

	return (
		<div
			className={cn("hover:bg-[#2a2a2a] rounded", {
				"bg-[#2a2a2a]": isActive,
			})}>
			<Link href={href}>
				<button
					// onClick={onClick}
					type='button'
					className={cn(
						"w-full p-[10px] flex items-center gap-x-2 text-[#d9d9d9] text-sm font-[500] transition-all"
					)}>
					<div className='flex items-center gap-x-2'>
						<Icon size={22} className={cn("text-[#d9d9d9]")} />
						<span className='hidden lg:inline-block'>{label}</span>
					</div>
				</button>
			</Link>
		</div>
	);
};
