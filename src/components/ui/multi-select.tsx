"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type Option = { label: string; value: string };

interface ISelectProps {
  placeholder: string;
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
  className?: string;
}
const MultiSelect = ({
  placeholder,
  options: values,
  selectedOptions: selectedItems,
  setSelectedOptions: setSelectedItems,
  className
}: ISelectProps) => {
  const [open, setOpen] = useState(false);
  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(value);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false;
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild className={cn("w-full", className)}>
          <Button
            variant="outline"
            className={cn("border-none w-full flex items-center justify-between h-9 font-normal", selectedItems.length == 0 && "text-muted-foreground")}
          >
            <div>{selectedItems.length > 0 ? selectedItems.join(", ") : placeholder}</div>
            <ChevronDown className={cn("h-4 w-4 opacity-50 duration-200", open && "rotate-180")} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {values.map((value: ISelectProps["options"][0], index: number) => {
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={index}
                checked={isOptionSelected(value.value)}
                onCheckedChange={() => handleSelectChange(value.value)}
              >
                {value.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiSelect;