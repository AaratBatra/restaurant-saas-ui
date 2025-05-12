"use client";
import { Button } from "@/components/ui/button";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { documentColumns, DocumentTable } from "../add-employee/document-columns";
import { ColumnDef } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";

const Documents = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const props = useFullDataTable<DocumentTable>(
		[],
		documentColumns as ColumnDef<DocumentTable>[]
	);
	return (
		<div className="w-full flex flex-col gap-4 pt-2">
			<FullDataTable {...props} />
		</div>
	);
};

export default Documents;
