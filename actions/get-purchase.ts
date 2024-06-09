import { db } from "@/lib/db";

/**
 * Get the purchase information of a course for a user
 * @param userId string
 * @param courseId string
 * @returns purchase
 */
export const coursePurchasedInfo = async ({
	userId,
	courseId,
}: {
	userId: string;
	courseId: string;
}) => {
	try {
		const purchase = await db.purchase.findUnique({
			where: {
				userId_courseId: {
					userId: userId,
					courseId: courseId,
				},
			},
		});

		return purchase;
	} catch (error) {
		console.log("[GET_DASHBOARD_COURSES]", error);
		return [];
	}
};
