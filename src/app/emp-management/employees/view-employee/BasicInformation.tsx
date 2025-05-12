"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Edit, User } from "lucide-react";
import React, { useState } from "react";
import FieldItem from "./FieldItem";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const locations = [
	"Creams Birmingham",
	"Creams Cardiff",
	"Creams Croydon",
	"Creams Ilford",
	"Creams Marble Arch",
	"Creams Newcastle",
	"Creams Southampton",
	"Creams Walsall",
	"Farhan Rest - 2",
	"Farhan Rest 1",
	"Lahore northwood",
	"Lahore northwood",
	"Lahore northwood",
	"Lahore northwood",
	"Lahore northwood (test)",
	"Red Farm Covent Garden",
	"The Sushico (Ealing)",
	"The Sushico (Holborn)",
	"The Sushico (Victoria)",
	"The Sushico (Woodford)",
	"The Woods",
];
const BasicInformation = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const form = useFormContext();
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex items-center gap-40 pl-8">
				<h3 className="font-bold">Joining Information</h3>
				<FieldItem label="Joining Date" value="01 Jan 2023" />
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex gap-40 pl-8">
				<div>
					<h3 className="font-bold mb-2">Employee Details</h3>
					<p className="text-gray-500">Profile Photo</p>
					<div className="w-40 h-40 border shadow-md flex items-center justify-center">
						<User className="w-full h-full" />
					</div>
				</div>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FieldItem label="First Name" value="John" />
					<FieldItem label="Middle Name" value="" />
					<FieldItem label="Last Name" value="Doe" />
					<div className="col-span-2 pr-40">
						<FieldItem label="Address" value="123 Street, City" />
					</div>
					<FieldItem label="Zip Code" value="12345" />
					<FieldItem label="Town/City" value="Metropolis" />
					<FieldItem label="State/Region" value="Region" />
					<FieldItem label="Country" value="Country" />
					<FieldItem label="Email" value="email@example.com" />
					<FieldItem label="Mobile Number" value="1234567890" />
					<FieldItem label="Telephone" value="" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-36 pl-8">
				<h3 className="font-bold">Department Details</h3>
				<div className="flex-1 grid grid-cols-3">
					<FieldItem label="Department" value="BOH" />
					<FieldItem label="Position" value="Manager" />
					<FieldItem label="Report To" value="Dong Chen" />
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-44 pl-8">
				<h3 className="font-bold">Location Details</h3>
				<div className="flex-1">
					<Card className="w-full max-w-md mx-auto">
						<CardHeader>
							<div className="grid grid-cols-2 items-center">
								<h3 className="font-medium">Location</h3>
								<h3 className="font-medium">
									Set Primary Location
								</h3>
							</div>
						</CardHeader>
						<CardContent>
							<FormField
								control={form.control}
								name="location"
                                disabled
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={"Farhan Rest 1"}
                                                disabled
												className="space-y-2"
											>
												{locations.map((location) => (
													<div
														key={location}
														className="grid grid-cols-2 items-center"
													>
														<FormLabel className="font-normal">
															{location}
														</FormLabel>
														<RadioGroupItem
															value={location}
														/>
													</div>
												))}
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
			<Separator className="h-0.5" />
			<div className="w-full flex items-center gap-44 pl-8">
				<h3 className="font-bold">Kin Information</h3>
				<div className="flex-1 grid grid-cols-3 gap-y-2">
					<FieldItem label="First Name" value="Jane" />
					<FieldItem label="Middle Name" value="" />
					<FieldItem label="Last Name" value="Doe" />
					<div className="col-span-2 pr-40">
						<FieldItem label="Address" value="456 Avenue, City" />
					</div>
					<FieldItem label="Zip Code" value="67890" />
					<FieldItem label="Town/City" value="Smallville" />
					<FieldItem label="State/Region" value="Region" />
					<FieldItem label="Country" value="Country" />
					<FieldItem label="Email" value="kin@example.com" />
					<FieldItem label="Mobile Number" value="9876543210" />
					<FieldItem label="Telephone" value="" />
					<FieldItem label="Relation" value="Sibling" />
				</div>
			</div>
		</div>
	);
};

export default BasicInformation;
