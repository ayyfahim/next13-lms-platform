import { auth } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { Navbar } from "@/app/(dashboard)/_components/navbar";
import { Sidebar } from "@/app/(dashboard)/_components/sidebar";

const CourseLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { courseId: string };
}) => {
	const { userId } = auth();

	let isChaptersPage = false;

	// @ts-ignore
	if (children?.props?.childProp?.segment == "(chapters)") {
		isChaptersPage = true;
	} else {
		isChaptersPage = false;
	}

	if (!userId) {
		return redirect("/");
	}

	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		},
		include: {
			chapters: {
				where: {
					isPublished: true,
				},
				include: {
					userProgress: {
						where: {
							userId,
						},
					},
				},
				orderBy: {
					position: "asc",
				},
			},
		},
	});

	if (!course) {
		return redirect("/");
	}

	const progress = await getProgress(userId, course.id);

	if (isChaptersPage) {
		return (
			<div className='h-full'>
				<div className='h-[80px] md:pl-80 fixed inset-y-0 w-full z-50'>
					<CourseNavbar
						course={course}
						progressCount={progress.progressPercentage}
					/>
				</div>
				<div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>
					<CourseSidebar
						course={course}
						progressCount={progress.progressPercentage}
					/>
				</div>
				<main className='md:pl-80 pt-[80px] h-full'>{children}</main>
			</div>
		);
	}

	return (
		<div className='h-full'>
			<div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
				<Navbar />
			</div>
			<div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
				<Sidebar />
			</div>
			<main className='md:pl-56 pt-[80px] h-full'>{children}</main>
		</div>
	);
};

export default CourseLayout;
