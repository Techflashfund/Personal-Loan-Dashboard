// File: LoanApplicationDashboard.jsx
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import StatsCards from '../components/StatsCards';
import ApplicationsTable from '../components/ApplicationsTable';
import ApplicationDetails from '../components/ApplicationDetails';
import { fetchTransactionData } from '../utils/api';

export default function LoanApplicationDashboard() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [date, setDate] = useState(new Date());
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  
  // Fetch transaction data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { transformedData, calculatedStats } = await fetchTransactionData();
        setApplications(transformedData);
        setStats(calculatedStats);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Get selected application details
  const selectedApplicationData = applications.find(app => app.id === selectedApplication);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Dashboard Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Personal-Loan Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage and track all personal loan applications</p>
        </div>
        
        <SearchFilters date={date} setDate={setDate} />
        
        <StatsCards stats={stats} />

        <div className="flex flex-col lg:flex-row gap-6">
          <ApplicationsTable 
            applications={applications} 
            loading={loading} 
            setSelectedApplication={setSelectedApplication}
            setSidebarOpen={setSidebarOpen}
          />

          {sidebarOpen && (
            <ApplicationDetails 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              selectedApplicationData={selectedApplicationData}
              stats={stats}
            />
          )}
        </div>
      </main>
    </div>
  );
}