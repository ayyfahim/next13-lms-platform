import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { CourseWithProgressWithCategory } from "./get-dashboard-courses";

type GetCourses = {
	userId: string;
	title?: string;
	categoryId?: string;
};

export const getCourses = async ({
	userId,
	title,
	categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
	try {
		const courses = await db.course.findMany({
			where: {
				isPublished: true,
				title: {
					contains: title,
				},
				categoryId,
			},
			include: {
				category: true,
				chapters: {
					where: {
						isPublished: true,
					},
				},
				purchases: {
					where: {
						userId,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const coursesWithProgress: CourseWithProgressWithCategory[] =
			await Promise.all(
				courses.map(async (course) => {
					if (course.purchases.length === 0) {
						return {
							...course,
							progress: null,
						};
					}

					const progress = await getProgress(userId, course.id);

					return {
						...course,
						progress: progress.progressPercentage,
					};
				})
			);

		return coursesWithProgress;
	} catch (error) {
		console.log("[GET_COURSES]", error);
		return [];
	}
};

export const getCourseById = async ({
	courseId,
	userId,
}: {
	courseId: string;
	userId: string;
}): Promise<CourseWithProgressWithCategory | null> => {
	try {
		const course = await db.course.findUnique({
			where: {
				id: courseId,
			},
			include: {
				category: true,
				chapters: {
					where: {
						isPublished: true,
					},
					orderBy: {
						position: "asc",
					},
				},
				purchases: true,
			},
		});

		if (!course) {
			return null;
		}

		const progress = await getProgress(userId, course.id);

		return {
			...course,
			progress: progress.progressPercentage,
			totalLessons: progress.totalLessons,
			completedLessons: progress.completedLessons,
		};
	} catch (error) {
		console.log("[GET_COURSE_BY_ID]", error);
		return null;
	}
};
