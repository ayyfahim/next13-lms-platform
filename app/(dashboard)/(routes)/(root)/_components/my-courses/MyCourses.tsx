import { CourseWithProgressWithCategory } from "@/actions/get-dashboard-courses";
import Link from "next/link";
import MyCourseItem from "./MyCourseItem";

const MyCourses = async ({
	courses,
}: {
	courses: CourseWithProgressWithCategory[];
}) => {
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
					{courses.map((course) => (
						<MyCourseItem key={course.id} course={course} />
					))}
				</div>
			</div>
		</div>
	);
};

export default MyCourses;
