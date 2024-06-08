import { BookOpen, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CourseProgress } from "@/components/course/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { Badge } from "../ui/badge";
import star from "@/public/star.png";
import { Tooltip } from "recharts";

interface CourseCardProps {
	id: string;
	title: string;
	imageUrl?: string;
	chaptersLength: number;
	price: number;
	progress: number | null;
	category: string;
	description: string;
}

const CourseCard2 = ({
	id,
	title,
	imageUrl,
	chaptersLength,
	price,
	progress,
	category,
	description,
}: CourseCardProps) => {
	const difficulityLevel = Math.floor(Math.random() * 3) + 1;

	return (
		<div className='group hover:shadow-sm transition overflow-hidden border rounded-[16px] p-4 h-full bg-white'>
			<Link href={`/courses/${id}`}>
				{imageUrl ? (
					<div className='relative w-full aspect-video rounded-[16px] overflow-hidden h-[150px]'>
						<Image
							fill
							className='object-cover h-full w-full group-hover:scale-110 duration-300'
							alt={title}
							src={imageUrl}
						/>
					</div>
				) : (
					<div className='relative w-full aspect-video rounded-[16px] overflow-hidden h-[150px] flex justify-center items-center bg-gray-200'>
						<h1 className='text-lg'>No Cover</h1>
					</div>
				)}
			</Link>

			<div className='flex flex-col mt-[10px]'>
				{/* COURSE CARD TOP BAR  */}
				<div className='flex justify-between gap-2 items-center'>
					<div className='tag'>
						<Badge
							variant={
								difficulityLevel === 1
									? "success"
									: difficulityLevel === 2
									? "warning"
									: "danger"
							}>
							{difficulityLevel === 1
								? "Beginner"
								: difficulityLevel === 2
								? "Intermediate"
								: "Advanced"}
						</Badge>
					</div>
					<div className='flex gap-2 items-center text-sm'>
						<div
							className='flex gap-1'
							title={`${233} students enrolled in this course`}>
							<BookOpen size={18} />
							<span>11</span>
						</div>
						<div
							className='flex gap-1'
							title={`${233} students enrolled in this course`}>
							<Users size={18} />
							<span>233</span>
						</div>
						<div className='flex gap-1 items-center text-sm'>
							<Image src={star} width={18} height={18} alt='Star icon' />
							<span>4.3</span>
						</div>
					</div>
				</div>

				<Link href={`/courses/${id}`}>
					<div className='font-medium hover:text-purple-700 transition line-clamp-1 mt-[10px]'>
						{title}
					</div>
				</Link>
				<div className='font-medium text-gray-400 transition line-clamp-2 mt-[4px] text-sm'>
					{description}
				</div>

				{/* <div className='mt-3 flex items-center gap-x-2 text-sm md:text-xs'>
					<div className='flex items-center gap-x-1 text-slate-500'>
						<IconBadge size='sm' icon={BookOpen} />
						<span>
							{chaptersLength || "11"}{" "}
							{chaptersLength === 1 ? "Chapter" : "Chapters"}
						</span>
					</div>
				</div> */}

				{/* <p className='text-md md:text-sm font-medium text-slate-700'>
						{formatPrice(price)}
					</p> */}
			</div>
		</div>
	);
};

export default CourseCard2;
