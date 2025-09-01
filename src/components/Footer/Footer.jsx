'use client';

import { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerSections = [
    {
      title: 'Products',
      links: [
        { name: 'Personal Loans', href: '/products/personal-loans', icon: '💰' },
        { name: 'Business Credit', href: '/products/business-credit', icon: '🏢' },
        { name: 'Home Loans', href: '/products/home-loans', icon: '🏠' },
        { name: 'Credit Cards', href: '/products/credit-cards', icon: '💳' },
        { name: 'Investment Services', href: '/products/investments', icon: '📈' }
      ]
    },
    {
      title: 'Technology',
      links: [
        { name: 'Credit Scoring', href: '/technology/ai-scoring', icon: '🧠' },
        { name: 'Synthetic Data', href: '/technology/synthetic-data', icon: '🔬' },
        { name: 'Privacy Protection', href: '/technology/privacy', icon: '🛡️' },
        { name: 'API Documentation', href: '/docs/api', icon: '📚' },
        { name: 'Model Explainability', href: '/technology/explainability', icon: '🔍' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/support', icon: '❓' },
        { name: 'Contact Us', href: '/contact', icon: '📞' },
        { name: 'Live Chat', href: '/chat', icon: '💬' },
        { name: 'Status Page', href: '/status', icon: '📊' },
        { name: 'Community Forum', href: '/community', icon: '👥' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', icon: '🏛️' },
        { name: 'Careers', href: '/careers', icon: '💼' },
        { name: 'Press & Media', href: '/press', icon: '📰' },
        { name: 'Partnerships', href: '/partnerships', icon: '🤝' },
        { name: 'Investor Relations', href: '/investors', icon: '📊' }
      ]
    }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Data Protection', href: '/data-protection' },
    { name: 'Compliance', href: '/compliance' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '💼', color: 'hover:text-blue-600' },
    { name: 'Twitter', href: '#', icon: '🐦', color: 'hover:text-sky-500' },
    { name: 'GitHub', href: '#', icon: '💻', color: 'hover:text-gray-800' },
    { name: 'YouTube', href: '#', icon: '📺', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-1/3 w-16 h-16 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">⭐</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                    Finshield
                  </h3>
                  
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Democratizing access to fair credit, synthetic data protection, 
                and transformer-based risk assessment. Building the future of inclusive finance.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-white">Stay Updated</h4>
                <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isSubscribed ? '✅' : '📧'}
                  </button>
                </form>
                {isSubscribed && (
                  <p className="text-green-400 text-sm mt-2 animate-pulse">✅ Subscribed successfully!</p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm group"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-200">{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Security & Compliance Badges */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-green-400">🔒</span>
                  <span className="text-sm font-medium">256-bit SSL</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-blue-400">🛡️</span>
                  <span className="text-sm font-medium">ISO 27001</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm font-medium">RBI Compliant</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-purple-400">🔐</span>
                  <span className="text-sm font-medium">GDPR Ready</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Powered by</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-blue-300">Transformer </span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-black/20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              {/* Copyright */}
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Finshield Technologies Pvt. Ltd. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Building inclusive financial systems• Reg. No: U72900MH2024PTC123456
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-1">
                {legalLinks.map((link, index) => (
                  <span key={link.name} className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-xs text-gray-400 hover:text-orange-400 transition-colors duration-200 px-2 py-1 rounded"
                    >
                      {link.name}
                    </Link>
                    {index < legalLinks.length - 1 && (
                      <span className="text-gray-600 text-xs">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Info Bar */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>System Status: Operational</span>
                  </span>
                  <span>•</span>
                  <span>API Uptime: 99.9%</span>
                  <span>•</span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <span>🌍</span>
                    <span>Serving customers in 25+ countries</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
          {/* Chat Support */}
          <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group">
            <span className="text-xl group-hover:animate-bounce">💬</span>
          </button>
          
          {/* Emergency Support */}
          <button className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group">
            <span className="text-xl group-hover:animate-pulse">🚨</span>
          </button>
          
          {/* Scroll to Top */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group"
          >
            <span className="text-xl group-hover:animate-bounce">⬆️</span>
          </button>
        </div>

   

        {/* Innovation Showcase */}
        <div className="bg-black/20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-xs text-gray-400">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Models Trained: 1,247</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Synthetic Records: 2.4M+</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Credit Decisions: 50K+</span>
                </span>
              </div>
              
              <div className="text-xs text-gray-400">
                <span>Built with  in India • Serving globally</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;