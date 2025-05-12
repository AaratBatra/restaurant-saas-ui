"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { ArrowRight, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

// { setFullFormState }: { setFullFormState: Function }
const EPOSForm = () => {
	const { control } = useFormContext();
	return (
		<div className="w-full flex flex-col gap-10">
			<div className="flex items-center justify-end gap-2">
				<Link
					href={"#"}
					className="flex items-center justify-center w-12 h-12 rounded-full border border-black"
				>
					<Image
						src={
							"https://upload.wikimedia.org/wikipedia/commons/e/ef/Foodics_logo.jpg"
						}
						alt="FOODICS"
						width={80}
						height={80}
						className="w-[40px] h-[40px] object-contain"
					/>
				</Link>
				<Button>
					<RefreshCcw className="w-4 h-4" /> Fetch API Data
				</Button>
				<Button>Sync Products</Button>
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Sales</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="flex items-center gap-4">
					<FormInput
						name={"eposfood"}
						label={"Food"}
                        acceptAmount
                        type="number"
						required
						info="Enter food sales (excl) tax"
					/>
					<FormInput
						name={"eposdrinks"}
						label={"Drinks"}
                        acceptAmount
                        type="number"
						required
						info="Enter drinks sales (excl) tax"
					/>
					<FormInput
						name={"eposdiscountTotal"}
						label={"Discount Total"}
                        acceptAmount
                        type="number"
						required
						info="Enter Discount (excl) tax"
					/>
					<FormInput
						name={"eposothers"}
						label={"Others"}
                        acceptAmount
                        type="number"
						required
						info="Enter Others sales (excl) tax"
					/>
				</div>
			</div>
			<div className="w-full flex flex-col gap-4">
				<div className="w-full flex items-center justify-between">
					<h3>Tax Payments</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="flex items-center">
					<FormInput
						name={"epostax"}
						label={"Tax"}
                        acceptAmount
                        type="number"
						required
						info="Enter tax amount sales as per EPOS"
					/>
				</div>
			</div>
			<div className="w-full flex flex-col gap-4">
				<div className="w-full flex items-center justify-between">
					<h3>Tips</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="flex items-center gap-4">
					<FormInput
						name={"epostips"}
						label={"Tips"}
                        acceptAmount
                        type="number"
						required
						info="Enter tips amount"
					/>
					<FormInput
						name={"eposserviceCharges"}
						label={"Service Charges"}
                        acceptAmount
                        type="number"
						required
						info="Enter service charges sales"
					/>
				</div>
			</div>
			<Button
				className="border-black px-5 hover:shadow-lg place-self-end"
				variant={"outline"}
			>
				Next <ArrowRight className="w-4 h-4" />
			</Button>
		</div>
	);
};

export default EPOSForm;
