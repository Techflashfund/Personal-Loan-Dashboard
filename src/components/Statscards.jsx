import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="rounded-xl border-none shadow-md bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -mt-10 -mr-10 opacity-50"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Total Applications</CardTitle>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-lg">📄</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">{stats.total.toLocaleString()}</div>
          <p className="text-xs text-blue-600 font-medium flex items-center mt-1">
            <span className="mr-1">↑</span>
            +12.5% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="rounded-xl border-none shadow-md bg-gradient-to-r from-amber-50 to-amber-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full -mt-10 -mr-10 opacity-50"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Pending Review</CardTitle>
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-amber-600 text-lg">⏱️</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">{stats.pending}</div>
          <p className="text-xs text-amber-600 font-medium flex items-center mt-1">
            <span className="mr-1">↓</span>
            -2.3% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="rounded-xl border-none shadow-md bg-gradient-to-r from-green-50 to-green-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full -mt-10 -mr-10 opacity-50"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Approved</CardTitle>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-lg">✅</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">{stats.approved}</div>
          <p className="text-xs text-green-600 font-medium flex items-center mt-1">
            <span className="mr-1">↑</span>
            +8.2% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="rounded-xl border-none shadow-md bg-gradient-to-r from-red-50 to-red-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-red-200 rounded-full -mt-10 -mr-10 opacity-50"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Rejected</CardTitle>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-lg">❌</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">{stats.rejected}</div>
          <p className="text-xs text-red-600 font-medium flex items-center mt-1">
            <span className="mr-1">↓</span>
            -5.1% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
