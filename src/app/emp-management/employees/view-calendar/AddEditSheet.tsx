'use client';
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
import { DayEvent } from "./page";
import { format, isAfter, isBefore, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { FormSelect } from "@/components/ui/FormSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Checkbox } from "@/components/ui/checkbox";
export const schema = z.object({
	id: z.string().optional(),
	shiftDate: z.date(),
	organization: z.string().min(1, { message: "Organization is required" }),
	employeeName: z.string().min(1, { message: "Employee name is required" }),
	title: z
		.string({ required_error: "Title is required" })
		.min(3, { message: "Title is too short" }),
	shiftType: z.enum(["Day", "Night"]),
	shiftStartTime: z.string().min(1, "Start time is required"),
	shiftEndTime: z.string().min(1, "End time is required"),
	sendChanges: z.boolean().optional(),
	sendMessage: z.boolean().optional(),
}).refine((data) => isAfter(parse(data.shiftEndTime, "HH:mm", new Date()), parse(data.shiftStartTime, "HH:mm", new Date())), {
    message: "End time must be after start time",
    path: ["shiftEndTime"]
});
const AddEditSheet = ({
	open,
	setOpen,
	onSubmit,
	vacation,
	slot
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (data: z.infer<typeof schema>) => void;
	vacation?: DayEvent;
	slot?: Date;
}) => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			id: vacation?.id || "",
			shiftDate: vacation?.start || new Date(),
			organization: "Red Farm Covent Garden",
			employeeName: "X",
			title: vacation?.title || "",
			shiftType: "Day",
			shiftStartTime: vacation?.start
				? format(vacation?.start, "HH:mm")
				: "",
			shiftEndTime: vacation?.end ? format(vacation?.end, "HH:mm") : "",
		},
	});
    useEffect(() => {
        if (!vacation) {
			if (!slot) return;
			form.setValue('shiftDate', slot);
			form.setValue('shiftStartTime', format(slot, "HH:mm"));
			return;
		}
        form.setValue('id', vacation.id);
        form.setValue('shiftDate', vacation.start);
        form.setValue('title', vacation.title);
        form.setValue('shiftStartTime', format(vacation.start, "HH:mm"))
        form.setValue('shiftEndTime', format(vacation.end, "HH:mm"))
    }, [vacation, slot])
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="hidden" />

			<SheetContent className="!w-[400px] sm:!w-[800px] sm:max-w-[36rem]" hideclose>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 h-full">
				<SheetHeader>
					<SheetTitle className="w-full flex items-center justify-between">
						{vacation && vacation.id ? "Edit" : "Add"} Shift
						<Button
							type="submit"
						>
							<Save className="w-4 h-4" /> Save
						</Button>
					</SheetTitle>
					<SheetDescription>
						{vacation && vacation.start
							? format(vacation.start, "dd MMM yyyy, EEEE")
							: slot ? format(slot, "dd MMM yyyy, EEEE") : format(new Date(), "dd MMM yyyy, EEEE")}
					</SheetDescription>
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
						<FormSelect
							name="employeeName"
							label=""
							selectItems={[
								{
									value: "X",
									label: "X",
								},
							]}
						/>
						<p className="text-xs font-semibold my-4">Department: BOH</p>
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
						<div className="w-full flex-col mt-10 border-t border-t-gray-200 pt-4 space-y-4">
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

export default AddEditSheet;
