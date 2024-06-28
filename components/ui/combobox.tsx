"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export const Combobox = ({ options, value, onChange }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="bg-[#181622] hover:bg-[#291839] border border-[#643d88]">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" hover:bg-[#853bce] w-[200px] justify-between rounded px-2 py-1 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#291839] ">
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select Option..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border border-[#853bce]">
        <Command className="bg-[#181622] text-[#b98ee4]">
          <CommandInput placeholder="Search Magic..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Magic Category found.</CommandEmpty>
            <CommandGroup className=" text-[#b98ee4] hover:text-[#b98ee4]">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange?.(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}>
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
