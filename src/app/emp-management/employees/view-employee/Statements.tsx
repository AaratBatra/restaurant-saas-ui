'use client';
import { Separator } from "@/components/ui/separator";
import React from "react";
import FieldItem from "./FieldItem";

const Statements = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex gap-40 pl-8">
				<h3 className="font-bold">Employee Statement</h3>
				<div className="flex-1">
					<FieldItem label="" value="This is my first job since last 6th April and I have not been receiving taxable jobseeker's allowances and support allowances or taxable incapacity benefits or a State or Occupation pension" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex gap-56 pl-8">
				<h3 className="font-bold">Student Loan</h3>
				<FieldItem label="" value="Yes" />
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex gap-44 pl-8">
				<h3 className="font-bold">Medical Condition</h3>
				<div className="flex-1">
					<FieldItem label="Mention, if any" value="None" />
				</div>
			</div>
		</div>
	);
};

export default Statements;
