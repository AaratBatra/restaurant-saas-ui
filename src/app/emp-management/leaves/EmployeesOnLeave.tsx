"use client";
import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Leave } from "./page";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Edit, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const EmployeesOnLeave = ({
	open,
	setOpen,
	data,
	onEditOpen,
	onDelete,
	onAdd
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data: Leave;
	onEditOpen: (data: Leave, employeeId: string) => void;
	onDelete: (data: Leave) => void;
	onAdd: () => void;
}) => {
	const router = useRouter();
	if (!data) return null;
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent
				className="!w-[400px] sm:!w-[800px] sm:max-w-[36rem]"
				hideclose
			>
				<SheetHeader>
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
								Employees on leave{" "}
								<p className="text-sm text-gray-500">
									{format(data.start, "dd MMM yyyy")}
								</p>
							</div>
						</div>
						<Button type="button" onClick={onAdd}>
							<Plus className="w-4 h-4" />
							Add Vacation
						</Button>
					</SheetTitle>
				</SheetHeader>
				<div className="grid w-full grid-cols-4 items-center justify-center gap-x-4 gap-y-4 mt-5">
					<p className="text-center">Employee</p>
					<p className="text-center">Comments</p>
					<p className="text-center">Department</p>
					<p className="text-center">Actions</p>
					{data.employees.map((employee) => (
						<React.Fragment key={employee.id}>
							<div className="flex items-center gap-2">
								<Avatar className="w-10 h-10">
									<AvatarImage
										src={employee.avatar}
										alt={`${employee.name}-avatar`}
										className="object-cover"
									/>
									<AvatarFallback>
										{employee.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<p className="font-semibold">{employee.name}</p>
							</div>
							<p className="text-center">{employee.comments}</p>
							<p className="text-center">BOH</p>
							<div className="flex items-center justify-center">
								<Button
									variant={"ghost"}
									size={"icon"}
									className="w-5 h-5 cursor-pointer hover:text-indigo-500"
									onClick={() =>
										router.push(
											`/emp-management/employees/view-calender/?id=${employee.id}`
										)
									}
									asChild
								>
									<Calendar className="w-4 h-4" />
								</Button>
								<Button
									variant={"ghost"}
									size={"icon"}
									className="w-5 h-5 cursor-pointer hover:text-yellow-500"
									onClick={() =>
										onEditOpen(data, employee.id)
									}
									asChild
								>
									<Edit className="w-4 h-4" />
								</Button>
								<Button
									variant={"ghost"}
									size={"icon"}
									className="w-5 h-5 cursor-pointer hover:text-red-500"
									onClick={() => onDelete(data)}
									asChild
								>
									<Trash className="w-4 h-4" />
								</Button>
							</div>
						</React.Fragment>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default EmployeesOnLeave;
