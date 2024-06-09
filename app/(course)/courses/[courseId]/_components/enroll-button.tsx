"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const EnrollButton = ({ courseId }: { courseId: string }) => {
	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post(`/api/courses/${courseId}/checkout`);
			window.location.assign(response.data.url);
		} catch {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button
			variant='info'
			disabled={isLoading}
			onClick={onClick}
			className={cn(
				"bg-purple-700/70 hover:bg-purple-700 w-full duration-200",
				{
					"bg-purple-700/50 cursor-not-allowed": isLoading,
				}
			)}>
			Enroll Now
		</Button>
	);
};

export default EnrollButton;
