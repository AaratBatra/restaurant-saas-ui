import * as React from "react";
import { cn } from "@/lib/utils";

const FloatingInput = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input"> & { label: string, inputContainerClassName?: string }
>(({ className, type, label, inputContainerClassName, ...props }, ref) => {
	return (
		<div className={cn("relative z-0", inputContainerClassName)}>
			<input
				type={type}
				className={cn(
					"block py-2.5 px-0 w-full text-sm shadow-sm transition-colors duration-300 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:opacity-50 disabled:cursor-not-allowed",
					className
				)}
				placeholder=" "
				ref={ref}
				{...props}
			/>
			<label
				htmlFor="floating_standard"
				className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
			>
				{label}
			</label>
		</div>
	);
});
FloatingInput.displayName = "Input";

export { FloatingInput };
