'use client';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import FieldItem from "./FieldItem";

const Statutory = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex gap-40 pl-8">
				<h3 className="font-bold">Statutory</h3>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FieldItem label="Nationality" value="Indian" />
					<FieldItem label="Place of Birth" value="New Delhi" />
					<FieldItem label="Date of Birth" value="01/01/1990" />
					<FieldItem label="Gender" value="Male" />
					<FieldItem label="Age" value="30" />
					<FieldItem label="Marital Status" value="Single" />
					<FieldItem label="Passport Number" value="A1234567" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-12 pl-8">
				<div>
					<h3 className="font-bold">NI Number</h3>
					<p>National Insurance Number</p>
				</div>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FieldItem label="NI Exists" value="Yes" />
					<FieldItem label="NI Number" value="AB123456C" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-40 pl-8">
				<h3 className="font-bold">Tax P-45</h3>
				<FieldItem label="P-45 Available" value="No" />
			</div>
		</div>
	);
};

export default Statutory;
