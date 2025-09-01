'use client';
import React, { useState, useEffect } from 'react';
import { User, DollarSign, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';

const Score = () => {
  const [customerData, setCustomerData] = useState(null);
  const [creditScore, setCreditScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from local server
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('http://localhost:3001/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const customers = await response.json();
        
        // Get the last customer (most recent data)
        const latestCustomer = customers[customers.length - 1];
        setCustomerData(latestCustomer);
        
        // Calculate credit score
        const score = calculateCreditScore(latestCustomer);
        setCreditScore(score);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  // Credit score calculation algorithm
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
    const extSourceAvg = (customer.EXT_SOURCE_1 + customer.EXT_SOURCE_2 + customer.EXT_SOURCE_3) / 3;
    const extSourceScore = extSourceAvg * 100;
    score += extSourceScore;
    
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
    const bureauScore = Math.min(30, customer.BUREAU_COUNT * 5);
    const creditHistoryScore = Math.min(50, (customer.PREVAPP_COUNT + customer.CC_COUNT) * 8);
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

  const getScoreDescription = (score) => {
    if (score >= 750) return { text: 'Excellent', color: 'bg-green-100 border-green-500' };
    if (score >= 700) return { text: 'Good', color: 'bg-green-50 border-green-400' };
    if (score >= 650) return { text: 'Fair', color: 'bg-yellow-50 border-yellow-400' };
    if (score >= 600) return { text: 'Poor', color: 'bg-orange-50 border-orange-400' };
    return { text: 'Very Poor', color: 'bg-red-50 border-red-400' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading credit score...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">Error</h2>
          <p className="text-gray-600 text-center">{error}</p>
          <p className="text-sm text-gray-500 text-center mt-2">
            Make sure your JSON server is running on port 3000
          </p>
        </div>
      </div>
    );
  }

  const scoreDesc = getScoreDescription(creditScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Credit Score Analysis</h1>
          <p className="text-gray-600">Latest customer credit assessment</p>
        </div>

        {/* Main Score Display */}
        <div className={`bg-white rounded-2xl shadow-xl text-black p-8 mb-8 border-l-4 ${scoreDesc.color}`}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Credit Score</h2>
            </div>
            
            <div className={`text-6xl font-bold = mb-2`}>
              {creditScore}
            </div>
            
            <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 ${scoreDesc.color} mb-4`}>
              <span className="font-semibold text-lg">{scoreDesc.text}</span>
            </div>
            
            <div className="bg-gray-100 rounded-full h-3 max-w-md mx-auto">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  creditScore >= 750 ? 'bg-green-500' :
                  creditScore >= 700 ? 'bg-green-400' :
                  creditScore >= 650 ? 'bg-yellow-400' :
                  creditScore >= 600 ? 'bg-orange-400' : 'bg-red-400'
                }`}
                style={{ width: `${(creditScore / 850) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 max-w-md mx-auto mt-1">
              <span>300</span>
              <span>850</span>
            </div>
          </div>
        </div>

        {/* Customer Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Personal Info</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium  text-black">{customerData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium  text-black">{customerData.CODE_GENDER}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Family Status:</span>
                <span className="font-medium  text-black">{customerData.NAME_FAMILY_STATUS}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Children:</span>
                <span className="font-medium  text-black">{customerData.CNT_CHILDREN}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Education:</span>
                <span className="font-medium text-black">{customerData.NAME_EDUCATION_TYPE}</span>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Financial Info</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Income:</span>
                <span className="font-medium  text-black">₹{customerData.AMT_INCOME_TOTAL?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Credit Amount:</span>
                <span className="font-medium text-black">₹{customerData.AMT_CREDIT?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annuity:</span>
                <span className="font-medium text-black">₹{customerData.AMT_ANNUITY?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Own Car:</span>
                <span className="font-medium text-black">{customerData.FLAG_OWN_CAR}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Own Realty:</span>
                <span className="font-medium text-black">{customerData.FLAG_OWN_REALTY}</span>
              </div>
            </div>
          </div>

          {/* Credit History */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Credit History</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bureau Count:</span>
                <span className="font-medium text-black">{customerData.BUREAU_COUNT}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Previous Apps:</span>
                <span className="font-medium text-black">{customerData.PREVAPP_COUNT}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Credit Cards:</span>
                <span className="font-medium text-black">{customerData.CC_COUNT}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ext Source 1:</span>
                <span className="font-medium text-black">{customerData.EXT_SOURCE_1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ext Source 2:</span>
                <span className="font-medium text-black ">{customerData.EXT_SOURCE_2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;