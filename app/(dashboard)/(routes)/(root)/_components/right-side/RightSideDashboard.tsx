import { IconBadge } from "@/components/icon-badge";
import { getDayFromDayNumber } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { format, getDay } from "date-fns";
import { BookIcon, CheckCircle, GraduationCap } from "lucide-react";

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
		<div className='h-full border-l p-5'>
			{/* RIGHT HEADER  */}
			<div className='flex justify-between items-center'>
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
			<div className='mt-5'>
				<h1 className='text-lg font-medium'>Overall Information</h1>

				<div className='mt-4 flex flex-col gap-4 '>
					<div className='flex justify-between bg-white px-5 py-3 rounded-2xl border shadow-sm items-center'>
						<div className='flex items-center gap-2'>
							<IconBadge icon={GraduationCap} variant={"primary"} />
							<p className='text-sm text-gray-500 font-semibold'>
								Total courses
							</p>
						</div>
						<p className='text-lg text-gray-700'>{totalCourse}</p>
					</div>
					<div className='flex justify-between bg-white px-5 py-3 rounded-2xl border shadow-sm items-center'>
						<div className='flex items-center gap-2'>
							<IconBadge icon={BookIcon} variant={"warning"} />
							<p className='text-sm text-gray-500 font-semibold'>In Progress</p>
						</div>
						<p className='text-lg text-gray-700'>{coursesInProgress}</p>
					</div>
					<div className='flex justify-between bg-white px-5 py-3 rounded-2xl border shadow-sm items-center'>
						<div className='flex items-center gap-2'>
							<IconBadge icon={CheckCircle} variant={"success"} />
							<p className='text-sm text-gray-500 font-semibold'>Completed</p>
						</div>
						<p className='text-lg text-gray-700'>{completedCourses}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RightSideDashboard;
