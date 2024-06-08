import MyCourses from "./_components/my-courses/MyCourses";
import TopCourse from "./_components/top-course/TopCourse";

export default async function Dashboard() {
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
			<div className='flex flex-wrap'>
				{/* LEFT SIDE */}
				<div className='basis-[60%] grow py-[25px] pr-5'>
					{/* TOP COURSE SECTION */}
					<div className=''>
						<TopCourse />
					</div>

					{/* MY COURSES SECTION */}
					<div className='mt-5'>
						<MyCourses />
					</div>
				</div>
				{/* RIGHT SIDE */}
				<div className='basis-[40%]'></div>
			</div>
		</div>
	);
}
