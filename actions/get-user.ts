// import { db } from "@/lib/db";

// /**
//  * Get a user by id
//  * @param userId string
//  * @returns user
//  */
// export const getUserById = async ({
// 	userId,
// 	courseId,
// }: {
// 	userId: string;
// 	courseId: string;
// }) => {
// 	try {
// 		const purchase = await db.user.findUnique({
// 			where: {
// 				userId_courseId: {
// 					userId: userId,
// 					courseId: courseId,
// 				},
// 			},
// 		});

// 		return purchase;
// 	} catch (error) {
// 		console.log("[GET_DASHBOARD_COURSES]", error);
// 		return [];
// 	}
// };
