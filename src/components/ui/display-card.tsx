import React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";
const DisplayCard = ({
	title,
	body,
	count,
	isActive,
	onClick,
}: {
	title: string;
	body: string;
	count: number;
	isActive?: boolean;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
	return (
		<div
			role="button"
			tabIndex={0}
			className={cn(
				"w-56 bg-white flex flex-col gap-4 p-2 border shadow-sm rounded-lg hover:shadow-lg",
				isActive && "shadow-2xl"
			)}
			onClick={onClick}
		>
			<Badge className="rounded-full w-6 h-6 flex items-center justify-center">
				{count}
			</Badge>
			<h1 className="text-xl font-bold">{title}</h1>
			<p>{body}</p>
		</div>
	);
};

export default DisplayCard;
