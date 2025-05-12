"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import { Plus, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { employeeColumns, EmployeeTable } from "./employeeColumns";
import { generateData } from "./makeData";
import { ColumnDef } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";
import { useRouter } from "next/navigation";

const opts = [
	{ value: "management", label: "Management" },
	{ value: "BOH", label: "BOH" },
	{ value: "FOH", label: "FOH" },
];
const Employees = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const initData = useMemo(() => generateData(), []);
	const props = useFullDataTable<EmployeeTable>(
		initData,
		employeeColumns as ColumnDef<EmployeeTable>[]
	);
	return (
		<div className="w-full p-5">
			<h1 className="mb-4">Employees</h1>
			<div className="w-full border rounded-md shadow-lg flex items-center justify-between p-4">
				<div className="flex items-center gap-3">
					<div className="flex items-center border-b my-1">
						<Search className="w-4 h-4 place-self-center" />
						<Input
							className="border-none focus-within:outline-none focus-within:ring-0 focus-visible:ring-0 shadow-none"
							placeholder="Employee Name or ID"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<div className="flex items-center border-b my-1">
						<Search className="w-4 h-4 place-self-center" />
						<MultiSelect
							placeholder="Select Department"
							options={opts}
							selectedOptions={selectedItems}
							setSelectedOptions={setSelectedItems}
						/>
					</div>
				</div>
				<Button
					onClick={() =>
						router.push("/emp-management/employees/add-employee")
					}
				>
					<Plus />
					Add New
				</Button>
			</div>
			<div className="w-full flex flex-col gap-2">
				<h3>Recent Search</h3>
				<FullDataTable {...props} />
			</div>
		</div>
	);
};

export default Employees;
