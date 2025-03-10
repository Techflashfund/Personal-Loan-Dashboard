// components/Sidebar.js
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Sidebar = ({ sidebarOpen, setSidebarOpen, chartRef }) => {
  return (
    sidebarOpen && (
      <div className="w-80 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Application Details</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="rounded-full h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </Button>
        </div>
        <div ref={chartRef} className="h-64 mb-4"></div>
        <Separator className="my-6 bg-slate-200" />
        <ScrollArea className="h-[420px] pr-4">
          {/* Sidebar content goes here */}
        </ScrollArea>
      </div>
    )
  );
};