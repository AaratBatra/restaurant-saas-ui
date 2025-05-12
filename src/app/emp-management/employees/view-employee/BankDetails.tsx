'use client';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import FieldItem from "./FieldItem";

const BankDetails = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex gap-40 pl-8">
				<h3 className="font-bold">Bank Information</h3>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FieldItem label="Bank Name" value="XYZ Bank" />
					<FieldItem label="Bank Sort Code" value="123456" />
					<FieldItem label="Account Number" value="987654321" />
					<FieldItem label="Branch Name" value="Main Branch" />
					<FieldItem label="Account Holder Name" value="John Doe" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex gap-36 pl-8">
				<h3 className="font-bold">Salary Information</h3>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FieldItem label="Employee Type" value="Monthly Employee" />
					<FieldItem label="Enter Salary" value="$5000" />
					<FieldItem label="Total Holidays" value="20" />
					<FieldItem label="Default Break Time" value="Yes" />
					<FieldItem label="Enter Break Time In Mins" value="30" />
				</div>
			</div>
		</div>
	);
};

export default BankDetails;
