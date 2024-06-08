import { auth } from "@clerk/nextjs";
import MyCourses from "./_components/my-courses/MyCourses";
import RightSideDashboard from "./_components/right-side/RightSideDashboard";
import TopCourse from "./_components/top-course/TopCourse";
import { redirect } from "next/navigation";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";

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
			<div className='flex flex-wrap min-h-screen'>
				{/* LEFT SIDE */}
				<div className='basis-[70%] grow py-[25px] pr-5'>
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
				<div className='basis-[30%]'>
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
