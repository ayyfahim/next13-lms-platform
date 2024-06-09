"use client";

import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import {
	ChevronDown,
	ChevronUp,
	FileText,
	HelpCircle,
	Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	Disclosure,
	DisclosureButton,
	Transition,
	DisclosurePanel,
} from "@headlessui/react";

const CourseModuleItem = ({
	serial,
	chapter,
}: {
	serial: number;
	chapter: Chapter;
}) => {
	return (
		<div
			className={cn(
				"bg-white rounded-xl shadow-sm border px-2 sm:px-6 py-4 duration-500"
			)}>
			<Disclosure as='div' className='w-full' defaultOpen={serial === 0}>
				{({ open }) => (
					<>
						<DisclosureButton className='w-full'>
							<div className='flex justify-between items-center cursor-pointer'>
								<div className='flex items-center gap-3'>
									<div className=''>
										{!open ? (
											<ChevronDown size={18} />
										) : (
											<ChevronUp size={18} />
										)}
									</div>
									<div className='font-semibold select-none line-clamp-1'>
										{chapter.title}
									</div>
								</div>
							</div>
						</DisclosureButton>
						<div className='overflow-hidden'>
							<Transition
								enter='duration-200 ease-out'
								enterFrom='opacity-0 -translate-y-6'
								enterTo='opacity-100 translate-y-0'
								leave='duration-300 ease-out'
								leaveFrom='opacity-100 translate-y-0'
								leaveTo='opacity-0 -translate-y-6'>
								<DisclosurePanel className='origin-top transition'>
									<div
										className={cn(
											"pl-4 sm:pl-8 mt-4 overflow-hidden duration-500 w-full"
										)}>
										<div className='flex flex-col gap-4'>
											<div className='flex justify-between items-center'>
												<div className='flex gap-4 items-center text-gray-500 text-sm cursor-pointer hover:text-purple-700 line-through'>
													<span className='min-w-[20px]'>
														<FileText size={18} />
													</span>
													<span className='delete'>Read Before You Start</span>
												</div>
												<span className='text-gray-500 text-sm'>4min</span>
											</div>
											<div className='flex justify-between items-center'>
												<div className='flex gap-4 items-center text-gray-500 text-sm cursor-pointer hover:text-purple-700'>
													<span className='min-w-[20px]'>
														<Video size={18} />
													</span>
													<span className='flex-1'>
														Introduction to Business Foundations and Principle
														of Management
													</span>
												</div>
												<span className='text-gray-500 text-sm'>15min</span>
											</div>
											<div className='flex justify-between items-center'>
												<div className='flex gap-4 items-center text-gray-500 text-sm cursor-pointer hover:text-purple-700'>
													<span className='min-w-[20px]'>
														<Video size={18} />
													</span>
													<span className=''>
														Business Analysis and Process Management
													</span>
												</div>
												<span className='text-gray-500 text-sm'>13min</span>
											</div>

											<div className='flex justify-between items-center'>
												<div className='flex gap-4 items-center text-gray-500 text-sm cursor-pointer hover:text-purple-700'>
													<span className='min-w-[20px]'>
														<HelpCircle size={18} />
													</span>
													<span className=''>Quiz</span>
												</div>
												<span className='text-gray-500 text-sm'>
													10 questions
												</span>
											</div>
										</div>
									</div>
								</DisclosurePanel>
							</Transition>
						</div>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default CourseModuleItem;
