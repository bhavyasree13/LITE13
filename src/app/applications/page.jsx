'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ApplicationsPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterAndSortCustomers();
  }, [customers, selectedFilter, searchTerm, sortBy]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/customers');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Calculate additional fields for display
      const enrichedCustomers = data.map(customer => {
        const creditScore = calculateCreditScore(customer);
        const riskLevel = calculateRiskLevel({ ...customer, creditScore });
        
        // Auto-approve/reject based on risk level
        const autoDecision = ['Poor', 'Very Poor'].includes(riskLevel.level) ? 1 : 0; // 1 = rejected, 0 = approved
        
        return {
          ...customer,
          DEFAULT: autoDecision, // Override original decision with risk-based decision
          age: Math.floor(Math.abs(customer.DAYS_BIRTH) / 365.25),
          yearsEmployed: Math.floor(Math.abs(customer.DAYS_EMPLOYED) / 365.25),
          incomeToLoanRatio: customer.AMT_INCOME_TOTAL / customer.AMT_CREDIT,
          monthlyIncomeToPayment: (customer.AMT_INCOME_TOTAL / 12) / customer.AMT_ANNUITY,
          creditScore: creditScore,
          riskLevel: riskLevel,
          applicationDate: generateRandomDate(),
          applicationId: `FINS-${customer.id.toString().padStart(6, '0')}`
        };
      });
      
      setCustomers(enrichedCustomers);
      setError(null);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load applications. Please ensure the JSON server is running on http://localhost:3001');
    } finally {
      setLoading(false);
    }
  };

  // Updated credit score calculation using logic from second code
  const calculateCreditScore = (customer) => {
    let score = 300; // Base score
    
    // Income factor (0-150 points)
    const incomeScore = Math.min(150, (customer.AMT_INCOME_TOTAL / 10000));
    score += incomeScore;
    
    // Credit to income ratio (0-100 points, lower is better)
    const creditToIncomeRatio = customer.AMT_CREDIT / customer.AMT_INCOME_TOTAL;
    const creditRatioScore = Math.max(0, 100 - (creditToIncomeRatio * 100));
    score += creditRatioScore;
    
    // External sources average (0-100 points)
    const extSources = [customer.EXT_SOURCE_1, customer.EXT_SOURCE_2, customer.EXT_SOURCE_3].filter(s => s != null);
    if (extSources.length > 0) {
      const extSourceAvg = extSources.reduce((a, b) => a + b, 0) / extSources.length;
      const extSourceScore = extSourceAvg * 100;
      score += extSourceScore;
    }
    
    // Employment stability (0-50 points)
    const employmentDays = Math.abs(customer.DAYS_EMPLOYED);
    const employmentScore = Math.min(50, employmentDays / 200);
    score += employmentScore;
    
    // Age factor (0-30 points, older is more stable)
    const age = Math.abs(customer.DAYS_BIRTH) / 365;
    const ageScore = Math.min(30, age / 2);
    score += ageScore;
    
    // Ownership factors (0-40 points)
    let ownershipScore = 0;
    if (customer.FLAG_OWN_CAR === 'Yes') ownershipScore += 10;
    if (customer.FLAG_OWN_REALTY === 'Yes') ownershipScore += 20;
    if (customer.CNT_CHILDREN <= 2) ownershipScore += 10; // Manageable family size
    score += ownershipScore;
    
    // Bureau and credit history (0-80 points)
    const bureauScore = Math.min(30, (customer.BUREAU_COUNT || 0) * 5);
    const creditHistoryScore = Math.min(50, ((customer.PREVAPP_COUNT || 0) + (customer.CC_COUNT || 0)) * 8);
    score += bureauScore + creditHistoryScore;
    
    // Education factor (0-40 points)
    let educationScore = 0;
    switch (customer.NAME_EDUCATION_TYPE) {
      case 'Academic degree': educationScore = 40; break;
      case 'Higher education': educationScore = 30; break;
      case 'Secondary': educationScore = 20; break;
      case 'Lower secondary': educationScore = 10; break;
      default: educationScore = 0;
    }
    score += educationScore;
    
    // Cap the score at 850 (standard credit score range)
    return Math.min(850, Math.round(score));
  };

  // Updated risk level calculation with new color scheme
  const calculateRiskLevel = (customer) => {
    const score = customer.creditScore || calculateCreditScore(customer);
    if (score >= 750) return { 
      level: 'Excellent', 
      color: 'green', 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-800', 
      icon: '🌟' 
    };
    if (score >= 700) return { 
      level: 'Good', 
      color: 'green', 
      bgColor: 'bg-green-50', 
      textColor: 'text-green-700', 
      icon: '✅' 
    };
    if (score >= 650) return { 
      level: 'Fair', 
      color: 'yellow', 
      bgColor: 'bg-yellow-50', 
      textColor: 'text-yellow-700', 
      icon: '⚡' 
    };
    if (score >= 600) return { 
      level: 'Poor', 
      color: 'orange', 
      bgColor: 'bg-orange-50', 
      textColor: 'text-orange-700', 
      icon: '⚠️' 
    };
    return { 
      level: 'Very Poor', 
      color: 'red', 
      bgColor: 'bg-red-50', 
      textColor: 'text-red-700', 
      icon: '🚨' 
    };
  };

  const generateRandomDate = () => {
    const start = new Date(2024, 7, 1); // August 1, 2024
    const end = new Date(2024, 7, 31);  // August 31, 2024
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
  };

  const filterAndSortCustomers = () => {
    let filtered = customers;

    // Apply filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(customer => {
        switch (selectedFilter) {
          case 'approved':
            return customer.DEFAULT === 0;
          case 'rejected':
            return customer.DEFAULT === 1;
          case 'high-risk':
            return ['Poor', 'Very Poor'].includes(customer.riskLevel?.level);
          case 'low-risk':
            return ['Excellent', 'Good'].includes(customer.riskLevel?.level);
          default:
            return true;
        }
      });
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.OCCUPATION_TYPE?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.NAME_INCOME_TYPE?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score-high':
          return b.creditScore - a.creditScore;
        case 'score-low':
          return a.creditScore - b.creditScore;
        case 'amount-high':
          return b.AMT_CREDIT - a.AMT_CREDIT;
        case 'amount-low':
          return a.AMT_CREDIT - b.AMT_CREDIT;
        case 'recent':
        default:
          return new Date(b.applicationDate) - new Date(a.applicationDate);
      }
    });

    setFilteredCustomers(filtered);
  };

  const getStatusBadge = (customer) => {
    if (customer.DEFAULT === 0) {
      return <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">✅ Approved</span>;
    } else {
      return <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">❌ Rejected</span>;
    }
  };

  // Updated function to get credit score color based on new ranges
  const getCreditScoreColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-green-500';
    if (score >= 650) return 'text-yellow-500';
    if (score >= 600) return 'text-orange-500';
    return 'text-red-500';
  };

  // Updated function to get card header gradient based on risk level
  const getCardHeaderGradient = (customer) => {
    const riskLevel = customer.riskLevel.level;
    
    // High risk applications get red color regardless of approval status
    if (['Poor', 'Very Poor'].includes(riskLevel)) {
      return 'bg-gradient-to-r from-red-600 to-pink-600';
    }
    
    // All other risk levels get green color
    return 'bg-gradient-to-r from-green-600 to-emerald-600';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-top-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading applications from AI system...</p>
          <p className="text-sm text-gray-500 mt-2">Connecting to http://localhost:3001/customers</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-2 text-sm text-gray-500 mb-6">
            <p>💡 Make sure to run: <code className="bg-gray-100 px-2 py-1 rounded">json-server --watch db.json --port 3001</code></p>
            <p>🔧 Check that your db.json file is in the correct location</p>
          </div>
          <button 
            onClick={fetchCustomers}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            🔄 Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Credit <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Applications</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-bold text-orange-300">{customers.length}</div>
                <div className="text-xs text-blue-200">Total Applications</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-bold text-green-300">{customers.filter(c => c.DEFAULT === 0).length}</div>
                <div className="text-xs text-blue-200">Approved</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-bold text-red-300">{customers.filter(c => c.DEFAULT === 1).length}</div>
                <div className="text-xs text-blue-200">Rejected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Application ID, Occupation, or Income Type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Applications', count: customers.length },
                { key: 'approved', label: 'Approved', count: customers.filter(c => c.DEFAULT === 0).length },
                { key: 'rejected', label: 'Rejected', count: customers.filter(c => c.DEFAULT === 1).length },
                { key: 'low-risk', label: 'Low Risk', count: customers.filter(c => ['Excellent', 'Good'].includes(c.riskLevel?.level)).length },
                { key: 'high-risk', label: 'High Risk', count: customers.filter(c => ['Poor', 'Very Poor'].includes(c.riskLevel?.level)).length }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedFilter === filter.key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="score-high">Highest Score</option>
              <option value="score-low">Lowest Score</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Application Header with updated gradient */}
              <div className={`p-6 ${getCardHeaderGradient(customer)} text-white`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{customer.applicationId}</h3>
                    <p className="text-sm opacity-90">Applied: {customer.applicationDate}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(customer)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80">Credit Score</p>
                    <p className={`text-2xl font-bold  filter brightness-150`}>
                      {customer.creditScore}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Loan Amount</p>
                    <p className="text-lg font-bold">{formatCurrency(customer.AMT_CREDIT)}</p>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {customer.CODE_GENDER === 'Male' ? '👨' : '👩'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Customer #{customer.id}</h4>
                      <p className="text-sm text-gray-600">{customer.OCCUPATION_TYPE}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${customer.riskLevel.bgColor} ${customer.riskLevel.textColor}`}>
                      <span>{customer.riskLevel.icon}</span>
                      <span>{customer.riskLevel.level}</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Annual Income</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(customer.AMT_INCOME_TOTAL)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(customer.AMT_ANNUITY)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Age</p>
                    <p className="font-semibold text-gray-900">{customer.age} years</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Experience</p>
                    <p className="font-semibold text-gray-900">{customer.yearsEmployed} years</p>
                  </div>
                </div>

                {/* Customer Profile Summary */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Education</p>
                    <p className="font-medium text-gray-900">{customer.NAME_EDUCATION_TYPE}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Family Status</p>
                    <p className="font-medium text-gray-900">{customer.NAME_FAMILY_STATUS}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Housing</p>
                    <p className="font-medium text-gray-900">{customer.NAME_HOUSING_TYPE}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Children</p>
                    <p className="font-medium text-gray-900">{customer.CNT_CHILDREN}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                    📊 View SHAP Analysis
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">
                    📄 Download Report
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
                    ✉️ Contact Customer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCustomers.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Analytics Summary with updated calculations */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <h4 className="font-bold text-gray-900">Approval Rate</h4>
            <p className="text-2xl font-bold text-green-600">
              {customers.length > 0 ? ((customers.filter(c => c.DEFAULT === 0).length / customers.length) * 100).toFixed(1) : 0}%
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
            <h4 className="font-bold text-gray-900">Avg Credit Score</h4>
            <p className="text-2xl font-bold text-blue-600">
              {customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + c.creditScore, 0) / customers.length) : 0}
            </p>
            <p className="text-sm text-gray-500">Enhanced Algorithm</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-purple-600 text-xl">💰</span>
            </div>
            <h4 className="font-bold text-gray-900">Avg Loan Amount</h4>
            <p className="text-2xl font-bold text-purple-600">
              {customers.length > 0 ? formatCurrency(customers.reduce((sum, c) => sum + c.AMT_CREDIT, 0) / customers.length) : '₹0'}
            </p>
            <p className="text-sm text-gray-500">Credit requests</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-orange-600 text-xl">⚡</span>
            </div>
            <h4 className="font-bold text-gray-900">Processing Time</h4>
            <p className="text-2xl font-bold text-orange-600">&lt; 2min</p>
          </div>
        </div>

        {/* API Status & Tech Info */}
        <div className="mt-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">🔧 System Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">API Connected</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="font-semibold text-gray-900">Data Source</div>
              <div className="text-blue-600">localhost:3001/customers</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="font-semibold text-gray-900">Model Type</div>
              <div className="text-purple-600">Enhanced Credit Scoring</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="font-semibold text-gray-900">Last Sync</div>
              <div className="text-green-600">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;