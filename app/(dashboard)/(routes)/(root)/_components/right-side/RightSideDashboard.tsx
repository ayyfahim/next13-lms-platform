import { IconBadge } from "@/components/icon-badge";
import { getDayFromDayNumber } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { format, getDay } from "date-fns";
import { BookIcon, CheckCircle, GraduationCap } from "lucide-react";
import InformationItem from "./InformationItem";

const RightSideDashboard = ({
	totalCourse,
	coursesInProgress,
	completedCourses,
}: {
	totalCourse: number;
	coursesInProgress: number;
	completedCourses: number;
}) => {
	return (
		<div className='h-full md:border-l pr-5 md:p-5'>
			{/* RIGHT HEADER  */}
			{/* HIDDEN in small device */}
			<div className='hidden md:flex justify-between items-center'>
				<div className=''>
					<h2 className='text-xl text-slate-600'>
						{getDayFromDayNumber(getDay(new Date()))}
					</h2>
					<p className='text-sm text-gray-500'>
						{format(new Date(), "MMM dd, yyyy")}
					</p>
				</div>
				<div className=''>
					<UserButton afterSignOutUrl='/' />
				</div>
			</div>

			{/* RIGHT USER STATS */}
			<div className='md:mt-5'>
				<h1 className='text-lg md:font-medium'>Overall Information</h1>

				<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 md:gap-4'>
					<InformationItem
						icon={GraduationCap}
						variant='primary'
						title='Total Courses'
						content={totalCourse?.toString()}
					/>
					<InformationItem
						icon={BookIcon}
						variant='warning'
						title='In Progress'
						content={coursesInProgress?.toString()}
					/>
					<InformationItem
						icon={CheckCircle}
						variant='success'
						title='Completed'
						content={completedCourses?.toString()}
					/>
				</div>
			</div>
		</div>
	);
};

export default RightSideDashboard;
