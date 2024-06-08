import { CourseWithProgressWithCategory } from "@/actions/get-dashboard-courses";
import CourseCard2 from "@/components/course/course-card-2";

const CourseItem = ({ course }: { course: CourseWithProgressWithCategory }) => {
	return (
		<CourseCard2
			id={course.id}
			title={course.title}
			category={course.category?.name}
			price={course.price as number}
			progress={course.progress}
			imageUrl={course.imageUrl as string}
			chaptersLength={course.chapters?.length}
			description={course.description || ""}
		/>
	);
};

export default CourseItem;
