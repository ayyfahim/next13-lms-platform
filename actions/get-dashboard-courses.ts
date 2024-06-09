import { Category, Chapter, Course, Purchase } from "@prisma/client";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

export type CourseWithProgressWithCategory = Course & {
	category: Category | null;
	chapters: Chapter[];
	progress: number | null;
	totalLessons?: number;
	completedLessons?: number;
	purchases?: Purchase[];
};

type DashboardCourses = {
	completedCourses: CourseWithProgressWithCategory[];
	coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
	userId: string
): Promise<DashboardCourses> => {
	try {
		const purchasedCourses = await db.purchase.findMany({
			where: {
				userId: userId,
			},
			select: {
				course: {
					include: {
						category: true,
						chapters: {
							where: {
								isPublished: true,
							},
						},
					},
				},
			},
		});

		const courses = purchasedCourses.map(
			(purchase) => purchase.course
		) as CourseWithProgressWithCategory[];

		for (let course of courses) {
			const progress = await getProgress(userId, course.id);
			course["progress"] = progress.progressPercentage;
			course.totalLessons = progress.totalLessons;
			course.completedLessons = progress.completedLessons;
		}

		const completedCourses = courses.filter(
			(course) => course.progress === 100
		);
		const coursesInProgress = courses.filter(
			(course) => (course.progress ?? 0) < 100
		);

		return {
			completedCourses,
			coursesInProgress,
		};
	} catch (error) {
		console.log("[GET_DASHBOARD_COURSES]", error);
		return {
			completedCourses: [],
			coursesInProgress: [],
		};
	}
};
