"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleX, Save, Trash, User } from "lucide-react";
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
import Shifts from "../edit-employee/Shifts";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Select } from "@/components/ui/select";
import { FormSelect } from "@/components/ui/FormSelect";

const navItems = [
	"Basic Informantion",
	"Bank Details",
	"Shifts",
	"Documents",
	"Statutory",
	"Statements",
];
const ViewEmployee = () => {
	const router = useRouter();
	const [activeNav, setActiveNav] = useState<number>(0);
	const form = useForm();
	const onSubmit = (data: any) => console.log(data);
	const [open, setOpen] = useState(false);
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
							<h1 className="text-[#222b45]">Edit Employee</h1>
							<div className="flex items-center gap-2">
								<Button
									type="button"
									onClick={() => setOpen(true)}
								>
									<CircleX />
									DEACTIVATE
								</Button>
								<Button
									onClick={() =>
										router.push(
											"/emp-management/employees/edit-employee"
										)
									}
									type="button"
								>
									<Save />
									EDIT
								</Button>
							</div>
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
			<DeactivateSheet open={open} setOpen={setOpen} onClose={setOpen} />
		</div>
	);
};

export default ViewEmployee;

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
		return <Shifts setActiveNav={setActiveNav} />;
	} else if (activeNav === 3) {
		return <Documents setActiveNav={setActiveNav} />;
	} else if (activeNav === 4) {
		return <Statutory setActiveNav={setActiveNav} />;
	} else if (activeNav === 5) {
		return <Statements setActiveNav={setActiveNav} />;
	} else {
		return <></>;
	}
}

function DeactivateSheet({
	open,
	setOpen,
	onClose,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const f = useForm();
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent
				className="!w-[400px] sm:!w-[800px] sm:max-w-[36rem]"
				hideclose
			>
				<div className="w-full flex items-center justify-between px-2 border-b">
					<Button
						className="w-6 h-16 font-extrabold hover:bg-transparent"
						variant={"ghost"}
						size={"icon"}
						type="button"
						onClick={() => onClose(false)}
					>
						<ArrowLeft className="!size-10" />
					</Button>
					<div className="flex gap-2">
						<Button disabled>
							<CircleX />
							DEACTIVATE
						</Button>
						<Button onClick={() => setOpen(false)}>CANCEL</Button>
					</div>
				</div>
				<div className="w-full">
					<p className="text-lg mt-4">
						Are you sure you want to deactivate Aastha Rao?
					</p>
					<div className="size-28 border shadow-md flex items-center justify-center my-2">
						<User className="w-full h-full" />
					</div>
					<h3 className="font-bold">Aastha Rao</h3>
					<Form {...f}>
						<form
							onSubmit={f.handleSubmit((data) => {
								console.log(data);
								onClose(false);
							})}
						>
							<p className="font-semibold">
								Delete all upcoming shifts{" "}
								<Trash className="inline-block w-4 h-4" />
							</p>
							<p>There are no upcoming shifts available</p>
							<p className="font-semibold">
								Delete all upcoming leaves{" "}
								<Trash className="inline-block w-4 h-4" />
							</p>
							<p>There are no upcoming leaves available</p>
							<p className="mt-10 font-bold">
								Transfer Reporting Employee To
							</p>
							<FormSelect
								name="toReportingEmp"
								label="Choose Reporting Employee"
								required
								selectItems={[
									{
										value: "Alen Beckman",
										label: "Alen Beckman",
									},
								]}
							/>
							<Button className="mt-4" type="submit">
								Transfer
							</Button>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
