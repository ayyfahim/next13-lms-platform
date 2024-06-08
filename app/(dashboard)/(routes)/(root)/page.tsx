import { auth, UserButton } from "@clerk/nextjs";
import MyCourses from "./_components/my-courses/MyCourses";
import RightSideDashboard from "./_components/right-side/RightSideDashboard";
import TopCourse from "./_components/top-course/TopCourse";
import { redirect } from "next/navigation";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { getDayFromDayNumber } from "@/lib/utils";
import { format, getDay } from "date-fns";

export default async function Dashboard() {
	const { userId } = auth();
	if (!userId) {
		return redirect("/");
	}
	const { completedCourses, coursesInProgress } = await getDashboardCourses(
		userId
	);

	return (
		<div className=''>
			{/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<InfoCard
					icon={Clock}
					label='In Progress'
					numberOfItems={coursesInProgress.length}
				/>
				<InfoCard
					icon={CheckCircle}
					label='Completed'
					numberOfItems={completedCourses.length}
					variant='success'
				/>
			</div> */}
			{/* <CoursesList items={[...coursesInProgress, ...completedCourses]} /> */}

			{/* MAIN DASHBOARD CONTAINER  */}
			<div className='flex flex-wrap min-h-screen flex-col md:flex-row'>
				{/* LEFT SIDE */}
				{/* HEADER GOES HERE (Only for small device) */}
				<div className='md:hidden flex justify-between items-center pt-[10px] sm:pt-[25px] pr-2 sm:pr-5'>
					<div className=''>
						<h2 className='text-lg sm:text-xl text-slate-600'>
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

				<div className='basis-full md:basis-[70%] md:grow pt-3 sm:pt-[25px] pb-[25px] pr-2 sm:pr-5'>
					{/* TOP COURSE SECTION */}
					<div className=''>
						<TopCourse />
					</div>

					{/* MY COURSES SECTION */}
					<div className='mt-5'>
						<MyCourses courses={[...coursesInProgress, ...completedCourses]} />
					</div>
				</div>
				{/* RIGHT SIDE */}
				<div className='basis-full md:basis-[30%]'>
					<RightSideDashboard
						totalCourse={[...coursesInProgress, ...completedCourses].length}
						coursesInProgress={coursesInProgress.length}
						completedCourses={completedCourses.length}
					/>
				</div>
			</div>
		</div>
	);
}
