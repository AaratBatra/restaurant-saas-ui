"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import BasicInformation from "./BasicInformation";
import BankDetails from "./BankDetails";
import Documents from "./Documents";
import Statutory from "./Statutory";
import Statements from "./Statements";

const navItems = [
	"Basic Informantion",
	"Bank Details",
	"Documents",
	"Statutory",
	"Statements",
];
const AddNewEmployee = () => {
	const router = useRouter();
	const [activeNav, setActiveNav] = useState<number>(0);
	const form = useForm();
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
							idx === activeNav && "nav-item"
						)}
						variant={"ghost"}
						onClick={() => setActiveNav(idx)}
					>
						{item}
					</Button>
				))}
			</div>
			<ScrollArea className="flex-1 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex p-4">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full h-full pt-2"
					>
						<div className="w-full flex items-center justify-between">
							<h1 className="text-[#222b45]">Add New Employee</h1>
							<Button type="submit">
								<Save />
								SAVE
							</Button>
						</div>
						<div className="w-full flex flex-col gap-5 py-2">
							<RenderForm
								activeNav={activeNav}
								setActiveNav={setActiveNav}
							/>
						</div>
					</form>
				</Form>
			</ScrollArea>
		</div>
	);
};

export default AddNewEmployee;

function RenderForm({
	activeNav,
	setActiveNav,
}: {
	activeNav: number;
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) {
	// Cash & PDQ Third Party KPIs
	if (activeNav === 0) {
		return <BasicInformation setActiveNav={setActiveNav} />;
	} else if (activeNav === 1) {
		return <BankDetails setActiveNav={setActiveNav} />;
	} else if (activeNav === 2) {
		return <Documents setActiveNav={setActiveNav} />;
	} else if (activeNav === 3) {
		return <Statutory setActiveNav={setActiveNav} />;
	} else if (activeNav === 4) {
		return <Statements setActiveNav={setActiveNav} />;
	} else {
		return <></>;
	}
}
