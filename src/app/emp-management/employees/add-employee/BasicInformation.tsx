'use client';
import { Button } from "@/components/ui/button";
import { FormDate } from "@/components/ui/FormDate";
import { FormInput } from "@/components/ui/FormInput";
import { FormPassword } from "@/components/ui/FormPassword";
import { FormSelect } from "@/components/ui/FormSelect";
import MultiSelect from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Edit } from "lucide-react";
import React, { useState } from "react";

const BasicInformation = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex items-center gap-40 pl-8">
				<h3 className="font-bold">Joining Information</h3>
				<FormDate name="joiningDate" label="Joining Date" required />
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex gap-40 pl-8">
				<div>
					<h3 className="font-bold mb-2">Employee Details</h3>
					<p className="text-gray-500">Profile Photo</p>
					<div className="w-40 h-40 border shadow-md flex items-center justify-center">
						<Edit className="w-4 h-4" />
					</div>
				</div>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FormInput name="firstName" label="First Name" required />
					<FormInput name="middleName" label="Middle Name" />
					<FormInput name="lastName" label="Last Name" required />
					<div className="col-span-2 pr-40">
						<FormInput
							name="address"
							label="Address"
							formItemClassName="w-full"
							inputContainerClassName="w-full"
							required
						/>
					</div>
					<FormInput
						name="zipCode"
						label="Zip Code"
						className="col-span-1"
						required
					/>
					<FormInput name="city" label="Town/City" required />
					<FormInput name="state" label="State/Region" required />
					<FormInput name="country" label="Country" required />
					<FormInput name="email" label="Email" type="email" required />
					<FormInput name="mobile" label="Mobile Number" required />
					<FormInput name="telephone" label="Telephone" />
					<FormPassword name="password" label="Password" />
					<FormPassword name="confirmPassword" label="Confirm Password" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-36 pl-8">
				<h3 className="font-bold">Department Details</h3>
				<div className="flex-1 grid grid-cols-3">
					<FormSelect name="department" label="Department" selectItems={[{value: "BOH", label: "BOH"}, {value: "FOH", label: "FOH"}]} required />
					<FormInput name="position" label="Position" required />
					<FormSelect name="reportTo" label="Report To" selectItems={[{value: "Dong Chen", label: "Dong Chen"}, {value: "Dong Chen", label: "Hang Chen"}]} required />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-44 pl-8">
				<h3 className="font-bold">Location Details</h3>
				<div className="flex-1 grid grid-cols-3">
					<FormSelect name="locatoin" label="Location" selectItems={[{value: "Creams Cardiff", label: "Creams Cardiff"}, {value: "Creams Doydroff", label: "Creams Doydroff"}]} required />
					<div className="border-b-2 flex place-self-end w-[300px] mb-1">
					<MultiSelect className="place-self-end" placeholder="Restaurants" options={[{value: "Creams Cardiff", label: "Creams Cardiff"}, {value: "Creams Birmingham", label: "Creams Birmingham"}]} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
					</div>
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-44 pl-8">
				<h3 className="font-bold">Kin Information</h3>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FormInput name="kin_firstName" label="First Name" />
					<FormInput name="kin_middleName" label="Middle Name" />
					<FormInput name="kin_lastName" label="Last Name" />
					<div className="col-span-2 pr-40">
						<FormInput
							name="kin_address"
							label="Address"
							formItemClassName="w-full"
							inputContainerClassName="w-full"
						
						/>
					</div>
					<FormInput
						name="kin_zipCode"
						label="Zip Code"
						className="col-span-1"
					
					/>
					<FormInput name="kin_city" label="Town/City" />
					<FormInput name="kin_state" label="State/Region" />
					<FormInput name="kin_country" label="Country" />
					<FormInput name="kin_email" label="Email" type="email" />
					<FormInput name="kin_mobile" label="Mobile Number" />
					<FormInput name="kin_telephone" label="Telephone" />
					<FormInput name="kin_relation" label="Relation" />
				</div>
			</div>
			<Button
				className="border-black px-3 py-4 w-48 hover:shadow-lg place-self-end font-normal"
				variant={"outline"}
				onClick={() => setActiveNav((prev) => prev + 1)}
			>
				NEXT <ArrowRight className="w-4 h-4" />
			</Button>
		</div>
	);
};

export default BasicInformation;
