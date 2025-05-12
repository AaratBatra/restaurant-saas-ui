"use client";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import React, { useMemo, useState } from "react";
import { generateData } from "../edit-employee/makeData";
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
		shiftColumns as ColumnDef<ShiftTable>[]
	);
	return (
		<div className="w-full flex flex-col gap-4 p-2">
			<FullDataTable {...props} />
		</div>
	);
};

export default Shifts;
