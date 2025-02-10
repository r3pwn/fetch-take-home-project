"use client"

import React, { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

interface Option {
  value: string;
  label: string;
}

interface Props {
  placeholder?: string;
  searchPlaceholder?: string;
  options: Option[];
  selectedValues: string[];
  onValuesChange: (values: string[]) => void;
}

export default function MultiCombobox({ placeholder, searchPlaceholder, selectedValues, onValuesChange, options }: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    onValuesChange(
      selectedValues.includes(currentValue)
        ? selectedValues.filter((value) => value !== currentValue)
        : [...selectedValues, currentValue]
    );
    setOpen(false);
  };

  const label = selectedValues.length > 1 ? `${selectedValues.length} selections` : selectedValues[0] || placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-[180px] justify-between overflow-hidden" variant="outline" onClick={() => setOpen(!open)}>
          {label}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      {selectedValues.length > 1 &&
        <Button className="ml-2 align-top" variant="outline" size="icon" onClick={() => onValuesChange([])}>
          <X />
        </Button>
      }
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No options available.</CommandEmpty>
            <CommandGroup>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                >
                  {framework.label}
                  <Check
                    className={`ml-auto ${selectedValues.includes(framework.value) ? 'opacity-100' : 'opacity-0'}`}
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
