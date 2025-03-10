export async function fetchTransactionData() {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://pl.pr.flashfund.in/admin/transactions/history');
      const result = await response.json();
      
      if (result.success && result.data.transactions) {
        // Transform API data to match our application format
        const transformedData = result.data.transactions.map((transaction, index) => {
          // Map status from API to our status values
          let status = 'Pending';
          if (transaction.status === 'LOAN_DISBURSED' || transaction.rawStatus === 'LOAN_DISBURSED') {
            status = 'Approved';
          } else if (transaction.status === 'LOAN_REJECTED' || transaction.rawStatus === 'LOAN_REJECTED') {
            status = 'Rejected';
          }
          
          // Generate a random risk score if not provided
          const riskScore = Math.floor(Math.random() * 50) + 50;
          
          return {
            id: transaction.transactionId || `LA-2025-${1000 + index}`,
            name: transaction.name || 'Anonymous',
            amount: transaction.amount !== 'N/A' ? parseFloat(transaction.amount) : Math.floor(Math.random() * 300000) + 50000,
            date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : '2025-03-10',
            status:  transaction.status,
            riskScore: transaction.progressScore,
            email: transaction.name || 'customer@example.com',
            phone: '+1 (555) 123-4567',
            loanType: 'Personal-Loan',
            purpose: transaction.loanPurpose || 'General Purpose'
          };
        });
        
        // Calculate statistics
        const total = transformedData.length;
        const pending = transformedData.filter(app => app.status === 'Pending').length;
        const approved = transformedData.filter(app => app.status === 'Approved').length;
        const rejected = transformedData.filter(app => app.status === 'Rejected').length;
        
        const calculatedStats = {
          total,
          pending,
          approved,
          rejected
        };
        
        return { transformedData, calculatedStats };
      } else {
        // Return fallback data if API fails
        return createFallbackData();
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Return fallback data
      
    }
  }
  