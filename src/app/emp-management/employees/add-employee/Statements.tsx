import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

const Statements = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const form = useFormContext();
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex gap-40 pl-8">
				<h3 className="font-bold">Employee Statement</h3>
				<div className="flex-1">
					<FormField
						control={form.control}
						name="employeeStatement"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="first" />
											</FormControl>
											<FormLabel className="font-normal">
												This is my first job since last
												6th April and I have not been
												receiving taxable jobseeker&apos;s
												allowances <br />
												and support allowances or
												taxable incapacity benefits ora
												State or Occupation pension
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="only" />
											</FormControl>
											<FormLabel className="font-normal">
												This is my only job now, but
												since last 6th April I have had
												another job, or received taxable
												jobseeker&apos;s <br />
												allowance or employment and
												support allowances or taxable
												incapacity benefits
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="none" />
											</FormControl>
											<FormLabel className="font-normal">
												I do not receive a state or I
												have another job or receive a
												state or Occupational pension
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex gap-56 pl-8">
				<h3 className="font-bold">Student Loan</h3>
				<FormField
					control={form.control}
					name="studentLoan"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>
								Do you have a student loan which is not fully
								repaid and all of the following apply?
								<br />
								- You left the course of UK Higher education
								before 6th April <br /> - You received your
								first student loan installment on or after 1st
								september, 1998
							</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex gap-2 space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="yes" />
										</FormControl>
										<FormLabel className="font-normal">
											Yes
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="no" />
										</FormControl>
										<FormLabel className="font-normal">
											No
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex gap-44 pl-8">
				<h3 className="font-bold">Medical Condition</h3>
				<div className="flex-1">
					<p>
						Do you have any medical condition that can impact work?
					</p>
					<FormInput
						name="medicalCondition"
						className="w-[300px]"
						label="Mention, if any"
					/>
				</div>
			</div>
			<Button
				className="border-black px-3 py-4 w-48 hover:shadow-lg place-self-end font-normal"
				variant={"outline"}
				onClick={() => setActiveNav((prev) => prev - 1)}
			>
				<ArrowLeft className="w-4 h-4" /> PREVIOUS
			</Button>
		</div>
	);
};

export default Statements;
