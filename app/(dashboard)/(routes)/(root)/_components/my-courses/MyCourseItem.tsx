import { CourseWithProgressWithCategory } from "@/actions/get-dashboard-courses";
import { CourseProgress } from "@/components/course/course-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const MyCourseItem = ({
	course,
}: {
	course: CourseWithProgressWithCategory;
}) => {
	return (
		<div className='rounded-[14px] shadow p-2 border bg-white'>
			<div className='flex justify-between gap-2'>
				{/* LEFT SIDE */}
				<div className='flex items-center gap-3 grow'>
					<div className=''>
						<Image
							src={course.imageUrl || ""}
							alt={course.title}
							width={40}
							height={40}
							className='object-cover h-10 w-10 rounded-lg'
						/>
					</div>
					<div className='grow'>
						<h1 className='text-sm font-medium'>{course.title}</h1>
						<div className='mt-1 text-sm text-gray-500'>
							{course.completedLessons || 0} out of {course.totalLessons || 0}{" "}
							modules Completed.
						</div>
					</div>
				</div>

				{/* RIGHT SIDE  */}
				<div className='flex items-center gap-2'>
					<div className='min-w-[200px]'>
						{course.progress !== null ? (
							<CourseProgress
								textClassName='mt-0'
								progressClassName='h-[10px] bg-gray-200'
								variant={course.progress === 100 ? "success" : "default"}
								size='sm'
								value={course.progress}
							/>
						) : (
							""
						)}
					</div>
					<div className='flex items-center gap-2 min-w-[120px]'>
						<Link href={`/courses/${course.id}`} className='w-full'>
							{course.progress === 100 ? (
								<Button
									variant={"success"}
									size={"sm"}
									className='disabled w-full opacity-80'>
									Completed
								</Button>
							) : (
								<Button
									variant={"info"}
									size={"sm"}
									className='disabled w-full'>
									Continue
								</Button>
							)}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyCourseItem;
