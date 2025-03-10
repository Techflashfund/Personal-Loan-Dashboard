import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ApplicationsTable({ applications, loading, setSelectedApplication, setSidebarOpen }) {
    console.log("applications",applications);
    
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'text-green-600';
    if (progress >= 70) return 'text-green-600';
    if (progress >= 50) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getProgressBarColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-green-500';
    if (progress >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  // Function to format transaction data to match application structure
  const formatTransactionsAsApplications = (transactions) => {
    return transactions.map(transaction => ({
      id: transaction.transactionId,
      name: transaction.name,
      amount: transaction.amount,
      date: new Date(transaction.date).toLocaleDateString(),
      status: transaction.status,
      progressScore: transaction.progressScore,
    }));
  };

  // If applications is in transaction format, convert it
  const displayApplications = Array.isArray(applications.data?.transactions) 
    ? formatTransactionsAsApplications(applications.data.transactions) 
    : applications;

  return (
    <div className="flex-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-500">Loading applications...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-slate-600 font-medium">Application ID</TableHead>
                <TableHead className="text-slate-600 font-medium">Applicant</TableHead>
                <TableHead className="text-slate-600 font-medium">Amount</TableHead>
                <TableHead className="text-slate-600 font-medium">Date</TableHead>
                <TableHead className="text-slate-600 font-medium">Status</TableHead>
                <TableHead className="text-slate-600 font-medium">Progress</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayApplications.map((app) => (
                <TableRow 
                  key={app.id} 
                  className="cursor-pointer hover:bg-slate-50 transition-colors duration-150" 
                  onClick={() => {
                    setSelectedApplication(app.id);
                    setSidebarOpen(true);
                  }}
                >
                  <TableCell className="font-medium text-blue-600">{app.id}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-blue-100">
                      <AvatarFallback className="text-xs text-blue-600">
                        {app.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {app.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {app.amount === 'N/A' ? 'N/A' : `$${typeof app.amount === 'number' ? app.amount.toLocaleString() : app.amount}`}
                  </TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(app.status)} px-3 py-1 rounded-full text-xs font-medium`}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={`mr-2 font-medium ${getProgressColor(app.riskScore)}`}>
                        {app.riskScore}%
                      </span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full">
                        <div
                          className={`h-full rounded-full ${getProgressBarColor(app.riskScore)}`}
                          style={{ width: `${Math.min(app.riskScore, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}