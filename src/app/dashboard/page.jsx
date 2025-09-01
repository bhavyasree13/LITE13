'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [creditScore, setCreditScore] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUser({
        name: 'Aarvi',
        userId: 'FIN001234',
        email: 'john.doe@example.com',
        joinDate: '2024-01-15',
        membershipType: 'Premium',
        lastLogin: new Date().toISOString()
      });

      setCreditScore({
        score: 745,
        category: 'Good',
        lastUpdated: '2024-08-30',
        trend: 'up',
        factors: [
          { name: 'Payment History', impact: 85, positive: true },
          { name: 'Credit Utilization', impact: 72, positive: true },
          { name: 'Length of History', impact: 68, positive: true },
          { name: 'Credit Mix', impact: 45, positive: false },
          { name: 'New Credit', impact: 55, positive: false }
        ]
      });

      setApplications([
        {
          id: 'LOAN-2024-001',
          type: 'Personal Loan',
          amount: '₹2,50,000',
          status: 'approved',
          submittedDate: '2024-08-28',
          aiScore: 0.82,
          explanation: 'Strong income-to-debt ratio and stable employment'
        },
        {
          id: 'LOAN-2024-002',
          type: 'Credit Card',
          amount: '₹1,00,000',
          status: 'processing',
          submittedDate: '2024-08-30',
          aiScore: 0.75,
          explanation: 'Good credit history, processing external verifications'
        },
        {
          id: 'LOAN-2024-003',
          type: 'Home Loan',
          amount: '₹25,00,000',
          status: 'pending',
          submittedDate: '2024-08-31',
          aiScore: null,
          explanation: 'Application received, awaiting initial review'
        }
      ]);

      setNotifications([
        {
          id: 1,
          title: 'Credit Score Updated',
          message: 'Your credit score increased by 15 points to 745',
          type: 'success',
          time: '2 hours ago',
          unread: true
        },
        {
          id: 2,
          title: 'Application Status Update',
          message: 'Personal loan LOAN-2024-001 has been approved',
          type: 'info',
          time: '1 day ago',
          unread: true
        },
        {
          id: 3,
          title: 'Security Alert',
          message: 'New device login detected from Mumbai',
          type: 'warning',
          time: '2 days ago',
          unread: false
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const quickActions = [
    {
      title: 'Apply for Credit',
      description: 'Start new loan application',
      icon: '📋',
      href: '/apply',
      color: 'from-blue-600 to-blue-500',
      popular: true
    },
    {
      title: 'Check Credit Score',
      description: 'View detailed  analysis',
      icon: '📈',
      href: '/score',
      color: 'from-pink-600 to-orange-500'
    },
    {
      title: 'Upload Documents',
      description: 'Add verification documents',
      icon: '📄',
      href: '/documents',
      color: 'from-purple-600 to-purple-400'
    },
    {
      title: 'Payment History',
      description: 'View transaction records',
      icon: '💰',
      href: '/payments',
      color: 'from-pink-600 to-red-300'
    }
  ];

  const recentActivity = [
    { action: 'Credit score updated', time: '2 hours ago', icon: '📈', color: 'text-green-600' },
    { action: 'Document uploaded', time: '1 day ago', icon: '📄', color: 'text-blue-600' },
    { action: 'Application submitted', time: '3 days ago', icon: '📋', color: 'text-purple-600' },
    { action: 'Profile updated', time: '1 week ago', icon: '👤', color: 'text-gray-600' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-top-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">{user?.name}</span>! 👋
              </h1>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-lg">🏆</span>
              <div className="text-sm">
                <div className="font-semibold text-orange-300">{user?.membershipType} Member</div>
                <div className="text-blue-200">ID: {user?.userId}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Credit Score Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Your Credit Score</h2>             
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{creditScore?.score}</div>
                    <div className="text-sm text-blue-100 flex items-center">
                      <span className={`mr-1 ${creditScore?.trend === 'up' ? 'text-green-300' : 'text-red-300'}`}>
                        {creditScore?.trend === 'up' ? '↗️' : '↘️'}
                      </span>
                      {creditScore?.category}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link 
                    key={index}
                    href={action.href}
                    className="relative group bg-gradient-to-r p-6 rounded-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.color} transition-opacity group-hover:opacity-90`}></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {action.icon}
                        </span>
                        {action.popular && (
                          <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                <Link href="/applications" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View all →
                </Link>
              </div>
              
              <div className="space-y-4">
                {applications.map((app, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          app.status === 'approved' ? 'bg-green-100 text-green-600' :
                          app.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {app.status === 'approved' ? '✅' : 
                           app.status === 'processing' ? '⏳' : '📋'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{app.type}</h3>
                          <p className="text-sm text-gray-500">ID: {app.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{app.amount}</div>
                        <div className={`text-sm font-medium ${
                          app.status === 'approved' ? 'text-green-600' :
                          app.status === 'processing' ? 'text-blue-600' :
                          'text-orange-600'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Submitted: {app.submittedDate}</span>
                      {app.aiScore && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500"> Score:</span>
                          <span className={`font-semibold ${app.aiScore > 0.8 ? 'text-green-600' : app.aiScore > 0.6 ? 'text-blue-600' : 'text-orange-600'}`}>
                            {(app.aiScore * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {app.explanation && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700"> Analysis:</span> {app.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Notifications</h3>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications.filter(n => n.unread).length}
                </span>
              </div>
              
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notif, index) => (
                  <div key={index} className={`p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-50 ${
                    notif.unread ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <span className={`text-lg ${
                        notif.type === 'success' ? 'text-green-500' :
                        notif.type === 'warning' ? 'text-orange-500' :
                        'text-blue-500'
                      }`}>
                        {notif.type === 'success' ? '✅' :
                         notif.type === 'warning' ? '⚠️' : 'ℹ️'}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{notif.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                        <span className="text-xs text-gray-400 mt-1 block">{notif.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/notifications" className="block text-center text-blue-600 hover:text-blue-700 font-medium text-sm mt-4">
                View all notifications
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <span className={`text-lg ${activity.color}`}>{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Widget */}
            <div className="bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Need Help?</h3>
              <p className="text-sm text-orange-100 mb-4">
                Our human experts are available 24/7
              </p>
              <div className="space-y-2">
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg font-medium transition-colors">
                  💬 Start Live Chat
                </button>
                <Link href="/support" className="block w-full bg-white text-orange-600 hover:bg-orange-50 py-2 px-4 rounded-lg font-medium transition-colors text-center">
                  📚 Browse Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics & Analytics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
            <h4 className="font-bold text-gray-900">Credit Utilization</h4>
            <p className="text-2xl font-bold text-blue-600">23%</p>
            <p className="text-sm text-gray-500">Optimal range</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-green-600 text-xl">💰</span>
            </div>
            <h4 className="font-bold text-gray-900">Total Credit Limit</h4>
            <p className="text-2xl font-bold text-green-600">₹8.5L</p>
            <p className="text-sm text-gray-500">Across all accounts</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-purple-600 text-xl">📈</span>
            </div>
            <h4 className="font-bold text-gray-900">Payment History</h4>
            <p className="text-2xl font-bold text-purple-600">100%</p>
            <p className="text-sm text-gray-500">On-time payments</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-orange-600 text-xl">🎯</span>
            </div>
            <h4 className="font-bold text-gray-900">Risk Category</h4>
            <p className="text-2xl font-bold text-orange-600">Low</p>
          </div>
        </div>

        {/* Financial Health Insights */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
            <h2 className="text-xl font-bold mb-1 flex items-center">
              <span className="mr-2">🏥</span>
              Financial Health Checkup
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="text-3xl mb-2">💪</div>
                <h4 className="font-semibold text-green-800 mb-1">Strengths</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Excellent payment history</li>
                  <li>✓ Low credit utilization</li>
                  <li>✓ Stable employment</li>
                </ul>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-orange-50 border border-orange-200">
                <div className="text-3xl mb-2">⚠️</div>
                <h4 className="font-semibold text-orange-800 mb-1">Areas to Watch</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Limited credit mix</li>
                  <li>• Recent credit inquiries</li>
                  <li>• Consider building savings</li>
                </ul>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-blue-800 mb-1">Recommendations</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>→ Apply for secured credit card</li>
                  <li>→ Set up automated payments</li>
                  <li>→ Monitor credit regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Center */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            📚 Financial Education Center
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enhance your financial journey with trusted guidance
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎓</div>
              <h3 className="font-bold text-gray-900 mb-2">Credit Score Basics</h3>
              <p className="text-sm text-gray-600 mb-3">Learn how your credit score shapes financial opportunities</p>
              <span className="text-blue-600 text-sm font-medium">5 min read →</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="font-bold text-gray-900 mb-2">Privacy Protection</h3>
              <p className="text-sm text-gray-600 mb-3">How synthetic data keeps your information secure</p>
              <span className="text-blue-600 text-sm font-medium">3 min read →</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">💡</div>
              <h3 className="font-bold text-gray-900 mb-2">Financial Tips</h3>
              <p className="text-sm text-gray-600 mb-3">Practical steps to build stronger credit and secure your future</p>
              <span className="text-blue-600 text-sm font-medium">7 min read →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;