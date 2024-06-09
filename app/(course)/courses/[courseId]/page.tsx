import { getCourseById } from "@/actions/get-courses";
import { coursePurchasedInfo } from "@/actions/get-purchase";
import { Badge } from "@/components/ui/badge";
import VideoJsPlayer from "@/components/VideoJsPlayer";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import starIm from "@/public/star.png";
import { auth } from "@clerk/nextjs";
import {
	BadgeCheck,
	BookOpen,
	CheckCircleIcon,
	DownloadCloud,
	Headphones,
	ScrollText,
	Users,
	Video,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import CourseDescription from "./_components/course-description";
import EnrollButton from "./_components/enroll-button";
import CourseContent from "./_components/course-content";
import CourseContentSidebar from "./_components/course-content-sidebar";
import { Purchase } from "@prisma/client";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
	const { userId } = auth();
	if (!userId) {
		return redirect("/");
	}

	const purchase = await coursePurchasedInfo({
		userId,
		courseId: params.courseId,
	});

	const course = await getCourseById({
		userId: userId,
		courseId: params.courseId,
	});

	const cssAppliedContent = (body: string) => `
      <style>
        iframe {
          width: 100%;
          height: 100%;
        }
      </style>
      ${body}`;

	if (!course) {
		return redirect("/");
	}

	const videoJsOptions = {
		techOrder: ["youtube"],
		sources: [
			{
				type: "video/youtube",
				src: course.videoEmbedCode,
			},
		],
		youtube: { ytControls: 0, controls: 0 },
	};

	return (
		<div className=''>
			{/* COURSE TITLE START */}
			<div className=''>
				<div className='mt-4 sm:mt-0'>
					<span className='text-sm text-gray-500'>Courses / </span>
					{course.category?.name && (
						<span className='text-sm text-gray-500'>
							{course.category?.name} /{" "}
						</span>
					)}
					<span className='font-medium text-sm'>{course.title}</span>
				</div>
			</div>
			{/* COURSE TITLE END */}

			{/* COURSE CONTENT START */}
			<div className='course-container grid grid-cols-6 gap-5 mt-4 sm:mt-10'>
				{/* MAIN COURSE CONTENT */}
				<div className='md:col-span-4 col-span-full'>
					{/* COURSE DESCRIPTION */}
					<div className='bg-white rounded-xl shadow border px-2 sm:px-6 py-2 sm:py-6'>
						{/* COURSE DESCRIPTION HEADING  */}
						<div className='flex justify-between gap-2 flex-col-reverse sm:flex-row'>
							<div className='flex gap-2 items-center'>
								<span className='text-yellow-500 bg-yellow-500/10 flex gap-1 items-center px-2 py-1 rounded max-w-max'>
									<Image
										src={starIm}
										alt='Rating icon'
										width={14}
										height={14}
										className='h-[14px] w-[14px]'
									/>
									<span className='text-sm'>4.3</span>
								</span>
								<span className='text-sm text-gray-400'>
									based on{" "}
									<span className='text-purple-700 underline font-medium'>
										1,200 reviews
									</span>
								</span>
							</div>
							<div className='flex gap-2 items-center'>
								<span className='text-sm text-gray-400'>
									{course.category?.name && (
										<Badge variant='info'>{course.category?.name}</Badge>
									)}
								</span>
							</div>
						</div>
						{/* COURSE DESCRIPTION HEADING END  */}

						{/* COURSE DESCRIPTION TITLE  */}
						<div className='mt-2 sm:mt-4'>
							<h1 className='text-lg sm:text-2xl font-semibold'>
								{course.title}
							</h1>
						</div>
						{/* COURSE DESCRIPTION TITLE END  */}

						{/* COURSE DESCRIPTION BODY  */}
						<CourseDescription description={course.description as string} />
						{/* COURSE DESCRIPTION BODY END  */}

						{/* COURSE TEACHER START  */}
						<div className='mt-5 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-5 sm:divide-x-2 sm:items-center'>
							<div className='flex items-center gap-2 sm:gap-4'>
								<Image
									src='/teacher-avatar.png'
									alt='teacher'
									width={50}
									height={50}
									className='rounded-lg h-[40px] w-[40px] object-cover'
								/>
								<span className='text-purple-700 font-semibold text-sm'>
									Jitendra Kumar
								</span>
							</div>
							<div className='sm:px-4 flex gap-1 text-sm text-gray-400'>
								<Users size={18} className='font-medium' />{" "}
								<span className='text-sm'>
									{course.purchases?.length} students bought this course.
								</span>
							</div>
						</div>
						{/* COURSE TEACHER END  */}
					</div>

					<div className='md:hidden mt-5 col-span-2'>
						<CourseContentSidebar
							course={course}
							purchase={purchase as Purchase}
							videoJsOptions={videoJsOptions}
						/>
					</div>

					{/* COURSE CONTENT  */}
					<div className='mt-5'>
						<CourseContent course={course} />
					</div>
				</div>

				{/* CONTENT SIDEBAR  */}
				<div className='hidden md:block col-span-2'>
					<CourseContentSidebar
						course={course}
						purchase={purchase as Purchase}
						videoJsOptions={videoJsOptions}
					/>
				</div>
			</div>
		</div>
	);

	// return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};
export default CourseIdPage;
