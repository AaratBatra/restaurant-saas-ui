import React, { useEffect, useState } from "react";
import type { Leave } from "./page";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { FormSelect } from "@/components/ui/FormSelect";
import { ArrowLeft, Info, Save } from "lucide-react";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { DateTimeInput } from "@/components/ui/datetime-input";
import { SimpleTimePicker } from "@/components/ui/simple-time-picker";
import { useToast } from "@/hooks/use-toast";
/*
export type Leave = {
  id: string;
	employees: string[]; // list of employees, could be ids or names (currently names for UI purposes)
	start: Date; // date identifier for the react calendar only
  end: Date; // end date should be same as start here, only for react calendar
  allDay?: boolean; // for single day and if allDay is false then range should be there
  range?: { // for vacations that are more than a day, use this for CRUD
    start: Date;
    end: Date;
  }
};
*/
export const schema = z.object({
	vacationId: z.string().optional(),
	employeeId: z.string().optional(),
	employeeName: z.string().min(1, "Employee is required"),
	vacationType: z.enum(["single", "range"]),
	startDate: z.date(),
	endDate: z.date().optional(),
	comments: z.string().optional(),
});

const AddEditLeaveSheet = ({
	open,
	setOpen,
	onSubmit,
	vacation,
	employeeId,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (data: z.infer<typeof schema>) => void;
	vacation?: {
		id: string;
		employees: {
			id: string;
			name: string;
			avatar: string;
			comments: string;
		}[];
		start: Date;
		end: Date;
		range?: { start: Date; end: Date };
	};
	employeeId?: string;
}) => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});
	const { toast } = useToast();

	useEffect(() => {
		if (!vacation || !employeeId) return;
		if (!open) return;
		const foundEmployee = vacation.employees.find(
			(emp) => emp.id === employeeId
		);
		if (!foundEmployee) {
			toast({
				title: "Some error occurred",
				description: "Employee not found",
			});
			return;
		}
		form.setValue("vacationId", vacation.id);
		form.setValue("employeeId", employeeId);
		form.setValue("employeeName", foundEmployee.name);
		form.setValue("comments", foundEmployee.comments);
		// If vacation has a range, set vacationType as "range" and use range dates
		if (vacation.range) {
			form.setValue("vacationType", "range");
			form.setValue("startDate", vacation.range.start);
			form.setValue("endDate", vacation.range.end);
		} else {
			form.setValue("vacationType", "single");
			form.setValue("startDate", vacation.start);
			// For single day vacations, you may optionally set endDate as well.
			form.setValue("endDate", vacation.end);
		}
	}, [vacation, employeeId, form, toast, open]);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="hidden" />
			<SheetContent
				className="!w-[400px] sm:!w-[800px] sm:max-w-[36rem]"
				hideclose
			>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 h-full"
					>
						<SheetHeader className="border-b border-b-gray-400 mb-4">
							<SheetTitle className="flex items-center justify-between font-bold text-2xl mr-2">
								<div className="flex items-center gap-2">
									<Button
										className="w-6 h-16 font-extrabold hover:bg-transparent"
										variant={"ghost"}
										size={"icon"}
										type="button"
										onClick={() => setOpen(false)}
									>
										<ArrowLeft className="!size-10" />
									</Button>
									<div className="flex flex-col items-start">
										{vacation && vacation.id
											? "Edit"
											: "Add New"}{" "}
										Vacation
									</div>
								</div>
								<Button type="submit">
									<Save className="w-4 h-4" /> Save
								</Button>
							</SheetTitle>
							<SheetTitle className="w-full flex items-start justify-between text-2xl font-bold"></SheetTitle>
							<div className="w-full">
								<div className="text-base font-bold">
									Account Balance
								</div>
								<div className="grid grid-cols-3">
									<div className="flex flex-col items-center">
										10 <p>Total Holidays</p>
									</div>
									<div className="flex flex-col items-center">
										10 <p>Holidays Left</p>
									</div>
									<div className="flex flex-col items-center">
										10 <p>Used Holidays</p>
									</div>
								</div>
							</div>
							<div className="w-full flex items-center gap-1 text-sm">
								<Info className="w-4 h-4 mr-1" /> Shifts that
								conflict the vacation period will be set to open
								shifts
							</div>
						</SheetHeader>
						<FormSelect
							name="employeeName"
							label="Employee"
							selectItems={[
								{ value: "Shikhar", label: "Shikhar" },
								{ value: "Kiran", label: "Kiran" },
							]}
						/>
						<p className="text-xs font-semibold my-4">
							Department: BOH
						</p>
						<FormField
							control={form.control}
							name="vacationType"
							render={({ field }) => (
								<FormItem className="space-x-3">
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex space-y-1"
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="single" />
												</FormControl>
												<FormLabel className="font-normal">
													Single Day
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="range" />
												</FormControl>
												<FormLabel className="font-normal">
													Range
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="w-full flex items-center gap-4">
							<FormField
								control={form.control}
								name="startDate"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<DateTimePicker
												value={field.value}
												onChange={field.onChange}
												use12HourFormat
												hideTime
												modal
												timePicker={{
													hour: false,
													minute: false,
													second: false,
												}}
												renderTrigger={({
													open,
													value,
													setOpen,
												}) => (
													<DateTimeInput
														value={value}
														onChange={(x) =>
															!open &&
															field.onChange(x)
														}
														format="dd/MM/yyyy"
														disabled={open}
														onCalendarClick={() =>
															setOpen(!open)
														}
													/>
												)}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							{form.watch("vacationType") === "range" && (
								<FormField
									control={form.control}
									name="endDate"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<DateTimePicker
													value={field.value}
													onChange={field.onChange}
													use12HourFormat
													hideTime
													modal
													timePicker={{
														hour: false,
														minute: false,
														second: false,
													}}
													renderTrigger={({
														open,
														value,
														setOpen,
													}) => (
														<DateTimeInput
															value={value}
															onChange={(x) =>
																!open &&
																field.onChange(
																	x
																)
															}
															format="dd/MM/yyyy"
															disabled={open}
															onCalendarClick={() =>
																setOpen(!open)
															}
														/>
													)}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							)}
						</div>
						<div className="w-full flex items-center justify-between mt-5">
							<FormField
								control={form.control}
								name="comments"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<FloatingInput
												label="Comments"
												className="w-40"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};

export default AddEditLeaveSheet;
