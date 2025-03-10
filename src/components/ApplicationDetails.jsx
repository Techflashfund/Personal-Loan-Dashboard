import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function ApplicationDetails({ sidebarOpen, setSidebarOpen, selectedApplicationData, stats }) {
  const pieChartRef = useRef(null);
  const chartRef = useRef(null);

  // Initialize the pie chart with dynamic data
  useEffect(() => {
    if (pieChartRef.current && sidebarOpen) {
      const chart = echarts.init(pieChartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            fontFamily: '"Inter", sans-serif'
          }
        },
        series: [
          {
            name: 'Application Status',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: '"Inter", sans-serif'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: stats.pending, name: 'Pending', itemStyle: { color: '#9DB2BF' } },
              { value: stats.approved, name: 'Approved', itemStyle: { color: '#7BB9D9' } },
              { value: stats.rejected, name: 'Rejected', itemStyle: { color: '#C1DAFF' } }
            ]
          }
        ]
      };
      chart.setOption(option);
      
      // Cleanup function
      return () => {
        chart.dispose();
      };
    }
  }, [stats, sidebarOpen]);

  // Initialize the trend chart
  useEffect(() => {
    if (chartRef.current && sidebarOpen) {
      const chart = echarts.init(chartRef.current);
      
      // Generate dates for the last 7 days
      const dates = [];
      const approvedData = [];
      const rejectedData = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(format(date, 'MMM d'));
        
        // Random data for demo purposes
        approvedData.push(Math.floor(Math.random() * 10) + 5);
        rejectedData.push(Math.floor(Math.random() * 5) + 1);
      }
      
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Approved', 'Rejected'],
          top: 0,
          textStyle: {
            fontFamily: '"Inter", sans-serif'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: dates,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              fontFamily: '"Inter", sans-serif',
              fontSize: 10
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              fontFamily: '"Inter", sans-serif',
              fontSize: 10
            }
          }
        ],
        series: [
          {
            name: 'Approved',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              color: '#7BB9D9'
            },
            data: approvedData
          },
          {
            name: 'Rejected',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              color: '#C1DAFF'
            },
            data: rejectedData
          }
        ]
      };
      
      chart.setOption(option);
      
      return () => {
        chart.dispose();
      };
    }
  }, [sidebarOpen]);

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

  return (
    <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-800">Application Details</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="rounded-full h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 cursor-pointer"
        >
          <span>✕</span>
        </Button>
      </div>
      
      {/* Charts */}
      <h4 className="font-medium text-slate-700 mb-2">Application Status</h4>
      <div ref={pieChartRef} className="h-64 mb-4"></div>
      
      <h4 className="font-medium text-slate-700 mb-2">Weekly Trend</h4>
      <div ref={chartRef} className="h-64 mb-4"></div>
      
      <Separator className="my-6 bg-slate-200" />
      
      {/* Selected Application Details */}
      <ScrollArea className="h-[300px] pr-4">
        {selectedApplicationData ? (
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">{selectedApplicationData.name}</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Application ID</p>
                <p className="text-sm font-medium">{selectedApplicationData.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <Badge className={`${getStatusColor(selectedApplicationData.status)} px-2 py-0.5 text-xs`}>
                  {selectedApplicationData.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Amount</p>
                <p className="text-sm font-medium">
                  ${typeof selectedApplicationData.amount === 'number' ? selectedApplicationData.amount.toLocaleString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Date</p>
                <p className="text-sm font-medium">{selectedApplicationData.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Loan Purpose</p>
                <p className="text-sm font-medium">{selectedApplicationData.purpose}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Risk Score</p>
                <p className={`text-sm font-medium ${
                  selectedApplicationData.riskScore >= 70 ? 'text-green-600' : 
                  selectedApplicationData.riskScore >= 50 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {selectedApplicationData.riskScore}/100
                </p>
              </div>
            </div>
            
            <Separator className="my-4 bg-slate-100" />
            
            <h5 className="font-medium text-slate-700 text-sm">Contact Information</h5>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="text-sm">{selectedApplicationData.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className="text-sm">{selectedApplicationData.phone}</p>
              </div>
            </div>
            
            <div className="pt-4 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                Review Application
              </Button>
              <Button variant="outline" className="border-gray-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm">
                View Documents
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-500 text-2xl">📋</span>
            </div>
            <h4 className="font-medium text-slate-700 mb-1">No Application Selected</h4>
            <p className="text-sm text-slate-500">Select an application from the table to view details</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}