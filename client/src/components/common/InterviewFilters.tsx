import * as React from "react";
import { Check } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";

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

export function InterviewFilters({
  tags,
  selectedTags,
  setSelectedTags,
}: {
  tags: { id: string; tagName: string; tagInitials:string }[];
  selectedTags: string[];
  setSelectedTags: (x: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center px-2 py-2 rounded-sm gap-2 text-neutral-400 border border-[#333333] cursor-pointer">
          <span>Filters</span>
          <FaChevronDown className="size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border-none mr-4">
        <Command className="bg-[#171717] border-none">
          <CommandInput placeholder="Filters" className="h-9" />
          <CommandList>
            <CommandEmpty>Oops! Please use different keyword</CommandEmpty>
            <CommandGroup className="text-neutral-400">
              {tags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  className="cursor-pointer"
                  value={tag.tagName}
                  onSelect={(currentValue) => {
                    let updatedTags:string[] = [];
                    if(selectedTags.includes(currentValue)){
                        updatedTags = selectedTags.filter(tag => tag != currentValue);
                    }else{
                        updatedTags = [...selectedTags,currentValue];
                    }
                    setSelectedTags(updatedTags);
                  }}
                >
                  {tag.tagName}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedTags.includes(tag.tagName) ? "opacity-100" : "opacity-0"
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
