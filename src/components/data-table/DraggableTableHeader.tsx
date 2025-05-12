import { useSortable } from "@dnd-kit/sortable";
import { Cell, Column, flexRender, Header, Table } from "@tanstack/react-table";
import { CSS, Transform } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { TableCell, TableHead } from "../ui/table";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	CalendarIcon,
	FlaskConical,
	GripVertical,
	X,
} from "lucide-react";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectValue,
} from "../ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DateRange } from "react-day-picker";
import { Input } from "../ui/input";
import { DateTimePicker } from "../ui/datetime-picker";
import { DateTimeInput } from "../ui/datetime-input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const SelectTriggerCustom = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		// rounded-md border border-input shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring
		className={cn(
			"flex h-max w-max items-center justify-between whitespace-nowrap bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 focus-visible:ring-0 focus:ring-0 focus:outline-none border-none focus-visible:border-none focus:border-none",
			className
		)}
		{...props}
	>
		{children}
	</SelectPrimitive.Trigger>
));
SelectTriggerCustom.displayName = "SelectTriggerCustom";

/*
"contains", "doesNotContain", "equals", "doesNotEqual","startsWith", "endsWith"
*/
const stringOps = [
	{ value: "contains", label: "Contains" },
	{ value: "doesNotContain", label: "Does not contain" },
	{ value: "equals", label: "Equals" },
	{ value: "doesNotEqual", label: "Does not equal" },
	{ value: "startsWith", label: "Starts with" },
	{ value: "endsWith", label: "Ends with" },
];
const numberOps = [
	{ value: "equals", label: "Equals" },
	{ value: "doesNotEqual", label: "Does not equal" },
	{ value: "greaterThan", label: "Greater Than" },
	{ value: "lessThan", label: "Less Than" },
	{ value: "greaterThanOrEqual", label: "Greater than or equal to" },
	{ value: "lessThanOrEqual", label: "Less than or equal to" },
];
const dateOps = [
	{ value: "equals", label: "Equals" },
	{ value: "doesNotEqual", label: "Does not equal" },
	{ value: "greaterThan", label: "Is after" },
	{ value: "lessThan", label: "Is before" },
	{ value: "inRange", label: "In range" },
];
const selectOps = [
	{ value: "equals", label: "Is" },
	{ value: "doesNotEqual", label: "Is not" },
];
export const getCommonPinningStyles = <T,>(
	column: Column<T>,
	isDragging: boolean,
	transform: Transform | null
) => {
	const isPinned = column.getIsPinned();
	const isLastLeftPinnedColumn =
		isPinned === "left" && column.getIsLastColumn("left");
	const isFirstRightPinnedColumn =
		isPinned === "right" && column.getIsFirstColumn("right");

	return {
		boxShadow: isLastLeftPinnedColumn
			? "-4px 0 4px -4px gray inset"
			: isFirstRightPinnedColumn
			? "4px 0 4px -4px gray inset"
			: undefined,
		left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
		right:
			isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
		opacity: isDragging ? 0.95 : 1,
		position: isPinned || isDragging ? "sticky" : "relative",
		transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
		transition: "width transform 2s ease-in-out",
		whiteSpace: "nowrap",
		width: `${column.getSize()}px`, //header.column.getSize(),
		minWidth: `${column.columnDef.minSize}px`,
		zIndex: isPinned || isDragging ? 10 : 0,
		//width: column.getSize(),
		//zIndex: isPinned ? 1 : 0,
	};
};
function ColumnResizer<TData, TValue>({
	header,
}: {
	header: Header<TData, TValue>;
}) {
	if (header.column.getCanResize() === false) return <></>;

	return (
		<div
			onMouseDown={header.getResizeHandler()}
			onTouchStart={header.getResizeHandler()}
			onDoubleClick={() => header.column.resetSize()}
			className="absolute top-0 right-0 rounded-lg cursor-col-resize max-md:w-1 w-px h-full hover:bg-sky-600 hover:w-1 group-hover:w-1 group-hover:bg-gray-400"
			style={{
				userSelect: "none",
				touchAction: "none",
			}}
		/>
	);
}
export const DraggableTableHeader = <T,>({
	header,
	table,
}: {
	header: Header<T, unknown>;
	table: Table<T>;
}) => {
	const { attributes, isDragging, listeners, setNodeRef, transform } =
		useSortable({
			id: header.column.id,
		});
	const isPinned = header.column.getIsPinned();
	const style = getCommonPinningStyles(header.column, isDragging, transform);
	const isSelect = header.column.id === "select";
	//opacity: isDragging ? 0.8 : 1,
	//position: "relative",
	//cursor: isDragging ? "grabbing" : "grab",
	return (
		<TableHead
			key={header.id}
			//border border-l-0 border-t-0 border-b-0 border-r border-gray-400 border-r-gray-400
			className={cn(
				"ps-6 lg:text-left max-lg:w-fit max-lg:pr-0 relative truncate",
				isPinned || isDragging ? "bg-white dark:bg-slate-900" : "",
				isSelect && "ps-0 px-[6px] p-[9px]"
			)}
			ref={setNodeRef}
			style={style as React.CSSProperties}
		>
			<div
				//style={{ width: `${header.column.getSize() - 20}px` }}
				className="overflow-hidden block"
			>
				{header.column.id !== "actions" && !isSelect && !isPinned && (
					<Button
						className={cn(
							"inline-block absolute left-1 top-1/2 translate-y-[-50%] h-4 w-4",
							isDragging ? "cursor-grabbing" : "cursor-grab"
						)}
						variant="ghost"
						size="icon"
						asChild
						{...attributes}
						{...listeners}
					>
						<GripVertical className="w-4 h-4" />
					</Button>
				)}
				<div className="flex gap-1 items-center flex-wrap">
					{header.isPlaceholder
						? null
						: flexRender(
								header.column.columnDef.header,
								header.getContext()
						  )}
					{header.column.id !== "actions" && !isSelect && (
						<div className="flex items-center">
							<Select
								onValueChange={(value) => {
									if (value === "reset") {
										header.column.clearSorting();
									} else if (value === "asc") {
										header.column.toggleSorting(false);
									} else {
										header.column.toggleSorting(true);
									}
								}}
							>
								<SelectTriggerCustom className="px-0 py-0">
									<>
										<ArrowUpDown
											className={cn(
												"opacity-0 w-3 h-3 group-hover:opacity-100",
												header.column.getIsSorted()
													? "hidden"
													: ""
											)}
										/>
										<SelectValue />
									</>
								</SelectTriggerCustom>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Order</SelectLabel>
										{header.column.getIsSorted() && (
											<SelectItem
												value="reset"
												title="Reset"
											>
												<X className="w-3 h-3" />
											</SelectItem>
										)}
										<SelectItem
											value="asc"
											title="Ascending"
										>
											<ArrowUp className="w-3 h-3" />
										</SelectItem>
										<SelectItem
											value="desc"
											title="Descending"
										>
											<ArrowDown className="w-3 h-3" />
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<ColumnFilter
								column={header.column}
								table={table}
							/>
						</div>
					)}
				</div>

				{header.column.id !== "actions" && !isPinned && (
					<ColumnResizer header={header} />
				)}
			</div>
		</TableHead>
	);
};

export const DragAlongCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
	const { isDragging, setNodeRef, transform } = useSortable({
		id: cell.column.id,
	});

	const isPinned = cell.column.getIsPinned();
	const style = getCommonPinningStyles(cell.column, isDragging, transform);
	return (
		<TableCell
			key={cell.id}
			className={cn(
				"text-left max-lg:ps-6 truncate max-w-16 pl-6", //border py-2 border-[#091E4224]
				isPinned || isDragging ? "bg-white dark:bg-slate-900" : "",
				cell.column.id === "select" && "pl-2"
			)}
			style={style as React.CSSProperties}
			ref={setNodeRef}
		>
			{flexRender(cell.column.columnDef.cell, cell.getContext())}
		</TableCell>
	);
};

const ColumnFilter = <T,>({
	column,
	table,
}: {
	column: Column<T, unknown>;
	table: Table<T>;
}) => {
	const [filterOpen, setFilterOpen] = useState(false);
	const [filter, setFilter] = useState<{
		operator1: string;
		value1: string | number | Date | DateRange | undefined;
		join: "and" | "or";
		operator2?: string;
		value2?: string | number | Date | DateRange | undefined;
	}>({
		operator1: "",
		value1: "",
		join: "or",
	});
	const [addMore, setAddMore] = useState(false);
	let ops = [];
	let component1 = <></>;
	let component2 = <></>;
	if (column.columnDef.meta?.type === "number") {
		ops = numberOps;
		component1 = (
			<Input
				type="number"
				className="h-8"
				value={filter.value1 as string | number}
				onChange={(e) =>
					setFilter({ ...filter, value1: e.target.value })
				}
			/>
		);
		component2 = (
			<Input
				type="number"
				className="h-8"
				value={filter.value2 as string | number}
				onChange={(e) =>
					setFilter({ ...filter, value2: e.target.value })
				}
			/>
		);
	} else if (column.columnDef.meta?.type === "date") {
		ops = dateOps;
		component1 =
			filter.operator1 === "inRange" ? (
				<div className={cn("grid gap-2")}>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={"outline"}
								className={cn(
									"justify-start text-left font-normal",
									!filter.value1 && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{filter.value1 !== undefined &&
								(filter.value1 as unknown as DateRange).from ? (
									(filter.value1 as unknown as DateRange)
										.to ? (
										<>
											{format(
												(
													filter.value1 as unknown as DateRange
												).from as Date,
												"LLL dd, y"
											)}{" "}
											-{" "}
											{format(
												(
													filter.value1 as unknown as DateRange
												).to as Date,
												"LLL dd, y"
											)}
										</>
									) : (
										format(
											(
												filter.value1 as unknown as DateRange
											).from as Date,
											"LLL dd, y"
										)
									)
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								autoFocus
								mode="range"
								defaultMonth={
									typeof filter.value1 === "object" &&
									"from" in filter.value1
										? filter.value1?.from
										: undefined
								}
								selected={
									typeof filter.value1 === "object" &&
									"from" in filter.value1
										? filter.value1
										: undefined
								}
								onSelect={(d) => {
									setFilter({ ...filter, value1: d });
								}}
								// }
								numberOfMonths={1}
							/>
						</PopoverContent>
					</Popover>
				</div>
			) : (
				<DateTimePicker
					value={
						filter.value1 instanceof Date
							? filter.value1
							: undefined
					}
					onChange={(val) =>
						setFilter((prev) => ({ ...prev, value1: val }))
					}
					use12HourFormat
					hideTime
					timePicker={{ hour: false, minute: false, second: false }}
					renderTrigger={({ open, value, setOpen }) => (
						<DateTimeInput
							value={value}
							onChange={(x) => {
								!open &&
									setFilter((prev) => ({
										...prev,
										value1: x,
									}));
							}}
							format="dd/MM/yyyy"
							disabled={open}
							onCalendarClick={() => setOpen(!open)}
						/>
					)}
				/>
			);
		component2 =
			filter.operator2 === "inRange" ? (
				<div className={cn("grid gap-2")}>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={"outline"}
								className={cn(
									"justify-start text-left font-normal",
									!filter.value2 && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{filter.value2 !== undefined &&
								(filter.value2 as unknown as DateRange).from ? (
									(filter.value2 as unknown as DateRange)
										.to ? (
										<>
											{format(
												(
													filter.value2 as unknown as DateRange
												).from as Date,
												"LLL dd, y"
											)}{" "}
											-{" "}
											{format(
												(
													filter.value2 as unknown as DateRange
												).to as Date,
												"LLL dd, y"
											)}
										</>
									) : (
										format(
											(
												filter.value2 as unknown as DateRange
											).from as Date,
											"LLL dd, y"
										)
									)
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								autoFocus
								mode="range"
								defaultMonth={
									typeof filter.value2 === "object" &&
									"from" in filter.value2
										? filter.value2?.from
										: undefined
								}
								selected={
									typeof filter.value2 === "object" &&
									"from" in filter.value2
										? filter.value2
										: undefined
								}
								onSelect={(d) =>
									setFilter({ ...filter, value2: d })
								}
								numberOfMonths={1}
							/>
						</PopoverContent>
					</Popover>
				</div>
			) : (
				<DateTimePicker
					value={
						filter.value2 instanceof Date
							? filter.value2
							: undefined
					}
					onChange={(val) =>
						setFilter((prev) => ({ ...prev, value2: val }))
					}
					use12HourFormat
					hideTime
					timePicker={{ hour: false, minute: false, second: false }}
					renderTrigger={({ open, value, setOpen }) => (
						<DateTimeInput
							value={value}
							onChange={(x) => {
								!open &&
									setFilter((prev) => ({
										...prev,
										value2: x,
									}));
							}}
							format="dd/MM/yyyy"
							disabled={open}
							onCalendarClick={() => setOpen(!open)}
						/>
					)}
				/>
			);
	} else if (column.columnDef.meta?.type === "select") {
		ops = selectOps;
		component1 = (
			<Select
				value={filter.value1 as string}
				onValueChange={(val) => setFilter({ ...filter, value1: val })}
			>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{column.columnDef.meta?.options?.map((o, idx) => (
						<SelectItem key={idx} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
		component2 = (
			<Select
				value={filter.value2 as string}
				onValueChange={(val) => setFilter({ ...filter, value2: val })}
			>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{column.columnDef.meta?.options?.map((o, idx) => (
						<SelectItem key={idx} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	} else {
		ops = stringOps;
		component1 = (
			<Input
				type="text"
				className="h-8"
				value={
					typeof filter.value1 === "string" && filter.value1
						? filter.value1
						: ""
				}
				onChange={(e) =>
					setFilter({ ...filter, value1: e.target.value })
				}
			/>
		);
		component2 = (
			<Input
				type="text"
				className="h-8"
				value={
					typeof filter.value2 === "string" && filter.value2
						? filter.value2
						: ""
				}
				onChange={(e) =>
					setFilter({ ...filter, value2: e.target.value })
				}
			/>
		);
	}
	useEffect(() => {
		if (
			filter.operator1 &&
			column.columnDef.meta?.type === "date" &&
			filter.value1 !== undefined &&
			typeof filter.value1 === "object" &&
			("from" in filter.value1 || "to" in filter.value1)
		) {
			setFilter({ ...filter, value1: undefined });
		}
	}, [filter.operator1, column]);
	useEffect(() => {
		if (
			filter.operator2 &&
			column.columnDef.meta?.type === "date" &&
			filter.value2 !== undefined &&
			typeof filter.value2 === "object" &&
			("from" in filter.value2 || "to" in filter.value2)
		)
			setFilter({ ...filter, value2: undefined });
	}, [filter.operator2, column]);
	useEffect(() => {
		if (
			column.getFilterValue() !== undefined ||
			column.getFilterValue() !== null
		) {
			setFilter({ ...(column.getFilterValue() as any) });
		}
	}, [filterOpen]);
	return (
		<Popover open={filterOpen} onOpenChange={setFilterOpen}>
			<PopoverTrigger className="px-0 py-0" asChild>
				{/* <Button variant="ghost" size="icon"> */}
				<FlaskConical
					className={cn(
						"opacity-0 w-3 h-3 group-hover:opacity-100",
						column.getIsFiltered() ? "opacity-100" : ""
					)}
				/>
				{/* </Button> */}
			</PopoverTrigger>
			<PopoverContent className="flex flex-col gap-1">
				<Select
					value={filter.operator1}
					onValueChange={(val) =>
						setFilter({ ...filter, operator1: val })
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Operator" />
					</SelectTrigger>
					<SelectContent>
						{ops.map((op, idx) => (
							<SelectItem key={idx} value={op.value}>
								{op.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{component1}
				{filter.operator1 && filter.value1 && (
					<Button
						className="h-6 place-self-end"
						onClick={() => {
							setAddMore(!addMore);
							setFilter({
								...filter,
								join: "or",
								operator2: undefined,
								value2: undefined,
							});
						}}
						variant="secondary"
					>
						{addMore ? "Less" : "More"}
					</Button>
				)}

				{addMore && (
					<>
						<RadioGroup
							defaultValue={filter.join}
							onValueChange={(val) =>
								setFilter({
									...filter,
									join: val as "or" | "and",
								})
							}
							className="flex items-center gap-2"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="and" id="r2" />
								<Label htmlFor="r2">AND</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="or" id="r1" />
								<Label htmlFor="r1">OR</Label>
							</div>
						</RadioGroup>
						<Select
							value={filter.operator2}
							onValueChange={(val) =>
								setFilter({ ...filter, operator2: val })
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Operator" />
							</SelectTrigger>
							<SelectContent>
								{ops.map((op, idx) => (
									<SelectItem key={idx} value={op.value}>
										{op.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{component2}
					</>
				)}
				<div className="flex items-center justify-between mt-4">
					<Button
						variant="secondary"
						className="h-6"
						onClick={() => {
							setFilter({
								operator1: "",
								value1: undefined,
								join: "or",
							});
							column.setFilterValue(undefined);

							setFilterOpen(false);
						}}
					>
						Clear
					</Button>
					<Button
						variant="secondary"
						className="h-6"
						onClick={() => {
							column.setFilterValue({ ...filter });
							setFilterOpen(false);
						}}
					>
						Submit
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
