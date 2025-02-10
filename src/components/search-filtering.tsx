import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { SelectDropdown } from "./select-dropdown";
import { Button } from "./ui/button";
import { ArrowDownNarrowWide as AscendingIcon, ArrowUpWideNarrow as DescendingIcon } from 'lucide-react';
import MultiCombobox from "./multi-combobox";
import { getBreeds } from "@/provider/dogs";
import { useSearchFilters } from "@/hooks/useSearchFilters";

interface Props {
  className?: string;
}

export default function SearchFiltering({ className }: Props) {
  const [availableBreeds, setAvailableBreeds] = useState([] as string[]);

  const { selectedBreeds, sortBy, sortOrder, setSelectedBreeds, setSortBy, setSortOrder } = useSearchFilters()

  useEffect(() => {
    getBreeds().then(setAvailableBreeds);
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <Label className="block mb-2">Filter by Breed</Label>
        <MultiCombobox options={availableBreeds.map(breed => ({ value: breed, label: breed }))}
          selectedValues={selectedBreeds}
          onValuesChange={setSelectedBreeds}
          placeholder="All"
          searchPlaceholder="Search breeds"
        />
      </div>
      <div className="flex gap-2 items-end">
        <div>
          <Label className="block mb-2">Sort by</Label>
          <SelectDropdown
            value={sortBy}
            onValueChange={setSortBy}
            options={[{
              value: 'breed',
              label: 'Breed'
            }, {
              value: 'name',
              label: 'Name'
            }, {
              value: 'age',
              label: 'Age'
            }]} />
        </div>
        <Button onClick={toggleSortOrder} variant="outline" size="icon">
          {sortOrder === 'asc' ? <AscendingIcon /> : <DescendingIcon />}
        </Button>
      </div>
    </div>)
}