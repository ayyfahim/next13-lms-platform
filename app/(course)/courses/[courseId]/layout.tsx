import { auth } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { Sidebar } from "@/app/(dashboard)/_components/sidebar";
import { cn } from "@/lib/utils";
import { Navbar } from "./_components/navbar";

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
		<div className='min-h-screen bg-[#fcfcff] overflow-visible pr-2 sm:pr-5'>
			{/* <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div> */}
			<div className={cn("flex w-full flex-row flex-nowrap")}>
				<div
					className={cn(
						"flex basis-[75px] sm:basis-[100px] lg:basis-[320px] min-w-[75px] sm:min-w-[100px] lg:min-w-[320px] flex-col inset-y-0 z-50 sticky top-0"
					)}>
					<div className='h-screen sticky top-0'>
						{/* BEGIN: Sidebar container */}
						<div className='p-2 sm:p-5 h-full'>
							<Sidebar />
						</div>
						{/* END: Sidebar container */}
					</div>
				</div>
				<div className='flex flex-col min-h-screen grow pb-2 sm:pb-5'>
					<Navbar />
					<main className={cn("grow")}>{children}</main>
				</div>
			</div>
		</div>
	);
};

export default CourseLayout;
