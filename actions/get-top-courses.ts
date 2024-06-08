import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { CourseWithProgressWithCategory } from "./get-dashboard-courses";

/**
 * Get the top four courses for the dashboard page. Please make sure that, enrolled courses are not included in the top courses.
 * @param userId string
 * @returns top four courses
 */
export const getTopCourses = async (
	userId: string
): Promise<CourseWithProgressWithCategory[]> => {
	try {
		const topCourses = (await db.course.findMany({
			where: {
				// isPublished: true,
			},
			take: 4,
		})) as CourseWithProgressWithCategory[];

		for (let course of topCourses) {
			const progress = await getProgress(userId, course.id);
			course["progress"] = progress;
		}

		return topCourses;
	} catch (error) {
		console.log("[GET_DASHBOARD_COURSES]", error);
		return [];
	}
};
