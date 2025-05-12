import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

export function useStandardTable<T>({initialData, columns, callbacks}: {initialData: T[], columns: ColumnDef<T>[], callbacks?: {[key: string]: (d?: unknown) => void}}) {
    const [data, setData] = useState<T[]>(() => initialData);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    return {
        data,
        setData,
        rowSelection,
        setRowSelection,
        columns,
        callbacks
    }
}