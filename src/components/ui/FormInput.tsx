import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "./form";
import { FloatingInput } from "./FloatingInput";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const FormInput = ({
	name,
	label,
	info,
	description,
	disabled = false,
	required = false,
	className = "",
	type = "text",
	acceptAmount = false,
	formItemClassName = "",
	inputContainerClassName = "",
}: {
	name: string;
	label: string;
	info?: string;
	description?: string;
	disabled?: boolean;
	required?: boolean;
	className?: string;
	type?: "text" | "number" | "email" | "time";
	acceptAmount?: boolean;
	formItemClassName?: string;
	inputContainerClassName?: string;
}) => {
	const { control } = useFormContext();
	let l = label;
	if (acceptAmount && type === "number") {
		l = "£ " + label;
	}
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("space-y-2", formItemClassName)}>
					<FormControl>
						<div className="flex items-baseline gap-1 h-full pb-1 w-full">
							<FloatingInput
								label={required ? l + " *" : l}
								className={cn("mt-1",className)}
								disabled={disabled}
								type={type}
								inputContainerClassName={inputContainerClassName}
								{...field}
								onBlur={(e) => {
									if (acceptAmount) {
										const value = parseFloat(
											e.target.value
										);
										if (!isNaN(value)) {
											field.onChange(value.toFixed(2)); // ✅ Formats value as "12.00"
										}
									}
									field.onBlur(); // ✅ Ensures React Hook Form still triggers validation
								}}
							/>
							{info && (
								<div className="tooltip place-self-end">
									<Info className="w-4 h-4" />
									<span className="tooltiptext text-[0.7rem] leading-3">{info}</span>
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
