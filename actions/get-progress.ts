import { db } from "@/lib/db";

export const getProgress = async (
	userId: string,
	courseId: string
): Promise<{
	progressPercentage: number;
	totalLessons: number;
	completedLessons: number;
}> => {
	try {
		const publishedChapters = await db.chapter.findMany({
			where: {
				courseId: courseId,
				isPublished: true,
			},
			select: {
				id: true,
			},
		});

		const publishedChapterIds = publishedChapters.map(
			(chapter) => chapter.id
		) as string[];

		const validCompletedChapters = await db.userProgress.count({
			where: {
				userId: userId,
				chapterId: {
					in: publishedChapterIds,
				},
				isCompleted: true,
			},
		});

		const progressPercentage =
			(validCompletedChapters / publishedChapterIds.length) * 100;

		return {
			progressPercentage,
			totalLessons: publishedChapterIds.length,
			completedLessons: validCompletedChapters,
		};
	} catch (error) {
		console.log("[GET_PROGRESS]", error);
		return {
			progressPercentage: 0,
			totalLessons: 0,
			completedLessons: 0,
		};
	}
};
