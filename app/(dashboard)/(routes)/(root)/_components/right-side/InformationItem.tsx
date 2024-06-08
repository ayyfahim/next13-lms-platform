import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

const InformationItem = ({
	variant,
	icon,
	title,
	content,
}: {
	variant: "default" | "success" | "primary" | "warning" | "danger";
	icon: LucideIcon;
	title: string;
	content: string;
}) => {
	return (
		<div className='flex justify-between bg-white px-3 md:px-5 py-2 md:py-3 rounded-2xl border shadow-sm items-center'>
			<div className='flex items-center gap-2'>
				<IconBadge icon={icon} variant={variant} />
				<p className='text-sm text-gray-500 font-semibold'>{title}</p>
			</div>
			<p className='text-lg text-gray-700'>{content}</p>
		</div>
	);
};

export default InformationItem;
