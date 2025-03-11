import React from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchFilters({ 
  date, 
  setDate, 
  filters, 
  setFilters, 
  clearAllFilters 
}) {
  // Ensure date is a valid Date object
  const validDate = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search applications..."
              className="pl-10 border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
              value={filters.searchQuery || ''}
              onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => setFilters({...filters, status: value})}
        >
          <SelectTrigger className="w-[180px] border-gray-200 rounded-lg bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-lg border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
              <span className="mr-2 text-blue-500">📅</span>
              {filters.dateFilter ? format(filters.dateFilter, 'PP') : 'Select Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="p-3">
              <Calendar
                mode="single"
                selected={filters.dateFilter}
                onSelect={(newDate) => {
                  setDate(newDate || new Date());
                  setFilters({...filters, dateFilter: newDate});
                }}
                className="rounded-md border"
              />
              {filters.dateFilter && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 w-full text-slate-600"
                  onClick={() => setFilters({...filters, dateFilter: null})}
                >
                  Clear Date
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
        <Button 
          variant="ghost" 
          className="rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          onClick={clearAllFilters}
        >
          <span className="mr-2">🔄</span>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}