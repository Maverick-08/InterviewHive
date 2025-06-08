"use client";
import { Check } from "lucide-react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import { cn } from "@/lib/utils";

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
import { MdFilterListAlt } from "react-icons/md";

interface ComboboxProps {
  label: string;
  labelStyle?: string;
  styleOption?: string;
  commandInputLabel?: string;
  commandEmptyMessage?: string;
  options: { value: string; label: string }[];
  values?: string[];
  value?: string;
  setValues?: (x: string[]) => void;
  setValue?: (x: string) => void;
  isPopoverOpen: boolean;
  setIsPopoverOpen: (x: boolean) => void;
}

export function Combobox({
  label,
  labelStyle,
  styleOption,
  commandInputLabel,
  commandEmptyMessage,
  options,
  values,
  setValues,
  value,
  setValue,
  isPopoverOpen,
  setIsPopoverOpen,
}: ComboboxProps) {
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={isPopoverOpen}
          className={cn(`${labelStyle}`)}
        >
          <p className="hidden sm:block">{label}</p>
          <span className="block sm:hidden">
            <MdFilterListAlt className="h-6 w-6" />
          </span>
          {isPopoverOpen ? (
            <FaChevronUp className="hidden sm:block opacity-50" />
          ) : (
            <FaChevronDown className="hidden sm:block opacity-50" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit border-none p-0.5 bg-[#333333]">
        <Command className="bg-[#171717]">
          <CommandInput
            placeholder={`${commandInputLabel ?? "Search..."}`}
            className="h-9 text-white"
          />
          <CommandList className="text-white">
            <CommandEmpty>{`${
              commandEmptyMessage ?? "Not found..."
            }`}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (value && setValue) {
                      setValue(currentValue === value ? "" : currentValue);
                    }
                    if (values && setValues) {
                      let updatedValues: string[] = [];

                      if (values.includes(currentValue)) {
                        updatedValues = values.filter(
                          (value) => value != currentValue
                        );
                      } else {
                        updatedValues = [...values, currentValue];
                      }

                      setValues(updatedValues);
                    }
                  }}
                  className={cn(
                    `cursor-pointer text-neutral-400 hover:bg-[#333333] ${styleOption}`
                  )}
                >
                  {option.label}
                  <Check
                    className={cn(
                      `${
                        value
                          ? value === option.value
                            ? "block"
                            : "hidden"
                          : values?.includes(option.value)
                          ? "block"
                          : "hidden"
                      }`
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
}
