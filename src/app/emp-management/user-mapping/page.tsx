"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeftRight, X } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/ui/FormSelect";

// Fake data for employees
const rosEmployees = [
	{ id: "1", name: "Aastha Rao", email: "rasg@gmail.com" },
	{ id: "2", name: "Harsha Naik", email: "harshanaik123@gmail.com" },
	{ id: "3", name: "Staff4Four", email: "staff4@restaurantonesolution.com" },
	{
		id: "4",
		name: "Staff78Three",
		email: "staff789@restaurantonesolution.com",
	},
];

const posEmployees = [
	{ id: "1", name: "Asif", email: "asif@restaurantonesolution.com" },
	{ id: "2", name: "Rohit", email: "rohit@thesushico.co.uk" },
	{ id: "3", name: "Cashier", email: "" },
	{
		id: "4",
		name: "Alex",
		email: "alex@thesushico.co.uk",
		phone: "07852911032",
	},
];

const FormSchema = z.object({
	rosEmployee: z.string({
		required_error: "Please select an ROS employee.",
	}),
	posEmployee: z.string({
		required_error: "Please select a POS employee.",
	}),
});

interface Mapping {
	id: string;
	rosEmployee: (typeof rosEmployees)[0];
	posEmployee: (typeof posEmployees)[0];
}
const UserMapping = () => {
	const [mappings, setMappings] = useState<Mapping[]>([]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const rosEmployee = rosEmployees.find((e) => e.id === data.rosEmployee);
		const posEmployee = posEmployees.find((e) => e.id === data.posEmployee);

		if (rosEmployee && posEmployee) {
			setMappings([
				...mappings,
				{
					id: `${data.rosEmployee}-${data.posEmployee}`,
					rosEmployee,
					posEmployee,
				},
			]);
			form.reset({ rosEmployee: "", posEmployee: "" });
		}
    form.reset({ rosEmployee: "", posEmployee: "" });
	}

	function deleteMapping(id: string) {
		setMappings(mappings.filter((mapping) => mapping.id !== id));
	}
	return (
		<div className="w-full p-4">
			<h1>Employee Mapping</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-4 flex gap-4 mb-8 max-w-2xl"
				>
					<FormField
						control={form.control}
						name="rosEmployee"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<SelectTrigger className="dark:bg-input w-[300px] rounded-none h-8 border-0 shadow-sm appearance-none border-b-2 border-gray-300 text-muted-foreground bg-[#FFFFFF] pl-[5px] hover:text-muted-foreground dark:text-gray-200 flex justify-between items-center focus:ring-0 focus-visible:ring-0 text-black">
											<SelectValue
												className="text-sm dark:text-white placeholder:text-sm placeholder:text-[#626F86] placeholder:dark:text-white text-black"
												placeholder="ROS Employee"
											/>
										</SelectTrigger>
										<SelectContent align="end">
											{rosEmployees.map((employee) => {
                        if (mappings.some((mapping) => mapping.rosEmployee.id === employee.id)) return null;
                        return (
                          <SelectItem
													key={employee.id}
													value={employee.id}
												>
													{employee.name}
												</SelectItem>
                        )
												
											})}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="posEmployee"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<SelectTrigger className="dark:bg-input w-[300px] rounded-none h-8 border-0 shadow-sm appearance-none border-b-2 border-gray-300 text-muted-foreground bg-[#FFFFFF] pl-[5px] hover:text-muted-foreground dark:text-gray-200 flex justify-between items-center focus:ring-0 focus-visible:ring-0 text-black">
											<SelectValue
												className="text-sm dark:text-white placeholder:text-sm placeholder:text-[#626F86] placeholder:dark:text-white text-black"
												placeholder="POS Employee"
											/>
										</SelectTrigger>
										<SelectContent align="end">
											{posEmployees.map((employee) => {
                        if (mappings.some((mapping) => mapping.posEmployee.id === employee.id)) return null;
                        return(
												<SelectItem
													key={employee.id}
													value={employee.id}
												>
													{employee.name}
												</SelectItem>
											)})}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Add</Button>
				</form>
			</Form>

			<div className="space-y-4 max-w-2xl">
				{mappings.map((mapping) => (
					<div
						key={mapping.id}
						className="bg-gray-100 p-4 rounded-lg flex items-center justify-between"
					>
						<div className="space-y-1">
							<div className="font-medium">
								{mapping.rosEmployee.name}
							</div>
							<div className="text-sm text-gray-600">
								{mapping.rosEmployee.email}
							</div>
						</div>

						<ArrowLeftRight className="mx-4 text-gray-400" />

						<div className="space-y-1">
							<div className="font-medium">
								{mapping.posEmployee.name}
							</div>
							<div className="text-sm text-gray-600">
								{mapping.posEmployee.email}
								{mapping.posEmployee.phone && (
									<div>{mapping.posEmployee.phone}</div>
								)}
							</div>
						</div>

						<Button
							variant="ghost"
							size="icon"
							onClick={() => deleteMapping(mapping.id)}
							className="ml-4"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserMapping;
