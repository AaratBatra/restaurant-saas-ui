"use client";

import { useMemo, type ReactNode } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

export interface PaginationWithLinksProps<TData> {
	table: Table<TData>;
	pageSizeSelectOptions?: {
		pageSizeSearchParam?: string;
		pageSizeOptions: number[];
	};
	totalCount?: number;
	pageSize: number;
	page: number;
	pageSearchParam?: string;
}

export function PaginationWithLinks<TData>({
	table,
	pageSizeSelectOptions,
	pageSize,
	totalCount,
	page,
	pageSearchParam,
}: PaginationWithLinksProps<TData>) {
	const totalPageCount = useMemo(
		() =>
			totalCount
				? Math.ceil(totalCount / pageSize)
				: Math.ceil(table.getFilteredRowModel().rows.length / pageSize),
		[totalCount, pageSize, table.getFilteredRowModel().rows.length]
	);
	
	const renderPageNumbers = () => {
		const items: ReactNode[] = [];
		const maxVisiblePages = 5;

		if (totalPageCount <= maxVisiblePages) {
			if (totalPageCount === 0) {
				items.push(
					<PaginationItem key={1}><PaginationLink onClick={()=>table.setPageIndex(0)} isActive={true}>1</PaginationLink></PaginationItem>
				)
			}
			for (let i = 0; i < totalPageCount; i++) {
				items.push(
					<PaginationItem key={i + 1}>
						<PaginationLink
							onClick={() => table.setPageIndex(i)}
							isActive={page === i + 1}
						>
							{(i + 1).toString()}
						</PaginationLink>
					</PaginationItem>
				);
			}
		} else {
			items.push(
				<PaginationItem key={1}>
					<PaginationLink
						onClick={() => table.setPageIndex(0)}
						isActive={page === 1}
					>
						1
					</PaginationLink>
				</PaginationItem>
			);

			if (page > 3) {
				items.push(
					<PaginationItem key="ellipsis-start">
						<PaginationEllipsis />
					</PaginationItem>
				);
			}

			const start = Math.max(2, page - 1); // Adjusted start
			const end = Math.min(totalPageCount - 1, page + 1); // Adjusted end

			for (let i = start; i <= end; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							onClick={() => table.setPageIndex(i - 1)} // Adjust to 0-based index
							isActive={page === i}
						>
							{i.toString()}
						</PaginationLink>
					</PaginationItem>
				);
			}

			if (page < totalPageCount - 2) {
				items.push(
					<PaginationItem key="ellipsis-end">
						<PaginationEllipsis />
					</PaginationItem>
				);
			}

			items.push(
				<PaginationItem key={totalPageCount}>
					<PaginationLink
						onClick={() => table.setPageIndex(totalPageCount - 1)}
						isActive={page === totalPageCount}
					>
						{totalPageCount.toString()}
					</PaginationLink>
				</PaginationItem>
			);
		}

		return items;
	};

	return (
		<div className="flex flex-col md:flex-row items-center gap-3 w-fit">
			<Pagination
				className={cn({ "md:justify-end": pageSizeSelectOptions })}
			>
				<PaginationContent className="max-sm:gap-0">
					<PaginationItem>
						<PaginationPrevious
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage() || totalPageCount === 0}
							tabIndex={page === 1 ? -1 : undefined}
							className={
								page === 1
									? "pointer-events-none opacity-50"
									: undefined
							}
						/>
					</PaginationItem>
					{renderPageNumbers()}
					<PaginationItem>
						<PaginationNext
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage() || totalPageCount === 0}
							tabIndex={page === totalPageCount ? -1 : undefined}
							className={
								page === totalPageCount
									? "pointer-events-none opacity-50"
									: undefined
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
