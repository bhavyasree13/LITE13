'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SecurityPage = () => {
  const [securityData, setSecurityData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Simulate loading security data
    setTimeout(() => {
      setSecurityData({
        // Security Overview
        securityScore: 92,
        lastSecurityCheck: '2024-08-30T10:30:00Z',
        overallStatus: 'excellent',
        
        // Account Security
        twoFactorEnabled: true,
        biometricEnabled: true,
        passwordLastChanged: '2024-07-15T14:20:00Z',
        passwordStrength: 'strong',
        recoveryEmailVerified: true,
        recoveryPhoneVerified: true,
        
        // Login Security
        suspiciousLoginBlocked: 3,
        failedLoginAttempts: 0,
        accountLockouts: 0,
        lastPasswordChange: '2024-07-15',
        
        // Device Management
        trustedDevices: [
          {
            id: 1,
            name: 'iPhone 14 Pro',
            type: 'mobile',
            os: 'iOS 17.0',
            location: 'Mumbai, India',
            lastSeen: '2024-08-31T09:15:00Z',
            ipAddress: '103.21.58.***',
            status: 'active',
            trusted: true
          },
          {
            id: 2,
            name: 'MacBook Pro',
            type: 'desktop',
            os: 'macOS 14.0',
            location: 'Mumbai, India',
            lastSeen: '2024-08-30T18:45:00Z',
            ipAddress: '103.21.58.***',
            status: 'active',
            trusted: true
          },
          {
            id: 3,
            name: 'Chrome on Windows',
            type: 'browser',
            os: 'Windows 11',
            location: 'Delhi, India',
            lastSeen: '2024-08-28T11:22:00Z',
            ipAddress: '157.49.123.***',
            status: 'inactive',
            trusted: false
          }
        ],
        
        // Security Events
        recentEvents: [
          {
            id: 1,
            type: 'login_success',
            description: 'Successful login from iPhone',
            timestamp: '2024-08-31T09:15:00Z',
            location: 'Mumbai, India',
            severity: 'info'
          },
          {
            id: 2,
            type: 'password_change',
            description: 'Password changed successfully',
            timestamp: '2024-08-30T14:20:00Z',
            location: 'Mumbai, India',
            severity: 'info'
          },
          {
            id: 3,
            type: 'suspicious_login_blocked',
            description: 'Blocked login attempt from unknown device',
            timestamp: '2024-08-29T02:33:00Z',
            location: 'Bangalore, India',
            severity: 'warning'
          },
          {
            id: 4,
            type: '2fa_enabled',
            description: 'Two-factor authentication enabled',
            timestamp: '2024-08-25T16:10:00Z',
            location: 'Mumbai, India',
            severity: 'success'
          }
        ],
        
        // Privacy Settings
        dataEncryption: 'AES-256',
        syntheticDataProtection: true,
        banksformerActive: true,
        privacyScore: 98,
        
        // Alerts & Monitoring
        securityAlerts: true,
        loginNotifications: true,
        unusualActivityDetection: true,
        locationBasedSecurity: true
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const securityTabs = [
    { id: 'overview', name: 'Security Overview', icon: '🛡️' },
    { id: 'authentication', name: 'Authentication', icon: '🔐' },
    { id: 'devices', name: 'Devices & Sessions', icon: '📱' }
  ];

  const getSecurityScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSecurityScoreBg = (score) => {
    if (score >= 90) return 'from-green-600 to-green-700';
    if (score >= 75) return 'from-blue-600 to-blue-700';
    if (score >= 60) return 'from-orange-600 to-orange-700';
    return 'from-red-600 to-red-700';
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'login_success': return '✅';
      case 'login_failed': return '❌';
      case 'password_change': return '🔑';
      case 'suspicious_login_blocked': return '🚫';
      case '2fa_enabled': return '🔐';
      case 'device_added': return '📱';
      case 'privacy_update': return '🛡️';
      default: return '📋';
    }
  };

  const getEventSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return 'bg-green-50 text-green-800 border-green-200';
      case 'warning': return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'error': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-top-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading security dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Security Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Security <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-blue-100 text-lg">
               Advanced protection • Banking-grade security
              </p>
            </div>

            {/* Security Score */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-lg mb-3">Security Score</h3>
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="#fbbf24"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - securityData.securityScore / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-300">{securityData.securityScore}</span>
                </div>
              </div>
              <p className="text-green-300 font-medium">Excellent Protection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="flex overflow-x-auto">
            {securityTabs.map((tab) => (
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

        {/* Security Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-green-600 text-xl">🛡️</span>
                </div>
                <h4 className="font-bold text-gray-900">Account Protection</h4>
                <p className="text-2xl font-bold text-green-600">Secured</p>
                <p className="text-sm text-gray-500">2FA + Biometric</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-blue-600 text-xl">🔐</span>
                </div>
                <h4 className="font-bold text-gray-900">Data Encryption</h4>
                <p className="text-2xl font-bold text-blue-600">AES-256</p>
                <p className="text-sm text-gray-500">Bank-grade encryption</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-orange-600 text-xl">📊</span>
                </div>
                <h4 className="font-bold text-gray-900">Threat Detection</h4>
                <p className="text-2xl font-bold text-orange-600">{securityData.suspiciousLoginBlocked}</p>
                <p className="text-sm text-gray-500">Blocked attempts</p>
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">💡</span>
                Security Recommendations
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-xl">✅</span>
                    <div>
                      <p className="font-medium text-green-900">Two-Factor Authentication Enabled</p>
                      <p className="text-sm text-green-700">Your account has an extra layer of security</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 text-xl">ℹ️</span>
                    <div>
                      <p className="font-medium text-blue-900">Strong Password Active</p>
                      <p className="text-sm text-blue-700">Your password meets all security requirements</p>
                    </div>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">Last changed: {securityData.lastPasswordChange}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-600 text-xl">⚠️</span>
                    <div>
                      <p className="font-medium text-orange-900">Review Trusted Devices</p>
                      <p className="text-sm text-orange-700">You have {securityData.trustedDevices.length} devices with access</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('devices')}
                    className="text-orange-600 font-medium hover:text-orange-700"
                  >
                    Review →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Authentication Tab */}
        {activeTab === 'authentication' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication Methods</h2>
              
              <div className="space-y-6">
                {/* Password Section */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔑</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Password</h4>
                        <p className="text-sm text-gray-600">Last changed {formatTimestamp(securityData.passwordLastChanged)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                        Strong Password
                      </span>
                      <button 
                        onClick={() => setShowPasswordModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 mb-2">Password Strength Analysis</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>12+ characters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>Mixed case</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>Numbers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>Special chars</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">SMS verification via +91 98765 ***10</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                        ✅ Enabled
                      </span>
                      <button 
                        onClick={() => setShow2FAModal(true)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      🛡️ 2FA adds an extra layer of security by requiring a verification code sent to your phone when logging in from a new device.
                    </p>
                  </div>
                </div>

                {/* Biometric Authentication */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">👆</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Biometric Login</h4>
                        <p className="text-sm text-gray-600">Fingerprint and Face ID support</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                        ✅ Available
                      </span>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                        Set Up
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <span className="text-2xl mb-2 block">👆</span>
                      <p className="font-medium">Fingerprint</p>
                      <p className="text-xs text-gray-600">Not configured</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <span className="text-2xl mb-2 block">🫥</span>
                      <p className="font-medium">Face ID</p>
                      <p className="text-xs text-gray-600">Not configured</p>
                    </div>
                  </div>
                </div>

                {/* Recovery Options */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🆘</span>
                    Account Recovery
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Recovery Email</p>
                        <p className="text-sm text-gray-600">j***@example.com</p>
                      </div>
                      <span className="text-green-600">✅</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Recovery Phone</p>
                        <p className="text-sm text-gray-600">+91 98765 ***10</p>
                      </div>
                      <span className="text-green-600">✅</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Devices & Sessions Tab */}
        {activeTab === 'devices' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Trusted Devices & Sessions</h2>
                <span className="text-sm text-gray-500">
                  {securityData.trustedDevices.filter(d => d.status === 'active').length} active sessions
                </span>
              </div>
              
              <div className="space-y-4">
                {securityData.trustedDevices.map((device) => (
                  <div key={device.id} className={`border rounded-xl p-6 transition-all duration-300 hover:shadow-md ${
                    device.status === 'active' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          device.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <span className="text-xl">
                            {device.type === 'mobile' ? '📱' : device.type === 'desktop' ? '💻' : '🌐'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <span>{device.name}</span>
                            {device.status === 'active' && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                          </h4>
                          <p className="text-sm text-gray-600">{device.os} • {device.location}</p>
                          <p className="text-xs text-gray-500">IP: {device.ipAddress}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          {device.trusted && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                              Trusted
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            device.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {device.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Last seen: {formatTimestamp(device.lastSeen)}
                        </p>
                        <button 
                          onClick={() => {
                            setSelectedDevice(device);
                            setShowDeviceModal(true);
                          }}
                          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700"
                        >
                          Manage →
                        </button>
                      </div>
                    </div>
                    
                    {device.status === 'active' && (
                      <div className="border-t border-green-200 pt-4 mt-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-green-700">
                            🟢 Currently active session
                          </p>
                          <button className="text-red-600 text-sm font-medium hover:text-red-700">
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors">
                  🚪 Sign Out All Other Devices
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityPage;