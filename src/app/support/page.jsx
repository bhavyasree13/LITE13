'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  const supportCategories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 156 },
    { id: 'account', name: 'Account & Login', icon: '👤', count: 32 },
    { id: 'credit', name: 'Credit Scoring', icon: '📊', count: 45 },
    { id: 'applications', name: 'Loan Applications', icon: '📋', count: 28 },
    { id: 'privacy', name: 'Privacy & Security', icon: '🔒', count: 19 },
    { id: 'technical', name: 'Technical Issues', icon: '⚙️', count: 22 },
    { id: 'billing', name: 'Billing & Payments', icon: '💳', count: 10 }
  ];

  const faqData = [
    {
      category: 'credit',
      question: 'How is your credit score calculated?',
      answer: 'We analyze multiple factors, including your credit history, payment patterns, and financial behavior, to provide insights into your score.',
      popular: true
    },
    {
      category: 'privacy',
      question: 'How is my personal data protected?',
      answer: 'We use advanced synthetic data generation (Banksformer architecture) to ensure your personal information never leaves our secure servers. All processing is done with privacy-preserving techniques that meet banking-grade security standards.',
      popular: true
    },
    {
      category: 'credit',
      question: 'What factors affect my credit score?',
      answer: 'Your credit score is influenced by income-to-loan ratio, employment stability, payment history, asset ownership, education level, and alternative financial behavior.',
      popular: true
    },
    {
      category: 'applications',
      question: 'How long does loan approval take?',
      answer: 'Most applications are processed within 15 minutes using our real-time AI scoring. Complex cases may require additional verification and take 24-48 hours. You\'ll receive instant updates via SMS and email.',
      popular: false
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your registered email or phone number, and follow the OTP verification process. For security, password resets require multi-factor authentication.',
      popular: false
    },
    {
      category: 'technical',
      question: 'Why is my application not loading?',
      answer: 'Clear your browser cache, ensure you have a stable internet connection, and try using the latest version of Chrome, Firefox, or Safari. If issues persist, contact our technical support team.',
      popular: false
    },
    {
      category: 'billing',
      question: 'What are the fees for using Finshield?',
      answer: 'Account creation and credit score checks are free. We charge a small processing fee only when you successfully receive a loan through our platform. No hidden charges or subscription fees.',
      popular: false
    },
    {
      category: 'privacy',
      question: 'Can I delete my account and data?',
      answer: 'Yes, you have full control over your data. You can request account deletion from Settings > Privacy. We will permanently delete your personal data within 30 days while maintaining anonymized usage statistics for model improvement.',
      popular: false
    }
  ];

  const contactMethods = [
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our human agents',
      icon: '💬',
      action: 'Start Chat',
      available: '24/7',
      responseTime: 'Instant',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our customer service team',
      icon: '📞',
      action: 'Call +91 1800-123-FINS',
      available: '9 AM - 9 PM IST',
      responseTime: 'Immediate',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Email Support',
      description: 'Send detailed queries and receive comprehensive responses',
      icon: '📧',
      action: 'Email support@finshield.com',
      available: '24/7',
      responseTime: '< 4 hours',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Video Call',
      description: 'Schedule a video consultation with our experts',
      icon: '📹',
      action: 'Schedule Call',
      available: 'Mon-Fri 10 AM - 6 PM',
      responseTime: 'Same day',
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  const filteredFAQs = faqData.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const popularFAQs = faqData.filter(faq => faq.popular);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Simulate ticket creation
    const ticketId = 'FINS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    alert(`Support Ticket Created Successfully!
    
🎫 Ticket ID: ${ticketId}
📧 Confirmation sent to your email
⏱️ Expected response: Within 4 hours
    
You can track your ticket status in the dashboard.`);
    
    setTicketData({ subject: '', category: '', priority: 'medium', description: '' });
    setIsTicketFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How can we <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">help you</span>?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get instant support for your Finshield account and credit applications.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or ask a question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500/30 text-lg"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">99.9%</div>
                <div className="text-sm text-blue-200">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">&lt; 2min</div>
                <div className="text-sm text-blue-200">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">24/7</div>
                <div className="text-sm text-blue-200">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">50K+</div>
                <div className="text-sm text-blue-200">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Preferred Support Channel</h2>
          <p className="text-lg text-gray-600">Our expert team is ready to assist you through multiple channels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Available:</span>
                    <span className="font-medium text-gray-700">{method.available}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Response:</span>
                    <span className="font-medium text-green-600">{method.responseTime}</span>
                  </div>
                </div>

                <button className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-200 ${method.color}`}>
                  {method.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popular FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer group">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">❓</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {faq.answer.substring(0, 120)}...
                    </p>
                    <span className="text-blue-600 text-sm font-medium mt-2 inline-block">Read more →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories & FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Category</h3>
              <div className="space-y-2">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Create Ticket Button */}
              <button
                onClick={() => setIsTicketFormOpen(true)}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                🎫 Create Support Ticket
              </button>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Help Articles' : 
                   supportCategories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredFAQs.length} articles found
                </span>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <details key={index} className="group border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <div className="flex items-center space-x-3">
                        {faq.popular && <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">Popular</span>}
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                    </summary>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      <div className="mt-4 flex items-center space-x-4">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          👍 Helpful (23)
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          👎 Not helpful (2)
                        </button>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          📤 Share
                        </button>
                      </div>
                    </div>
                  </details>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or browse different categories</p>
                  <button
                    onClick={() => setIsTicketFormOpen(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Ask Our Support Team
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔧 System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-800">API Services</span>
              </div>
              <p className="text-sm text-green-600">All systems operational</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-800">Credit Models</span>
              </div>
              <p className="text-sm text-green-600">Running with default system settings</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-800">Database</span>
              </div>
              <p className="text-sm text-green-600">Fully operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Ticket Modal */}
      {isTicketFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Create Support Ticket</h2>
                <button
                  onClick={() => setIsTicketFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleTicketSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketData.subject}
                    onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={ticketData.category}
                    onChange={(e) => setTicketData({...ticketData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="account">Account & Login Issues</option>
                    <option value="credit">Credit Scoring Questions</option>
                    <option value="applications">Loan Application Help</option>
                    <option value="technical">Technical Problems</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="privacy">Privacy & Security</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setTicketData({...ticketData, priority})}
                      className={`py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                        ticketData.priority === priority
                          ? priority === 'high' ? 'bg-red-600 text-white' 
                            : priority === 'medium' ? 'bg-orange-600 text-white'
                            : 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={ticketData.description}
                  onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and what you expected to happen."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsTicketFormOpen(false)}
                  className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                >
                  🚀 Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emergency Support Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-3xl animate-pulse">🚨</span>
              <div>
                <h3 className="font-bold text-lg">Emergency Support</h3>
                <p className="text-red-100 text-sm">Facing account security issues or urgent payment problems?</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors">
                📞 Call Emergency Line
              </button>
              <button className="bg-red-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-900 transition-colors">
                🔒 Report Security Issue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Base CTA */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Knowledge Base</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
             Comprehensive guides on credit scoring, privacy protection, and financial services
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/docs/getting-started" className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📖</div>
                <h3 className="font-bold text-gray-900 mb-2">Getting Started Guide</h3>
                <p className="text-gray-600 text-sm">Learn how to use Finshield's  credit platform</p>
              </Link>
              
              <Link href="/docs/api" className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔧</div>
                <h3 className="font-bold text-gray-900 mb-2">API Documentation</h3>
                <p className="text-gray-600 text-sm">Integrate Finshield's credit scoring into your applications</p>
              </Link>
              
              <Link href="/docs/privacy" className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
                <h3 className="font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p className="text-gray-600 text-sm">Understanding our data protection and synthetic data approach</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;