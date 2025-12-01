"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface JobPostsFilterProps {
  selectedStatuses: number[];
  onStatusChange: (statuses: number[]) => void;
}

const statusOptions = [
  { id: 1, label: "Active", color: "text-green-700" },
  { id: 2, label: "Pending", color: "text-yellow-700" },
  { id: 3, label: "Rejected", color: "text-red-700" },
  { id: 5, label: "Filled", color: "text-blue-700" },
  { id: 6, label: "Closed", color: "text-gray-700" },
];

export default function JobPostsFilter({
  selectedStatuses,
  onStatusChange,
}: JobPostsFilterProps) {
  const handleStatusToggle = (statusId: number) => {
    if (selectedStatuses.includes(statusId)) {
      onStatusChange(selectedStatuses.filter((id) => id !== statusId));
    } else {
      onStatusChange([...selectedStatuses, statusId]);
    }
  };

  const handleClearAll = () => {
    onStatusChange([]);
  };

  const handleSelectAll = () => {
    onStatusChange(statusOptions.map((option) => option.id));
  };

  const activeFilterCount = selectedStatuses.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          <Filter className="mr-2 h-4 w-4" />
          Filter by Status
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-primary-blue text-white rounded-full px-2 py-0.5 text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statusOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={selectedStatuses.includes(option.id)}
            onCheckedChange={() => handleStatusToggle(option.id)}
            className="cursor-pointer"
          >
            <span className={option.color}>{option.label}</span>
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <div className="flex gap-2 px-2 py-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            className="flex-1 h-8"
          >
            Select All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="flex-1 h-8"
          >
            Clear
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
