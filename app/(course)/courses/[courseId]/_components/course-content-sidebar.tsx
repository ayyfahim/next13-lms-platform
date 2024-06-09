import VideoJsPlayer from "@/components/VideoJsPlayer";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Course, Purchase } from "@prisma/client";
import {
	BadgeCheck,
	BookOpen,
	CheckCircleIcon,
	DownloadCloud,
	Headphones,
	ScrollText,
	Video,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import EnrollButton from "./enroll-button";

const CourseContentSidebar = ({
	course,
	videoJsOptions,
	purchase,
}: {
	course: Course;
	videoJsOptions: any;
	purchase: Purchase | null;
}) => {
	return (
		<div className=''>
			<div className='bg-white rounded-xl shadow border px-2 sm:px-6 py-2 sm:py-6'>
				{/* THUMNAIL VIDEO */}
				{course.videoEmbedCode && videoJsOptions.sources ? (
					<div className='aspect-video shadow rounded-xl overflow-hidden'>
						<VideoJsPlayer options={videoJsOptions} />
					</div>
				) : (
					<div className='rounded-xl overflow-hidden shadow'>
						<Image
							src={course.imageUrl as string}
							alt='course thumbnail'
							width={300}
							height={200}
							className='rounded-lg w-full'
						/>
					</div>
				)}

				{/* COURSE PRICE */}
				{!purchase && (
					<div className='mt-4'>
						<span
							className={cn("text-3xl font-semibold", {
								"text-success": course.price === 0,
							})}>
							{course.price === 0
								? "FREE"
								: `${formatPrice(course.price || 0)}`}
						</span>
					</div>
				)}

				{/* COURSE ENROLL BUTTON */}
				<div className='mt-4'>
					{purchase ? (
						<>
							<span className='text-success font-semibold flex gap-1 text-sm'>
								<CheckCircleIcon />
								Aleady Enrolled
							</span>
						</>
					) : (
						<EnrollButton courseId={course.id} />
					)}
				</div>

				{/* COURSE INFO */}
				<div className='mt-8 border-t-[0.5px] border-gray-300 pt-5'>
					<h1 className='text-lg sm:text-xl font-medium'>
						This course includes
					</h1>
					<div className='mt-4 flex flex-col gap-2 text-sm sm:text-base'>
						<div className='flex gap-2 items-center text-gray-400 text-base'>
							<BookOpen size={16} className='' />
							<span>12 Modules</span>
						</div>
						<div className='flex gap-2 items-center text-gray-400 text-base'>
							<Video size={16} className='' />
							<span>86 hours on Demand video</span>
						</div>
						<div className='flex gap-2 items-center text-gray-400 text-base'>
							<ScrollText size={16} className='' />
							<span>84 quiz</span>
						</div>
						<div className='flex gap-2 items-center text-gray-400 text-base'>
							<DownloadCloud size={16} className='' />
							<span>32 Downloadable resources</span>
						</div>
						<div className='flex gap-2 items-center text-gray-400 text-base'>
							<Headphones size={16} className='' />
							<span>Long Term Support</span>
						</div>
						<div className='flex gap-2 items-center text-gray-400 text-base'>
							<BadgeCheck size={16} className='' />
							<span>Certificate on completion</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseContentSidebar;
