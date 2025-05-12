"use client";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useFormContext } from "react-hook-form";
export const FormSelect = React.forwardRef<
	HTMLDivElement,
	{
		name: string;
		label: string;
		selectItems: { value: string; label: string }[];
		placeholder?: string;
		description?: string;
		disabled?: boolean;
		required?: boolean;
		defaultValue?: string;
	}
>(
	(
		{
			name,
			label,
			selectItems,
			placeholder,
			description,
			disabled = false,
			required = false,
			defaultValue,
		},
		ref
	) => {
		const { control, getValues } = useFormContext();

		//console.log(getValues("billTo"),"==bill to ");

		return (
			<FormField
				control={control}
				name={name}
				render={({ field }) => (
					<FormItem className="space-y-0 mb-1" ref={ref}>
						<FormLabel className="text-left text-xs font-normal text-gray-500">
							{required ? label + " *" : label}
						</FormLabel>
						<Select
							//ref={ref}
							onValueChange={field.onChange}
							value={field.value}
							disabled={disabled}
						>
							<FormControl>
								<SelectTrigger className="dark:bg-input w-[300px] rounded-none h-8 border-0 shadow-sm appearance-none border-b-2 border-gray-300 text-muted-foreground bg-[#FFFFFF] pl-[5px] hover:text-muted-foreground dark:text-gray-200 flex justify-between items-center focus:ring-0 focus-visible:ring-0 text-black">
									<SelectValue
										className="text-sm dark:text-white placeholder:text-sm placeholder:text-[#626F86] placeholder:dark:text-white text-black"
										placeholder={placeholder}
									/>
								</SelectTrigger>
							</FormControl>
							<SelectContent
								align="end"
								className="dark:bg-input"
							>
								{selectItems?.length > 0 &&
									selectItems?.map((item) => (
										<SelectItem
											key={item.value}
											value={item.value}
											className="capitalize cursor-pointer"
										>
											{item.label}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
						{description && (
							<FormDescription>{description}</FormDescription>
						)}
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	}
);

FormSelect.displayName = "FormSelect";
