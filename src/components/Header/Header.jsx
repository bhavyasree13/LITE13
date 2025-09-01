'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate user session check
    const userData = {
      name: 'Aarvi',
      userId: 'FIN001234',
      role: 'customer' // customer, admin, risk_manager
    };
    setUser(userData);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Apply for Credit', href: '/apply', icon: '📋' },
    { name: 'My Applications', href: '/applications', icon: '📄' },
    { name: 'Credit Score', href: '/score', icon: '📈' },
    { name: 'Help & Support', href: '/support', icon: '💬' }
  ];

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin', icon: '⚙️' },
    { name: 'Risk Analytics', href: '/admin/analytics', icon: '📊' },
    { name: 'Model Management', href: '/admin/models', icon: '🧠' },
    { name: 'User Management', href: '/admin/users', icon: '👥' }
  ];

  const handleLogout = () => {
    // Clear user session
    setUser(null);
    router.push('/login');
  };

  return (
    <header className={`w-full  ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white text-lg font-bold">⭐</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                  Finshield
                </h1>
                
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {(user?.role === 'admin' ? adminNavigation : navigation).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu & Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <span className="text-lg">🔔</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>

            {/* User Profile Dropdown */}
            {user ? (
             <div className="relative group">
  <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
      {user.name.split(' ').map(n => n[0]).join('')}
    </div>
    <div className="hidden md:block text-left">
      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
      <p className="text-xs text-gray-500">{user.userId}</p>
    </div>
    <span className="text-gray-400 text-sm">▼</span>
  </button>

  {/* Dropdown Menu */}
  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
    <div className="p-4 border-b border-gray-100">
      <p className="font-semibold text-gray-900">{user.name}</p>
      <p className="text-sm text-gray-500">{user.userId}</p>
      <div className="mt-2">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          user.role === 'admin'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {user.role === 'admin' ? '👑 Administrator' : '👤 Customer'}
        </span>
      </div>
    </div>

    <div className="py-2">
      <Link href="/profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
        <span>👤</span>
        <span>My Profile</span>
      </Link>
      <Link href="/settings" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
        <span>⚙️</span>
        <span>Settings</span>
      </Link>
      <Link href="/security" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
        <span>🔒</span>
        <span>Security</span>
      </Link>
    </div>

    <div className="border-t border-gray-100 py-2">
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
      >
        <span>🚪</span>
        <span>Sign Out</span>
      </button>
    </div>
  </div>
</div>

            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <div className="border-t border-gray-200 pt-4">
            <nav className="space-y-2">
              {(user?.role === 'admin' ? adminNavigation : navigation).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile User Actions */}
            {user && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-4 py-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.userId}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Link href="/profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <span>👤</span>
                    <span>Profile</span>
                  </Link>
                  <Link href="/settings" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <span>⚙️</span>
                    <span>Settings</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;