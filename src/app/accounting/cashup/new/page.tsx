"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, Plus, Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { navItems } from "./navItems";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EPOSForm from "./EPOSForm";
import CashPDQForm from "./CashPDQForm";
import ThirdPartyForm from "./ThirdPartyForm";
import KPIForm from "./KPIForm";
import { FormDate } from "@/components/ui/FormDate";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormInput } from "@/components/ui/FormInput";

// const schema = z.object({
// 	date: z.date(),
// 	time: z.enum(["AM", "PM"]),
// 	startTime: z.string(),
// 	endTime: z.string(),
// });

const NewCashUpEntry = () => {
	const router = useRouter();
	const [activeNav, setActiveNav] = useState<string>("EPOS");
	const [fullFormState, setFullFormState] = useState({
		epos: {},
		cash: {},
		pdq: {},
		thirdParty: {},
		kpis: {},
	});
	// const form = useForm<z.infer<typeof schema>>({
	// 	resolver: zodResolver(schema),
	// 	defaultValues: {
	// 		date: new Date(),
	// 		time: "AM",
	// 		startTime: "00:00:00",
	// 		endTime: "12:00:00",
	// 		cashpdqfood: "1100"
	// 	},
	// });
	const form = useForm({
		defaultValues: {
			date: new Date(),
			time: "AM",
			startTime: "00:00:00",
			endTime: "12:00:00"
		},
	});
	//const onSubmit = (data: z.infer<typeof schema>) => console.log(data);
	const onSubmit = (data: any) => console.log(data);
	return (
		<div className="w-full flex gap-4 h-full">
			<div className="h-full flex-grow-0 flex-shrink-0 basis-40 flex flex-col gap-2 shadow-xl">
				<div className="h-16 w-full flex items-center justify-start px-4">
					<Button
						className="w-6 h-16 font-extrabold hover:bg-transparent"
						variant={"ghost"}
						size={"icon"}
						type="button"
						onClick={() => router.back()}
					>
						<ArrowLeft className="!size-10" />
					</Button>
				</div>
				{navItems.map((item, idx) => (
					<Button
						key={idx}
						className={cn(
							"w-full h-12 justify-start rounded-none",
							activeNav === item.label && "nav-item"
						)}
						variant={"ghost"}
						onClick={() => setActiveNav(item.label)}
					>
						{item.icon} {item.label}
					</Button>
				))}
			</div>
			<ScrollArea className="flex-grow-0 flex-shrink-0 basis-2/3 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex p-4">
				<div className="flex-1 basis-full h-full pt-2">
					<h1 className="text-[#222b45]">Add New Cash Up Sheet</h1>
					<Form {...form}>
						<form
							className="w-full flex flex-col gap-5"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<div className="w-full flex items-center gap-4">
								<FormDate name="date" label="Date" required />
								<FormSelect
									name="time"
									label="Time"
									selectItems={[
										{ value: "AM", label: "AM" },
										{ value: "PM", label: "PM" },
									]}
									required
								/>
								<FormInput
									name="startTime"
									label="Start Time"
									type="time"
									required
								/>
								<FormInput
									name="endTime"
									label="End Time"
									type="time"
									required
								/>
							</div>
							<RenderForm
								activeNav={activeNav}
							/>
						</form>
					</Form>
				</div>
			</ScrollArea>
			<div className="flex-grow flex-shrink basis-1/3 flex flex-col items-center py-8 px-4 gap-4">
				<div className="w-full flex items-center justify-center gap-2">
					<Button>
						<Save className="w-4 h-4" /> SAVE AS DRAFT
					</Button>
					<Button>
						<Upload className="w-4 h-4" /> PUBLISH
					</Button>
				</div>
				<div className="w-full rounded-lg shadow-lg flex flex-col p-2 gap-4 mt-12">
					<div className="flex items-center justify-between border-b pb-2">
						<p className="text-xl">Summary</p>
						<Button variant={"ghost"} size={"icon"} className="rounded-full">
							<Plus className="w-4 h-4" />
						</Button>
					</div>
					<div className="flex items-center justify-between px-4">
						<h3 className="text-base">Difference: </h3>
						<h3 className="text-base">£ 0.00</h3>
					</div>
					<div className="h-12 flex items-center justify-between p-4 rounded-lg border shadow-sm hover:bg-gray-200 hover:shadow-md hover:cursor-pointer">
						<div className="flex items-center gap-1 text-base">
							<ChevronDown className="w-4 h-4" />
							EPOs Takings
						</div>
						<span className="text-base font-bold">£ 0.00</span>
					</div>
					<div className="h-12 flex items-center justify-between p-4 rounded-lg border shadow-sm hover:bg-gray-200 hover:shadow-md hover:cursor-pointer">
						<div className="flex items-center gap-1 text-base">
							<ChevronDown className="w-4 h-4" />
							Cash Takings
						</div>
						<span className="text-base font-bold">£ 0.00</span>
					</div>
					<div className="h-12 flex items-center justify-between p-4 rounded-lg border shadow-sm hover:bg-gray-200 hover:shadow-md hover:cursor-pointer">
						<div className="flex items-center gap-1 text-base">
							<ChevronDown className="w-4 h-4" />
							PDQ Takings
						</div>
						<span className="text-base font-bold">£ 0.00</span>
					</div>
					<div className="h-12 flex items-center justify-between p-4 rounded-lg border shadow-sm hover:bg-gray-200 hover:shadow-md hover:cursor-pointer">
						<div className="flex items-center gap-1 text-base">
							<ChevronDown className="w-4 h-4" />
							Third Party Takings
						</div>
						<span className="text-base font-bold">£ 0.00</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewCashUpEntry;

function RenderForm({
	activeNav
}: {
	activeNav: string;
}) {
	// Cash & PDQ Third Party KPIs
	if (activeNav === "EPOS") {
		return <EPOSForm />;
	} else if (activeNav === "Cash & PDQ") {
		return <CashPDQForm />;
	} else if (activeNav === "Third Party") {
		return <ThirdPartyForm />;
	} else if (activeNav === "KPIs") {
		return <KPIForm />;
	} else {
		return <></>;
	}
}
