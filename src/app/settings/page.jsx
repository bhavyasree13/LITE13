'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('account');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);

  useEffect(() => {
    // Simulate loading settings data
    setTimeout(() => {
      setSettings({
        // Account Settings
        accountType: 'premium',
        twoFactorEnabled: true,
        biometricEnabled: false,
        sessionTimeout: 30,
        
        // Notification Settings
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true,
        marketingEmails: false,
        securityAlerts: true,
        scoreUpdates: true,
        applicationUpdates: true,
        
        // Privacy Settings
        dataSharing: false,
        analyticsOptIn: true,
        cookieConsent: true,
        thirdPartySharing: false,
        
        // Display Settings
        theme: 'light',
        language: 'en',
        currency: 'INR',
        timezone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        
        // API Settings
        apiAccess: false,
        webhookUrl: '',
        rateLimitTier: 'standard'
      });

      setApiKeys([
        { id: 1, name: 'Production API', key: 'fins_prod_****_****_1234', created: '2024-08-15', lastUsed: '2024-08-30', status: 'active' },
        { id: 2, name: 'Development API', key: 'fins_dev_****_****_5678', created: '2024-08-01', lastUsed: '2024-08-25', status: 'active' }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const settingsSections = [
    { id: 'account', name: 'Account', icon: '👤', description: 'Security and account preferences' },
    { id: 'notifications', name: 'Notifications', icon: '🔔', description: 'Email, SMS, and push notifications' },
    { id: 'privacy', name: 'Privacy', icon: '🔒', description: 'Data protection and sharing settings' },
    { id: 'display', name: 'Display', icon: '🎨', description: 'Theme, language, and format preferences' },
    { id: 'api', name: 'API Access', icon: '🔧', description: 'Developer tools and integrations' },
    { id: 'billing', name: 'Billing', icon: '💳', description: 'Payment methods and subscription' },
    { id: 'advanced', name: 'Advanced', icon: '⚙️', description: 'Expert settings and data export' }
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = async () => {
    setSaveLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaveLoading(false);
    
    alert('Settings saved successfully! ✅\n\nYour preferences have been updated and will take effect immediately.');
  };

  const generateApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: `API Key ${apiKeys.length + 1}`,
      key: `fins_${Math.random().toString(36).substr(2, 8)}_****_****_${Math.random().toString(36).substr(2, 4)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active'
    };
    setApiKeys([...apiKeys, newKey]);
    setShowApiModal(false);
  };

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
    <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input 
        type="checkbox" 
        checked={enabled} 
        onChange={onChange}
        disabled={disabled}
        className="sr-only peer" 
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-top-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Account <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Settings</span>
          </h1>
          <p className="text-blue-100 text-lg">
            Customize your Finshield experience and privacy preferences
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Settings Categories</h3>
              <nav className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{section.icon}</span>
                      <div>
                        <div className="font-medium">{section.name}</div>
                        <div className={`text-xs ${activeSection === section.id ? 'text-blue-100' : 'text-gray-500'}`}>
                          {section.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Account Settings */}
              {activeSection === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Security</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.twoFactorEnabled}
                          onChange={(e) => handleSettingChange('account', 'twoFactorEnabled', e.target.checked)}
                        />
                      </div>
                      {settings.twoFactorEnabled && (
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-green-800">✅ 2FA is enabled via SMS to +91 98765 43210</p>
                          <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-700">
                            Change phone number →
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">Biometric Login</h4>
                          <p className="text-sm text-gray-600">Use fingerprint or face recognition for login</p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.biometricEnabled}
                          onChange={(e) => handleSettingChange('account', 'biometricEnabled', e.target.checked)}
                        />
                      </div>
                    </div>

                    <div className="border border-gray-200  text-black rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Session Timeout</h4>
                      <select 
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('account', 'sessionTimeout', e.target.value)}
                        className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Communication Channels</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">📧 Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive updates via email</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.emailNotifications}
                            onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">📱 SMS Notifications</p>
                            <p className="text-sm text-gray-600">Critical updates via SMS</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.smsNotifications}
                            onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">🔔 Push Notifications</p>
                            <p className="text-sm text-gray-600">Browser and mobile app notifications</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.pushNotifications}
                            onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Notification Types</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">🛡️ Security Alerts</p>
                            <p className="text-sm text-gray-600">Login attempts, password changes</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.securityAlerts}
                            onChange={(e) => handleSettingChange('notifications', 'securityAlerts', e.target.checked)}
                            disabled={true}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">📊 Credit Score Updates</p>
                            <p className="text-sm text-gray-600">When your credit score changes</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.scoreUpdates}
                            onChange={(e) => handleSettingChange('notifications', 'scoreUpdates', e.target.checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">📋 Application Updates</p>
                            <p className="text-sm text-gray-600">Loan application status changes</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.applicationUpdates}
                            onChange={(e) => handleSettingChange('notifications', 'applicationUpdates', e.target.checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">📢 Marketing Communications</p>
                            <p className="text-sm text-gray-600">Product updates and promotions</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.marketingEmails}
                            onChange={(e) => handleSettingChange('notifications', 'marketingEmails', e.target.checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Data Protection</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                        <span className="mr-2">🛡️</span>
                        Finshield Privacy Shield
                      </h4>
                      <p className="text-sm text-purple-800 mb-4">
                        Your data is automatically protected using advanced synthetic data generation and transformer-based anonymization
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">🟢</span>
                          <span className="text-purple-800">Banksformer Protection Active</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">🟢</span>
                          <span className="text-purple-800">Data Anonymization Enabled</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Data Sharing Controls</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">🔬 Synthetic Data Consent</p>
                            <p className="text-sm text-gray-600">Allow anonymized data for AI model improvement</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.syntheticDataConsent}
                            onChange={(e) => handleSettingChange('privacy', 'syntheticDataConsent', e.target.checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">📊 Analytics Opt-in</p>
                            <p className="text-sm text-gray-600">Help improve our services with usage analytics</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.analyticsOptIn}
                            onChange={(e) => handleSettingChange('privacy', 'analyticsOptIn', e.target.checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">🚫 Third-party Sharing</p>
                            <p className="text-sm text-gray-600">Share data with approved financial partners</p>
                          </div>
                          <ToggleSwitch 
                            enabled={settings.thirdPartySharing}
                            onChange={(e) => handleSettingChange('privacy', 'thirdPartySharing', e.target.checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Data Rights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left hover:bg-blue-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className="text-blue-600 text-xl">📥</span>
                            <div>
                              <p className="font-medium text-blue-900">Download My Data</p>
                              <p className="text-xs text-blue-700">Export all personal data</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-left hover:bg-purple-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className="text-purple-600 text-xl">🔍</span>
                            <div>
                              <p className="font-medium text-purple-900">View Data Usage</p>
                              <p className="text-xs text-purple-700">See how your data is used</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Settings */}
              {activeSection === 'display' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Display Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Appearance</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button className={`p-3 rounded-lg border-2 transition-all ${settings.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                              <div className="text-center">
                                <span className="block text-xl mb-1">☀️</span>
                                <span className="text-sm font-medium">Light</span>
                              </div>
                            </button>
                            <button className={`p-3 rounded-lg border-2 transition-all ${settings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                              <div className="text-center">
                                <span className="block text-xl mb-1">🌙</span>
                                <span className="text-sm font-medium">Dark</span>
                              </div>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                          <select 
                            value={settings.language}
                            onChange={(e) => handleSettingChange('display', 'language', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="en">🇺🇸 English</option>
                            <option value="hi">🇮🇳 हिंदी (Hindi)</option>
                            <option value="mr">🇮🇳 मराठी (Marathi)</option>
                            <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
                            <option value="te">🇮🇳 తెలుగు (Telugu)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Format Preferences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                          <select 
                            value={settings.currency}
                            onChange={(e) => handleSettingChange('display', 'currency', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="INR">₹ Indian Rupee (INR)</option>
                            <option value="USD">$ US Dollar (USD)</option>
                            <option value="EUR">€ Euro (EUR)</option>
                            <option value="GBP">£ British Pound (GBP)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                          <select 
                            value={settings.dateFormat}
                            onChange={(e) => handleSettingChange('display', 'dateFormat', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* API Settings */}
              {activeSection === 'api' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">API Access & Integration</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                      <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                        <span className="mr-2">⚠️</span>
                        Developer Access Required
                      </h4>
                      <p className="text-sm text-orange-800 mb-4">
                        API access requires developer account verification and additional security measures
                      </p>
                      <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                        🔓 Request Developer Access
                      </button>
                    </div>

                    {settings.apiAccess && (
                      <>
                        <div className="border border-gray-200 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900">API Keys</h4>
                            <button 
                              onClick={() => setShowApiModal(true)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                              🔑 Generate New Key
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            {apiKeys.map((key) => (
                              <div key={key.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium text-gray-900">{key.name}</p>
                                  <p className="text-sm text-gray-600 font-mono">{key.key}</p>
                                  <p className="text-xs text-gray-500">Created: {key.created} • Last used: {key.lastUsed}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className={`w-2 h-2 rounded-full ${key.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                  <button className="text-red-600 hover:text-red-700 text-sm">🗑️</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">Webhook Configuration</h4>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                            <input
                              type="url"
                              value={settings.webhookUrl}
                              onChange={(e) => handleSettingChange('api', 'webhookUrl', e.target.value)}
                              placeholder="https://your-app.com/webhook/finshield"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">Receive real-time notifications about credit score changes and application updates</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Advanced Settings */}
              {activeSection === 'advanced' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Data Export & Management</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left hover:bg-blue-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className="text-blue-600 text-xl">📊</span>
                            <div>
                              <p className="font-medium text-blue-900">Export Credit Report</p>
                              <p className="text-xs text-blue-700">Download detailed PDF report</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="bg-green-50 border border-green-200 rounded-lg p-4 text-left hover:bg-green-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className="text-green-600 text-xl">📈</span>
                            <div>
                              <p className="font-medium text-green-900">Export Transaction Data</p>
                              <p className="text-xs text-green-700">CSV format for analysis</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-left hover:bg-purple-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className="text-purple-600 text-xl">🔬</span>
                            <div>
                              <p className="font-medium text-purple-900">View Model Insights</p>
                              <p className="text-xs text-purple-700">See how AI models work</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-left hover:bg-orange-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className="text-orange-600 text-xl">📋</span>
                            <div>
                              <p className="font-medium text-orange-900">Activity Logs</p>
                              <p className="text-xs text-orange-700">Download activity history</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                      <h4 className="font-semibold text-red-900 mb-4 flex items-center">
                        <span className="mr-2">⚠️</span>
                        Danger Zone
                      </h4>
                      <div className="space-y-4">
                        <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                          🔄 Reset All Settings
                        </button>
                        <button 
                          onClick={() => setShowDeleteModal(true)}
                          className="w-full bg-red-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-800 transition-colors"
                        >
                          🗑️ Delete Account Permanently
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Reset Changes
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    disabled={saveLoading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg disabled:opacity-50"
                  >
                    {saveLoading ? '⏳ Saving Settings...' : '💾 Save All Settings'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-red-900">Delete Account</h3>
                <p className="text-sm text-gray-600 mt-2">This action cannot be undone</p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-900 mb-2">This will permanently delete:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• All personal information and documents</li>
                  <li>• Credit history and applications</li>
                  <li>• API keys and integrations</li>
                  <li>• Saved preferences and settings</li>
                </ul>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors">
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Key Generation Modal */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Generate New API Key</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
                  <input
                    type="text"
                    placeholder="My Application API"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Read credit scores</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Submit applications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Access synthetic data</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowApiModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={generateApiKey}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  🔑 Generate Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;