// File: LoanApplicationDashboard.jsx
'use client'
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import StatsCards from '../components/Statscards';
import ApplicationsTable from '../components/ApplicationsTable';
import ApplicationDetails from '../components/ApplicationDetails';
import { fetchTransactionData } from '../utils/api';
import withAuth from '@/hoc/withAuth';
import { format, isSameDay, parseISO } from 'date-fns';

const Dashboard = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [date, setDate] = useState(new Date());
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  
  // Define filters state
  const [filters, setFilters] = useState({
    searchQuery: '',
    status: 'all',
    dateFilter: null, // Start with no date filter
    sortBy: 'date',
    sortDirection: 'desc'
  });
  
  // Fetch transaction data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { transformedData, calculatedStats } = await fetchTransactionData();
        setApplications(transformedData);
        setFilteredApplications(transformedData);
        setStats(calculatedStats);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (!applications.length) return;
    
    let result = [...applications];
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(app => 
        app.name?.toLowerCase().includes(query) || 
        app.id?.toString().includes(query)
      );
    }
    
    // Filter by status
    if (filters.status && filters.status !== 'all') {
      result = result.filter(app => 
        app.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }
    
    // Filter by date - properly compare dates using date-fns
    if (filters.dateFilter) {
      result = result.filter(app => {
        // Handle different date formats
        let appDate;
        try {
          // Try parsing as ISO string first
          appDate = typeof app.date === 'string' ? parseISO(app.date) : new Date(app.date);
          
          // Check if the date is valid
          if (isNaN(appDate.getTime())) {
            // Try parsing MM/DD/YYYY format
            const parts = app.date.split('/');
            if (parts.length === 3) {
              appDate = new Date(parseInt(parts[2]), parseInt(parts[0])-1, parseInt(parts[1]));
            }
          }
          
          return isSameDay(appDate, filters.dateFilter);
        } catch (e) {
          console.error('Error parsing date:', app.date, e);
          return false;
        }
      });
    }
    
    // Sort results
    result.sort((a, b) => {
      const sortField = filters.sortBy;
      let valueA = a[sortField];
      let valueB = b[sortField];
      
      // Handle dates
      if (sortField === 'date') {
        try {
          valueA = new Date(valueA).getTime();
          valueB = new Date(valueB).getTime();
          
          // Handle invalid dates
          if (isNaN(valueA)) valueA = 0;
          if (isNaN(valueB)) valueB = 0;
        } catch (e) {
          console.error('Error sorting dates:', e);
        }
      }
      
      // Handle numeric values
      if (sortField === 'amount' || sortField === 'riskScore') {
        valueA = typeof valueA === 'string' ? parseFloat(valueA) || 0 : valueA || 0;
        valueB = typeof valueB === 'string' ? parseFloat(valueB) || 0 : valueB || 0;
      }
      
      // Handle string values
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return filters.sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      // Handle numeric comparison
      if (filters.sortDirection === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
    
    setFilteredApplications(result);
  }, [filters, applications]);

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      status: 'all',
      dateFilter: null,
      sortBy: 'date',
      sortDirection: 'desc'
    });
    setDate(new Date());
  };

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
        
        <SearchFilters 
          date={filters.dateFilter || date} 
          setDate={setDate} 
          filters={filters}
          setFilters={setFilters}
          clearAllFilters={clearAllFilters}
        />
        
        <StatsCards stats={stats} />

        <div className="flex flex-col lg:flex-row gap-6">
          <ApplicationsTable 
            applications={filteredApplications} 
            loading={loading} 
            setSelectedApplication={setSelectedApplication}
            setSidebarOpen={setSidebarOpen}
            filters={filters}
            setFilters={setFilters}
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

export default withAuth(Dashboard);