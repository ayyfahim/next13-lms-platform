import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
	value: number;
	variant?: "default" | "success";
	size?: "default" | "sm";
	className?: string;
	textClassName?: string;
	progressClassName?: string;
	totalLessons?: number;
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
	totalLessons,
}: CourseProgressProps) => {
	return (
		<div className={cn(className)}>
			<Progress
				className={cn("h-2 relative", progressClassName)}
				value={value}
				variant={variant}>
				<div className='absolute left-0 top-0 z-50 w-full h-full'>
					<div className={`flex h-full`}>
						{Array.from({ length: totalLessons || 1 }).map((_, i) => (
							<div
								key={i}
								className={cn(
									`last:border-0 border-r border-white/70 h-full flex-1`
								)}></div>
						))}
					</div>
				</div>
			</Progress>
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
