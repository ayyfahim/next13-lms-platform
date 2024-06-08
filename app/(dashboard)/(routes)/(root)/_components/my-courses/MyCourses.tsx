import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import MyCourseItem from "./MyCourseItem";

const MyCourses = async () => {
	const { userId } = auth();
	if (!userId) {
		return redirect("/");
	}
	const { completedCourses, coursesInProgress } = await getDashboardCourses(
		userId
	);

	return (
		<div className='text-slate-700'>
			{/* COURSE HEADER  */}
			<div className='flex justify-between'>
				<h1 className='text-lg font-medium'>My Courses</h1>
				<Link href='/courses'>
					<button className='text-sm text-purple-700 font-semibold'>
						View All
					</button>
				</Link>
			</div>

			{/* COURSE LIST BOX  */}
			<div className='mt-4 w-full'>
				<div className='flex flex-col gap-[10px]'>
					{[...coursesInProgress, ...completedCourses].map((course) => (
						<MyCourseItem key={course.id} course={course} />
					))}
				</div>
			</div>
		</div>
	);
};

export default MyCourses;
