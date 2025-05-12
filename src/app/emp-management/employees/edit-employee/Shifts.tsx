"use client";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import React, { useMemo, useState } from "react";
import { generateData } from "./makeData";
import { shiftColumns, ShiftTable } from "./shiftColumns";
import { ColumnDef } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";
import AddEditShiftSheet from "../../shift-calendar/shift-schedular/AddEditShiftSheet";
import { addHours } from "date-fns";

const Shifts = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const initData = useMemo(() => generateData(), []);
	const props = useFullDataTable(
		initData,
		shiftColumns as ColumnDef<ShiftTable>[],
		{
			openSheet: () => setOpen(true),
		}
	);
	const [open, setOpen] = useState(false);
	return (
		<div className="w-full flex flex-col gap-4 p-2">
			<FullDataTable {...props} />
			<AddEditShiftSheet
				open={open}
				setOpen={setOpen}
				onSubmit={(d) => console.log(d)}
				onClose={setOpen}
				shift={{
					id: "1234",
					employee: "Tamara",
					department: "BOH",
					start: new Date(),
					end: addHours(new Date(), 6),
					title: "",
				}}
			/>
		</div>
	);
};

export default Shifts;
