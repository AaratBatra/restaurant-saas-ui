import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./form";
import { Info } from "lucide-react";
import { DateTimePicker } from "./datetime-picker";
import { DateTimeInput } from "./datetime-input";

export const FormDate = ({
	name,
	label,
	info,
	description,
	disabled = false,
	required = false,
	// className = "",
	// type = "text",
	// acceptAmount = false,
}: {
	name: string;
	label: string;
	info?: string;
	description?: string;
	disabled?: boolean;
	required?: boolean;
	// className?: string;
	// type?: "text" | "number" | "email";
	// acceptAmount?: boolean;
}) => {
	const { control } = useFormContext();
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-0 mb-1">
                    <FormLabel className="text-left text-xs font-normal text-gray-500">
                        {required ? label + " *" : label}
					</FormLabel>
					<FormControl>
						<div className="flex items-baseline gap-1">
							<DateTimePicker
								value={field.value}
								onChange={field.onChange}
								//use12HourFormat
								hideTime
                                disabled={disabled}
								timePicker={{ hour: false, minute: false }}
								renderTrigger={({ open, value, setOpen }) => (
									<DateTimeInput
										value={value}
										onChange={(x) =>
											!open && field.onChange(x)
										}
										format="dd MMM yyyy"
										disabled={open}       
										onCalendarClick={() => setOpen(!open)}
									/>
								)}
							/>
							{info && (
								<div className="tooltip place-self-end">
									<Info className="w-4 h-4" />
									<span className="tooltiptext text-[0.7rem] leading-3">
										{info}
									</span>
								</div>
							)}
						</div>
					</FormControl>
					<FormDescription className={description ? "" : "hidden"}>
						{description}
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
