import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";

import React from "react";

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
					<FormInput name="bankName" label="Bank Name" />
					<FormInput name="bankSortCode" label="Bank Sort Code" />
					<FormInput name="accountNumber" label="Account Number" />
					<FormInput name="branchName" label="Branch Name" />
					<FormInput
						name="accountHolderName"
						label="Account Holder Name"
					/>
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex gap-36 pl-8">
				<h3 className="font-bold">Salary Information</h3>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FormSelect
						name="employeeType"
						label="Employee Type"
						selectItems={[
							{
								value: "Hourly Employee",
								label: "Hourly Employee",
							},
							{
								value: "Weekly Employee",
								label: "Weekly Employee",
							},
							{
								value: "Monthly Employee",
								label: "Monthly Employee",
							},
						]}
					/>
					<FormInput name="salary" label="Enter Salary" />
					<FormInput
						name="totalHolidays"
						type="number"
						label="Total Holidays"
					/>
					<div className="flex items-center space-x-2">
						<Checkbox id="terms" />
						<label
							htmlFor="terms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Default Break Time
						</label>
					</div>
					<FormInput
						name="breakTimeInMins"
						label="Enter Break Time In Mins"
					/>
				</div>
			</div>
			<div className="flex items-center gap-2 place-self-end">
				<Button
					className="border-black px-3 py-4 w-48 hover:shadow-lg font-normal"
					variant={"outline"}
					onClick={() => setActiveNav((prev) => prev - 1)}
				>
					<ArrowLeft className="w-4 h-4" /> PREVIOUS
				</Button>
				<Button
					className="border-black px-3 py-4 w-48 hover:shadow-lg font-normal"
					variant={"outline"}
					onClick={() => setActiveNav((prev) => prev + 1)}
				>
					NEXT <ArrowRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};

export default BankDetails;
