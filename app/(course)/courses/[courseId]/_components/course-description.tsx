"use client";
import { useState } from "react";

const CourseDescription = ({ description }: { description: string }) => {
	const [showMore, setShowMore] = useState(false);

	return (
		<div className='mt-2 sm:mt-4 text-sm'>
			<p className='text-gray-500/80'>
				{!showMore ? description?.slice(0, 300) : description}
				{!showMore && (description?.length || 0) > 300 && "..."}
				{(description.length || 0) > 300 && !showMore && (
					<span
						className='block text-purple-700 font-medium cursor-pointer select-none'
						onClick={() => setShowMore(true)}>
						See more
					</span>
				)}
				{(description.length || 0) > 300 && showMore && (
					<span
						className='block text-purple-700 font-medium cursor-pointer select-none'
						onClick={() => setShowMore(false)}>
						See less
					</span>
				)}
			</p>
		</div>
	);
};

export default CourseDescription;
