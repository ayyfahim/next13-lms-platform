import { getTopCourses } from "@/actions/get-top-courses";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import CourseItem from "./CourseItem";

const TopCourse = async () => {
	const { userId } = auth();
	const topCourses = await getTopCourses(userId as string);

	return (
		<div className='text-slate-700'>
			{/* COURSE HEADER  */}
			<div className='flex justify-between'>
				<h1 className='text-lg font-medium'>Top Courses you may like</h1>
				<Link href='/courses'>
					<button className='text-sm text-purple-700 font-semibold'>
						View All
					</button>
				</Link>
			</div>

			{/* COURSE LIST BOX  */}
			<div className='mt-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]'>
					{[...topCourses].map((course) => (
						<CourseItem key={course.id} course={course} />
					))}
				</div>
			</div>
		</div>
	);
};

export default TopCourse;
