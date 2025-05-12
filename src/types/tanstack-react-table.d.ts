import all from '@tanstack/react-table';
declare module "@tanstack/react-table" {
    interface Column<TData> {
        label: string;
    }
    interface IdentifiedColumnDef<TData extends RowData> {
		label: string;
	}
	interface FilterFns {
		custom?: FilterFn<unknown>;
	}
	interface ColumnMeta<TData> {
		type: "select" | "date" | "string" | "number";
		options?: {
			label: string;
			value: string;
			render?: () => JSX.Element;
		}[],
	}
	interface TableMeta<TData extends RowData> {
		openFilterSheet?: () => void;
		toggleFilter: () => void;
		callbacks?: {
			[key: string]: (d?: unknown) => void;
		}
	}
}

/**
 * interface FilterFns {
		custom?: FilterFn<unknown>;
	}
 */