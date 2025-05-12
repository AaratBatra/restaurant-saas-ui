"use client";
import {
	ColumnDef,
	PaginationState,
	RowSelectionState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

export function useFullDataTable<T>(
	initialData: T[],
	columns: ColumnDef<T>[],
	callbacks?: { [key: string]: (d?: unknown) => void }
) {
	const [tableData, setTableData] = useState<T[]>([]);
	useEffect(() => {
		if (initialData && initialData.length > 0) setTableData(initialData);
	}, [initialData]);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	return {
		data: tableData,
		setData: setTableData,
		columns,
		rowSelection,
		setRowSelection,
		pagination,
		setPagination,
		callbacks,
	};
}
