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
  showTriggerIcon?: string;
  closePopoverOnClick: boolean;
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
  showTriggerIcon,
  options,
  values,
  setValues,
  value,
  setValue,
  isPopoverOpen,
  closePopoverOnClick,
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
          <p className={cn(`hidden sm:block ${showTriggerIcon}`)}>{label}</p>
          <span className={cn(`block sm:hidden ${showTriggerIcon}`)}>
            <MdFilterListAlt className={cn(`h-6 w-6 ${showTriggerIcon}`)} />
          </span>
          {isPopoverOpen ? (
            <FaChevronUp
              className={`hidden sm:block opacity-50 ${showTriggerIcon}`}
            />
          ) : (
            <FaChevronDown
              className={`hidden sm:block opacity-50 ${showTriggerIcon}`}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn(`w-fit border-none p-0.5 bg-[#333333]`)}>
        <Command className="bg-[#171717]">
          <CommandInput
            placeholder={`${commandInputLabel ?? "Search..."}`}
            className="h-9 text-white"
          />
          <CommandList className="text-white">
            <CommandEmpty>{`${
              commandEmptyMessage ?? "Not found..."
            }`}</CommandEmpty>
            <CommandGroup
              onClick={() => {
                if (closePopoverOnClick) {
                  setIsPopoverOpen(false);
                }
              }}

            >
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (setValue) {
                      setValue(currentValue === value ? "" : currentValue);
                    }
                    if (values && setValues) {
                      let updatedValues: string[] = [];
                      
                      if(currentValue == "All" && !values.includes('All')){
                        updatedValues = ["All"]
                      }
                      else if (values.includes(currentValue)) {
                        updatedValues = values.filter(
                          (value) => value != currentValue
                        );
                      } else {
                        if(!values.includes("All")){
                          updatedValues = [...values, currentValue]
                        }
                        else{
                          const filtered =  values.filter(val => val != 'All');
                          updatedValues = [...filtered,currentValue];
                        }
                      }

                      setValues(updatedValues);
                    }
                  }}
                  className={cn(
                    `font-mono text-sm cursor-pointer text-neutral-400 hover:bg-[#333333] ${styleOption}`
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
