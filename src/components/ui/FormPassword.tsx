import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "./form";
import { FloatingInput } from "./FloatingInput";
import { Eye, EyeClosed, EyeOff, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";

export const FormPassword = ({
	name,
	label,
	info,
	description,
	disabled = false,
	required = false,
	className = "",
	acceptAmount = false,
	formItemClassName = "",
	inputContainerClassName = "",
    minLength
}: {
	name: string;
	label: string;
	info?: string;
	description?: string;
	disabled?: boolean;
	required?: boolean;
	className?: string;
	acceptAmount?: boolean;
	formItemClassName?: string;
	inputContainerClassName?: string;
    minLength?: number;
}) => {
	const { control } = useFormContext();
	let l = label;
	// if (acceptAmount && type === "number") {
	// 	l = "£ " + label;
	// }
	const [showPassword, setShowPassword] = useState(false);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={formItemClassName}>
					<FormControl>
						<div className="flex items-baseline gap-1 h-[2.7rem] w-full">
							<FloatingInput
								label={required ? l + " *" : l}
								className={cn("mt-1", className)}
								disabled={disabled}
								type={showPassword ? "text" : "password"}
								inputContainerClassName={
									inputContainerClassName
								}
                                minLength={minLength || 8}
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
							<Button
								size={"icon"}
								variant={"ghost"}
								className="hover:bg-transparent place-self-end items-end pb-1"
								onClick={() => setShowPassword(!showPassword)}
							>
                                {showPassword ? (
                                    <Eye className="w-4 h-4" />
                                ) : (
                                    <EyeOff className="w-4 h-4" />
                                )}
							</Button>
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
