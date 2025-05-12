"use client";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormInput } from "@/components/ui/FormInput";
import React from "react";
import { FormDate } from "@/components/ui/FormDate";
import { Separator } from "@/components/ui/separator";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Statutory = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const form = useFormContext();
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex gap-40 pl-8">
				<h3 className="font-bold">Statutory</h3>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FormInput name="nationality" label="Nationality" />
					<FormInput name="placeOfBirth" label="Place of Birth" />
					<FormDate name="dateOfBirth" label="Date of Birth" />
					<FormSelect
						name="gender"
						label="Gender"
						selectItems={[
							{ value: "male", label: "MALE" },
							{ value: "female", label: "FEMALE" },
							{ value: "other", label: "OTHER" },
						]}
					/>
					<FormInput name="age" label="Age" type="number" />
					<FormInput name="maritalStatus" label="Marital Status" />
					<FormInput name="passportNumber" label="Passport Number" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-12 pl-8">
				<div>
					<h3 className="font-bold">NI Number</h3>
					<p>National Insurance Number</p>
				</div>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FormField
						control={form.control}
						name="NIexists"
						render={({ field }) => (
							<FormItem className="flex flex-col justify-center">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex gap-2"
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
					<FormInput name="NINumber" label="NI Number" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-40 pl-8">
				<h3 className="font-bold">Tax P-45</h3>
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" />
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						In the absence of P45, please select the checkbox
					</label>
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

export default Statutory;
