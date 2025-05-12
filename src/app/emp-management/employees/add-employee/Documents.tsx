'use client';
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { Separator } from "@/components/ui/separator";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import React from "react";
import { documentColumns, DocumentTable } from "./document-columns";
import { ColumnDef } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";

const Documents = ({
	setActiveNav,
}: {
	setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const props = useFullDataTable<DocumentTable>([], documentColumns as ColumnDef<DocumentTable>[])
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex gap-40 pl-8">
				<h3 className="font-bold">Documents</h3>
				<div className="flex-1 grid grid-cols-2 gap-y-2">
					<FormInput name="documentName" label="Document Name" />
					<FormSelect
						name="documentType"
						label="Document Type"
						selectItems={[
							{ value: "personal", label: "PERSONAL" },
							{ value: "contract", label: "CONTRACT" },
						]}
					/>
					<div className="col-span-full flex items-end gap-4">
						<FormInput
							name="documentDescription"
							label="Document Description"
							formItemClassName="w-full"
							inputContainerClassName="w-full"
						/>
            <Button><Plus className="w-4 h-4" />Add</Button>
					</div>
				</div>
			</div>
      <Separator className="h-0.5" />
      <FullDataTable {...props} />
      <div className="flex items-center gap-2 place-self-end">
				<Button
					className="border-black px-3 py-4 w-48 hover:shadow-lg font-normal"
					variant={"outline"}
					onClick={() => setActiveNav((prev) => prev - 1)}
				>
					<ArrowLeft className="w-4 h-4" /> PREVIOUS
				</Button>
				<Button
					className="border-black px-3 py-4 w-48 hover:shadow-lg font-normal"
					variant={"outline"}
					onClick={() => setActiveNav((prev) => prev + 1)}
				>
					NEXT <ArrowRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};

export default Documents;
