"use client";
import React, { useEffect } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetPortal,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { format, isAfter, isBefore, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { FormSelect } from "@/components/ui/FormSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Shift } from "@/types/ShiftCalendar";
import { updateTime } from "@/utils/time-utils";
import { faker } from "@faker-js/faker";
export const schema = z
	.object({
		id: z.string().optional(),
		shiftDate: z.date(),
		organization: z
			.string()
			.min(1, { message: "Organization is required" }),
		employee: z
			.string()
			.min(1, { message: "Employee name is required" }),
		title: z
			.string({ required_error: "Title is required" })
			.min(3, { message: "Title is too short" }),
		shiftType: z.enum(["Day", "Night"]),
		shiftStartTime: z.string().min(1, "Start time is required"),
		shiftEndTime: z.string().min(1, "End time is required"),
		sendChanges: z.boolean().optional(),
		sendMessage: z.boolean().optional(),
	})
	.refine(
		(data) =>
			isAfter(
				parse(data.shiftEndTime, "HH:mm", new Date()),
				parse(data.shiftStartTime, "HH:mm", new Date())
			),
		{
			message: "End time must be after start time",
			path: ["shiftEndTime"],
		}
	);
const AddEditShiftSheet = ({
	open,
	setOpen,
	onSubmit,
	shift,
	onClose,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (shift: Shift) => void;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	shift: Shift;
}) => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			id: shift?.id || "",
			shiftDate: shift?.start || new Date(),
			organization: "Red Farm Covent Garden",
			employee: shift?.employee || "",
			title: shift?.title || "",
			shiftType: "Day",
			shiftStartTime: shift?.start ? format(shift?.start, "HH:mm") : "",
			shiftEndTime: shift?.end ? format(shift?.end, "HH:mm") : "",
		},
	});
	useEffect(() => {
		if (!shift) return;
		form.setValue("id", shift.id);
		form.setValue("shiftDate", shift.start);
		form.setValue("title", shift.title);
        form.setValue('employee', shift.employee);
		form.setValue("shiftStartTime", format(shift.start, "HH:mm"));
		form.setValue("shiftEndTime", format(shift.end, "HH:mm"));
	}, [shift]);

	const handleSubmit = (data: z.infer<typeof schema>) => {
        const startDate = updateTime(data.shiftDate, data.shiftStartTime);
        const endDate = updateTime(data.shiftDate, data.shiftEndTime);
		onSubmit({
			...data,
			start: startDate,
			end: endDate,
			id: shift.id || faker.string.nanoid(8),
            department: shift?.department
		});
	};
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="hidden" />

			<SheetContent
				className="!w-[400px] sm:!w-[800px] sm:max-w-[36rem]"
				hideclose
			>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex flex-col gap-4 h-full"
					>
						<SheetHeader>
							<SheetTitle className="flex items-center justify-between font-bold text-2xl mr-2">
								<div className="flex items-center gap-2">
									<Button
										className="w-6 h-16 font-extrabold hover:bg-transparent"
										variant={"ghost"}
										size={"icon"}
										type="button"
										onClick={() => onClose(false)}
									>
										<ArrowLeft className="!size-10" />
									</Button>
									<div className="flex flex-col items-start">
										{shift && shift.id ? "Edit" : "Add"}{" "}
										Shift{" "}
										<p className="text-sm text-gray-500">
											{shift &&
												format(
													shift.start,
													"MM/dd/yyyy, hh:mm a"
												)}
										</p>
									</div>
								</div>
								<Button type="submit">
									<Save className="w-4 h-4" /> Save
								</Button>
							</SheetTitle>
						</SheetHeader>
						<FormSelect
							name="organization"
							label=""
							selectItems={[
								{
									value: "Red Farm Covent Garden",
									label: "Red Farm Covent Garden",
								},
							]}
						/>
						<FormField
							control={form.control}
							name="employee"
							render={({ field }) => (
								<FormItem className="mt-4">
									{/* <FormLabel>Username</FormLabel> */}
									<FormControl>
                                        <FloatingInput
											//placeholder="title"
											label="Employee Name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<p className="text-xs font-semibold my-4">
							Department: {shift?.department}
						</p>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel>Username</FormLabel> */}
									<FormControl>
										<FloatingInput
											//placeholder="title"
											label="Title"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormSelect
							name="shiftType"
							label=""
							selectItems={[
								{
									value: "Day",
									label: "Day Shift",
								},
								{
									value: "Night",
									label: "Night Shift",
								},
							]}
						/>
						<div className="w-full flex items-center justify-between mt-5">
							<FormField
								control={form.control}
								name="shiftStartTime"
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Username</FormLabel> */}
										<FormControl>
											<FloatingInput
												label="Shift Start Time"
												type="time"
												className="w-40"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="shiftEndTime"
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Username</FormLabel> */}
										<FormControl>
											<FloatingInput
												label="Shift End Time"
												type="time"
												className="w-40"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-max flex items-center gap-6">
							<div className="text-sm font-bold">
								- <br />
								<span className="text-xs text-gray-500 font-light">
									Punch Clock
								</span>
							</div>
							<div className="text-xs font-bold">
								17:00 PM - 02:45 AM <br />
								<span className="text-xs text-gray-500 font-light">
									Shift Original Time
								</span>
							</div>
						</div>
						<div className="w-full flex-col mt-2 border-t border-t-gray-200 pt-2 space-y-4">
							<FormField
								control={form.control}
								name="sendChanges"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Send Changes</FormLabel>
											<FormDescription>
												If changing shift from one
												employee to another, both
												employees will notified
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="sendMessage"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Send Message</FormLabel>
											<FormDescription>
												If changing shift from one
												employee to another, both
												employees will notified
											</FormDescription>
										</div>
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

export default AddEditShiftSheet;
