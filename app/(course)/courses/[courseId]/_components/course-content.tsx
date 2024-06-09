import { CourseWithProgressWithCategory } from "@/actions/get-dashboard-courses";
import { BookOpen } from "lucide-react";
import React from "react";
import CourseModuleItem from "./course-module-item";

const CourseContent = ({
	course,
}: {
	course: CourseWithProgressWithCategory;
}) => {
	return (
		<div className='bg-white rounded-xl shadow-sm border px-2 sm:px-6 py-2 sm:py-6'>
			{/* COURSE CONTENT HEADER START  */}
			<h1 className='text-lg font-medium'>Course Content</h1>
			<div className='flex text-sm text-gray-500 gap-2 mt-2 sm:mt-5 items-center'>
				<BookOpen size={18} />
				<span className=''>{course.chapters.length} Chapters</span>
			</div>
			{/* COURSE CONTENT HEADER END  */}
			{/* COURSE CONTENT BODY START  */}
			<div className='mt-5 flex flex-col gap-5'>
				{course.chapters.map((chapter, idx) => (
					<CourseModuleItem key={chapter.id} serial={idx} chapter={chapter} />
				))}
			</div>
		</div>
	);
};

export default CourseContent;
