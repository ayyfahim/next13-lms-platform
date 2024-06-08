import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
	value: number;
	variant?: "default" | "success";
	size?: "default" | "sm";
	className?: string;
	textClassName?: string;
	progressClassName?: string;
}

const colorByVariant = {
	default: "text-sky-700",
	success: "text-success",
};

const sizeByVariant = {
	default: "text-sm",
	sm: "text-xs",
};

export const CourseProgress = ({
	value,
	variant,
	size,
	className,
	textClassName,
	progressClassName,
}: CourseProgressProps) => {
	return (
		<div className={cn(className)}>
			<Progress
				className={cn("h-2", progressClassName)}
				value={value}
				variant={variant}
			/>
			<p
				className={cn(
					"font-medium mt-1 text-info",
					textClassName,
					colorByVariant[variant || "default"],
					sizeByVariant[size || "default"]
				)}>
				{Math.round(value)}% Complete
			</p>
		</div>
	);
};
