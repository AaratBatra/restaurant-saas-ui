"use client";
import * as React from "react";
import {
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	ColumnOrderState,
	PaginationState,
	RowSelectionState,
	ColumnDef
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
	arrayMove,
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
	DragAlongCell,
	DraggableTableHeader,
} from "./data-table/DraggableTableHeader";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { PaginationWithLinks } from "./data-table/PaginationWithLinks";
import { isEqual, isSameDay, parse } from "date-fns";

interface FullDataTableProps<T> {
	data: T[];
	setData: React.Dispatch<React.SetStateAction<T[]>>;
	pagination: PaginationState;
	setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
	columns: ColumnDef<T>[];
	rowSelection: RowSelectionState;
	setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
	callbacks?: {[key: string]: (d?: unknown) => void}
}


const FullDataTable = <T extends object,>({
	data,
	setData,
	pagination,
	setPagination,
	columns,
	rowSelection,
	setRowSelection,
	callbacks
}: FullDataTableProps<T>) => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	
	const [filtering, setFiltering] = React.useState("");
	//const [toggleFilter, setToggleFilter] = React.useState(false);
	const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(() =>
		columns?.map((c) => c.id as string)
	);

	const table = useReactTable({
		data: data ?? [],
		rowCount: data.length,
		columns,
		//getRowId: (row) => row.id,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		enableColumnResizing: true,
		columnResizeMode: "onChange",
		enableColumnPinning: false,
        defaultColumn: {
            minSize: 60,
            filterFn: "custom"
        },
		meta: {
			toggleFilter: () => {},
			callbacks: {...callbacks}
		},
		filterFns: {
			custom: (row, columnId, filterValue) => {
                if (!filterValue || !filterValue.operator1 || filterValue.value1 === undefined) {
                  return true;
                }
				function containsCurrencySymbol(str: string) {
					const regex = /[£$¥€₹]/ // Unicode property for currency symbols
					return regex.test(str);
				}
				
                const { operator1, value1, join, operator2, value2 } = filterValue;

                const applyFilter = (cellValue: string | number | Date, operator: string, value: string | number | Date | {from: Date, to: Date} | undefined, dtype: "string" | "date" | "number" | "select") => {
                  if (value === undefined || operator === undefined || typeof value === "undefined") return true;
				  
				  if (dtype === "date") {
					 const cv = typeof cellValue === "string" ? parse(cellValue as string, "dd MMM yyyy", new Date()) : cellValue as Date;
					 const val = value as Date;
					 if (typeof value === "object" && "from" in value) {
						 return cv >= value.from && (("to" in value && value.to !== undefined) ? cv <= value.to : cv <= new Date())
					 }

					 switch (operator) {
						case "equals":
							return isSameDay(cv, val);
						case "doesNotEqual":
							return !isSameDay(cv, val);
						case "greaterThan":
							return cv > value;
						case "lessThan":
							return cv < value;
						default:
							return true;
					 }
				  } else if (dtype === "select") {
					switch (operator) {
						case "equals":
							return cellValue === value;
						case "doesNotEqual":
							return cellValue !== value;
					}
				  } else if (dtype === "number") {
					let cv: string | number = "";
					if (typeof cellValue === "string" && containsCurrencySymbol(cellValue)) {
						cv = cellValue.replace(/[£$¥€₹]/g, '').trim();
						cv = parseFloat(cv);
					} else if (typeof cellValue === "string") {
						cv = parseFloat(cellValue)
					} else {
						cv = cellValue as number
					}
					
					const val = parseFloat(value as unknown as string);
					
					switch (operator) {
						case "equals":
							return cv == val;
						case "doesNotEqual":
							return cv != val;
						case "greaterThan":
							return cv > val;
						case "lessThan":
							return cv < val;
						case "greaterThanOrEqual":
							return cv >= val;
						case "lessThanOrEqual":
							return cv <= val;
						default:
							return true;
					}
				  } else {
					switch (operator) {
						case "contains":
						  return String(cellValue).toLowerCase().includes(String(value).toLowerCase());
						case "doesNotContain":
						  return !String(cellValue).toLowerCase().includes(String(value).toLowerCase());
						case "equals":
						  return cellValue == value; // Use loose equality for type coercion
						case "doesNotEqual":
						  return cellValue != value; // Use loose inequality for type coercion
						case "startsWith":
						  return String(cellValue).toLowerCase().startsWith(String(value).toLowerCase());
						case "endsWith":
						  return String(cellValue).toLowerCase().endsWith(String(value).toLowerCase());
						default:
						  return true;
					  }
				  }
                  return false;
                };
            
                // Get the cell value
                const cellValue = row.getValue(columnId);
				const dtype = table.getColumn(columnId)?.columnDef.meta?.type || "string";
                // Evaluate the first condition
				
                const condition1 = applyFilter(cellValue as string | number | Date, operator1, value1, dtype);
            
                // If there's no join condition, return the result of the first condition
                if (!join || !operator2 || value2 === undefined) {
                  return condition1;
                }
            
                // Evaluate the second condition
                const condition2 = applyFilter(cellValue as string | number | Date, operator2, value2, dtype);
            
                // Combine conditions based on the join operator
                return join === "and" ? condition1 && condition2 : condition1 || condition2;
              },
		},
		state: {
			pagination,
			globalFilter: filtering,
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			columnOrder,
		},
		onGlobalFilterChange: setFiltering,
	});
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string);
				const newIndex = columnOrder.indexOf(over.id as string);
				return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
			});
		}
	}
	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {})
	);
	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToHorizontalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className="w-full">
				<div className="relative w-full rounded-md border">
					<Table style={{ width: table?.getCenterTotalSize() }}>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className="group"
								>
									<SortableContext
										items={columnOrder}
										strategy={horizontalListSortingStrategy}
									>
										{headerGroup.headers.map(
											(header, index, arr) => {
												return (
													<DraggableTableHeader
														key={index}
														header={header}
                                                        table={table}
													/>
												);
											}
										)}
									</SortableContext>
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row, idx) => {
									return (
										<React.Fragment
											key={`${row.id}-${idx}`}
										>
											<TableRow
												data-state={
													row.getIsSelected() &&
													"selected"
												}
											>
												{row
													.getVisibleCells()
													.map((cell, idx) => (
														<SortableContext
															key={`${cell.id}-${idx}`}
															items={columnOrder}
															strategy={
																horizontalListSortingStrategy
															}
														>
															<DragAlongCell
																cell={cell}
															/>
														</SortableContext>
													))}
											</TableRow>
										</React.Fragment>
									);
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
					<div className="flex items-center justify-between space-x-2 py-2 px-1">
						<div className="min-w-40 flex text-sm text-muted-foreground">
							{table.getFilteredSelectedRowModel().rows.length} of{" "}
							{table.getFilteredRowModel().rows.length} row(s)
							selected.
						</div>
						<div className="flex items-center gap-2 w-fill-available justify-end">
							<div className="w-max flex gap-2 items-center">
								<div className="w-44 flex items-center gap-1 justify-end">
									<p className="text-sm text-muted-foreground">
										Rows per page
									</p>
									<Select
										value={`${
											table.getState().pagination.pageSize
										}`}
										onValueChange={(value) => {
											table.setPageSize(Number(value));
										}}
									>
										<SelectTrigger className="h-8 w-[70px]">
											<SelectValue
												placeholder={
													table.getState().pagination
														.pageSize
												}
											/>
										</SelectTrigger>
										<SelectContent side="top">
											{[10, 20, 30, 40, 50].map(
												(pageSize) => (
													<SelectItem
														key={pageSize}
														value={`${pageSize}`}
													>
														{pageSize}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center justify-center text-sm text-muted-foreground">
									Page{" "}
									{table.getState().pagination.pageIndex + 1}{" "}
									of {Math.ceil(table.getFilteredRowModel().rows.length / pagination.pageSize)}
								</div>
							</div>
							<PaginationWithLinks
								table={table}
								pageSize={pagination.pageSize}
								page={pagination.pageIndex + 1}
							/>
						</div>
					</div>
				</div>
			</div>
		</DndContext>
	);
};

export default FullDataTable;
