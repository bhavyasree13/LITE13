'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const MyProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [creditHistory, setCreditHistory] = useState([]);
  const [documentStatus, setDocumentStatus] = useState({});

  useEffect(() => {
    // Simulate loading user profile data
    setTimeout(() => {
      const userData = {
        id: "FIN001234",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+91 98765 43210",
        dateOfBirth: "1990-05-15",
        gender: "Male",
        nationality: "Indian",
        
        // Address
        address: "123 MG Road, Koramangala",
        address2: "Near Forum Mall",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560034",
        
        // Professional
        occupation: "Software Engineer",
        employer: "Tech Solutions Pvt Ltd",
        workExperience: "8 years",
        annualIncome: "1200000",
        
        // Banking
        accountType: "Premium",
        memberSince: "2024-01-15",
        kycStatus: "Verified",
        creditScore: 745,
        riskCategory: "Low Risk",
        
        // Preferences
        language: "English",
        communicationPreference: "Email",
        marketingConsent: true,
        twoFactorEnabled: true,
        
        // Profile completion
        profileCompletion: 85,
        lastUpdated: "2024-08-30"
      };
      
      setUser(userData);
      setEditData(userData);
      
      setCreditHistory([
        { date: '2024-08', score: 745, change: +15, event: 'Payment history improved' },
        { date: '2024-07', score: 730, change: +5, event: 'Credit utilization decreased' },
        { date: '2024-06', score: 725, change: -10, event: 'New credit inquiry' },
        { date: '2024-05', score: 735, change: +20, event: 'Old debt paid off' },
        { date: '2024-04', score: 715, change: +25, event: 'Account opened' }
      ]);

      setDocumentStatus({
        aadhaar: { status: 'verified', uploadDate: '2024-01-15', expires: null },
        pan: { status: 'verified', uploadDate: '2024-01-15', expires: null },
        income: { status: 'pending', uploadDate: '2024-08-30', expires: '2024-12-30' },
        address: { status: 'verified', uploadDate: '2024-01-16', expires: '2025-01-16' },
        bankStatement: { status: 'expired', uploadDate: '2024-05-15', expires: '2024-08-15' }
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'financial', name: 'Financial Details', icon: '💰' },
    { id: 'documents', name: 'Documents', icon: '📄' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({...user});
  };

  const handleSave = async () => {
    setSaveLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser({...editData, lastUpdated: new Date().toISOString().split('T')[0]});
    setIsEditing(false);
    setSaveLoading(false);
    
    alert('Profile updated successfully! ✅\n\nYour changes have been saved and will be reflected in future credit assessments.');
  };

  const handleCancel = () => {
    setEditData({...user});
    setIsEditing(false);
  };

  const getDocumentStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">✅ Verified</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">⏳ Pending</span>;
      case 'expired':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">⚠️ Expired</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">❌ Not Uploaded</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-top-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {user?.firstName} {user?.lastName}
                </span>
              </h1>
              <p className="text-blue-100 text-lg mb-4">
                {user?.occupation} • Member since {new Date(user?.memberSince).toLocaleDateString()}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
                  <span className="text-green-300">📊</span>
                  <span className="text-sm font-medium">Score: {user?.creditScore}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
                  <span className="text-blue-300">🛡️</span>
                  <span className="text-sm font-medium">{user?.kycStatus}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
                  <span className="text-purple-300">🏆</span>
                  <span className="text-sm font-medium">{user?.accountType} Member</span>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-48">
              <h4 className="font-semibold mb-2">Profile Completion</h4>
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#fbbf24"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - user?.profileCompletion / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-orange-300">{user?.profileCompletion}%</span>
                </div>
              </div>
              <p className="text-sm text-blue-200">15% to complete</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      ✏️ Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saveLoading}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {saveLoading ? '⏳ Saving...' : '💾 Save Changes'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.firstName}
                          onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.lastName}
                          onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.dateOfBirth}
                          onChange={(e) => setEditData({...editData, dateOfBirth: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                          {new Date(user?.dateOfBirth).toLocaleDateString()} 
                          <span className="text-gray-500 ml-2">
                            (Age: {Math.floor((new Date() - new Date(user?.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))})
                          </span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                      {isEditing ? (
                        <select
                          value={editData.gender}
                          onChange={(e) => setEditData({...editData, gender: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.gender}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality</label>
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.nationality}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Customer ID</label>
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl font-mono">{user?.id}</p>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.address}
                          onChange={(e) => setEditData({...editData, address: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.city}
                          onChange={(e) => setEditData({...editData, city: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.pincode}
                          onChange={(e) => setEditData({...editData, pincode: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user?.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Details Tab */}
            {activeTab === 'financial' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Profile</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                      <span className="mr-2">💼</span>
                      Employment Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-blue-600 font-medium">OCCUPATION</p>
                        <p className="text-gray-900 font-semibold">{user?.occupation}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">EMPLOYER</p>
                        <p className="text-gray-900">{user?.employer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">EXPERIENCE</p>
                        <p className="text-gray-900">{user?.workExperience}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="font-bold text-green-900 mb-4 flex items-center">
                      <span className="mr-2">💰</span>
                      Income Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-green-600 font-medium">ANNUAL INCOME</p>
                        <p className="text-gray-900 font-semibold">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(user?.annualIncome)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium">MONTHLY INCOME</p>
                        <p className="text-gray-900">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(user?.annualIncome / 12)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium">INCOME SOURCE</p>
                        <p className="text-gray-900">Salary</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit History Chart */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-purple-900 mb-4 flex items-center">
                    <span className="mr-2">📈</span>
                    Credit Score History
                  </h4>
                  <div className="space-y-3">
                    {creditHistory.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className={`text-lg ${entry.change > 0 ? 'text-green-500' : entry.change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                            {entry.change > 0 ? '📈' : entry.change < 0 ? '📉' : '➡️'}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">{entry.date}</p>
                            <p className="text-xs text-gray-600">{entry.event}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{entry.score}</p>
                          <p className={`text-xs font-medium ${entry.change > 0 ? 'text-green-600' : entry.change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {entry.change > 0 ? '+' : ''}{entry.change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Verification</h2>
                
                <div className="space-y-6">
                  {Object.entries(documentStatus).map(([docType, status]) => (
                    <div key={docType} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {docType === 'aadhaar' ? '🆔' : 
                             docType === 'pan' ? '📋' :
                             docType === 'income' ? '💰' :
                             docType === 'address' ? '🏠' : '🏦'}
                          </span>
                          <div>
                            <h4 className="font-semibold text-gray-900 capitalize">
                              {docType === 'aadhaar' ? 'Aadhaar Card' :
                               docType === 'pan' ? 'PAN Card' :
                               docType === 'income' ? 'Income Proof' :
                               docType === 'address' ? 'Address Proof' : 'Bank Statement'} Verification
                            </h4>
                            <p className="text-sm text-gray-600">
                              Uploaded: {new Date(status.uploadDate).toLocaleDateString()}
                              {status.expires && (
                                <span className="ml-2">• Expires: {new Date(status.expires).toLocaleDateString()}</span>
                              )}
                            </p>
                          </div>
                        </div>
                        {getDocumentStatusBadge(status.status)}
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                          📄 View Document
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">
                          🔄 Re-upload
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upload New Document */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">📤 Upload Additional Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="bg-white border-2 border-dashed border-blue-300 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">📄</span>
                        <p className="text-sm font-medium text-blue-700">Upload Salary Slip</p>
                      </div>
                    </button>
                    <button className="bg-white border-2 border-dashed border-blue-300 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">🏦</span>
                        <p className="text-sm font-medium text-blue-700">Upload Bank Statement</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  {/* Password Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">Password</h4>
                        <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        🔐 Change Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <span className="mr-2">📱</span>
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-gray-600">
                          {user?.twoFactorEnabled ? 'Enabled via SMS to ' + user?.phone : 'Add an extra layer of security'}
                        </p>
                      </div>
                      <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        user?.twoFactorEnabled 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}>
                        {user?.twoFactorEnabled ? '❌ Disable' : '✅ Enable'}
                      </button>
                    </div>
                  </div>

                  {/* Login Sessions */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Login Sessions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-3">
                          <span className="text-green-600">💻</span>
                          <div>
                            <p className="font-medium text-gray-900">Current Session</p>
                            <p className="text-xs text-gray-600">Chrome on Windows • Hyderabad, India</p>
                          </div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Active Now</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-600">📱</span>
                          <div>
                            <p className="font-medium text-gray-900">Mobile App</p>
                            <p className="text-xs text-gray-600">iPhone • Mumbai, India</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">2 days ago</span>
                      </div>
                    </div>
                    
                    <button className="mt-4 text-red-600 text-sm font-medium hover:text-red-700">
                      🚪 Sign out all other sessions
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Preferences</h2>
                
                <div className="space-y-6">
                  {/* Communication Preferences */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Communication Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates about your applications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">SMS Alerts</p>
                          <p className="text-sm text-gray-600">Important security and transaction alerts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Marketing Communications</p>
                          <p className="text-sm text-gray-600">Product updates and promotional offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={user?.marketingConsent} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Language & Region */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Language & Region</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="en">English</option>
                          <option value="hi">हिंदी (Hindi)</option>
                          <option value="mr">मराठी (Marathi)</option>
                          <option value="ta">தமிழ் (Tamil)</option>
                          <option value="te">తెలుగు (Telugu)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency Display</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="INR">₹ Indian Rupee (INR)</option>
                          <option value="USD">$ US Dollar (USD)</option>
                          <option value="EUR">€ Euro (EUR)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Data & Privacy */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Data & Privacy Controls</h4>
                    <div className="space-y-4">
                      <button className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 text-left hover:bg-blue-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-blue-900">📥 Download My Data</p>
                            <p className="text-sm text-blue-700">Export all your personal data in JSON format</p>
                          </div>
                          <span className="text-blue-600">→</span>
                        </div>
                      </button>
                      
                      <button className="w-full bg-purple-50 border border-purple-200 rounded-lg p-4 text-left hover:bg-purple-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-purple-900">🔬 View Synthetic Data Usage</p>
                            <p className="text-sm text-purple-700">See how your data is protected through AI anonymization</p>
                          </div>
                          <span className="text-purple-600">→</span>
                        </div>
                      </button>
                      
                      <button className="w-full bg-red-50 border border-red-200 rounded-lg p-4 text-left hover:bg-red-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-red-900">🗑️ Delete Account</p>
                            <p className="text-sm text-red-700">Permanently remove your account and all data</p>
                          </div>
                          <span className="text-red-600">→</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Profile Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profile Completion</span>
                  <span className="font-semibold text-blue-600">{user?.profileCompletion}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${user?.profileCompletion}%` }}
                  ></div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-sm text-orange-800 font-medium">💡 Complete your profile</p>
                  <p className="text-xs text-orange-700 mt-1">Add income proof to increase your credit limit by up to 40%</p>
                </div>
              </div>
            </div>

            {/* Credit Score Card */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Current Credit Score
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold mb-2">{user?.creditScore}</div>
                <div className="text-green-200 text-sm">Excellent Range</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-semibold mb-2">Score Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Payment History</span>
                    <span className="text-green-300">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credit Utilization</span>
                    <span className="text-green-300">Very Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credit Age</span>
                    <span className="text-blue-300">Good</span>
                  </div>
                </div>
              </div>
              
              <Link href="/score" className="block mt-4 text-center bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                View Detailed Analysis →
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">📈</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Credit score updated</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">✅</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Document verified</p>
                    <p className="text-xs text-gray-600">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-600">👤</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Profile updated</p>
                    <p className="text-xs text-gray-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link href="/apply" className="block w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors text-center">
                  📋 Apply for New Credit
                </Link>
                
                <Link href="/documents/upload" className="block w-full bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors text-center">
                  📤 Upload Documents
                </Link>
                
                <Link href="/support" className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center">
                  💬 Contact Support
                </Link>
              </div>
            </div>

            {/* Privacy Shield */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <span className="mr-2">🛡️</span>
                Privacy Shield Active
              </h3>
              <p className="text-sm text-purple-100 mb-4">
                Your data is protected using advanced synthetic data generation and transformer-based anonymization
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Data Anonymization</span>
                  <span className="text-green-300">🟢 Active</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span>Synthetic Training</span>
                  <span className="text-green-300">🟢 Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;