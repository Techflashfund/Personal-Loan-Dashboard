'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate authentication - replace with your actual auth logic
    try {
      // Example authentication check
      const response = await fetch('https://pl.pr.flashfund.in/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      
      // Store token and admin info in localStorage or use a state management solution
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminInfo', JSON.stringify(data.admin));
      
      // Redirect to dashboard
      router.push('/');
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left side with login form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full rounded-xl border-none shadow-md bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden relative">
          {/* Background decoration circle */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -mt-10 -mr-10 opacity-50"></div>
          
          {/* Logo Section */}
          <div className="p-6 flex items-center justify-center">
            <Image 
              src="/FlashfundLogo.png"
              alt="FlashFund logo"
              width={160}
              height={90}
              className="w-40"
            />
          </div>

          {/* Form Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Admin Login</h2>
            <p className="text-slate-500 mb-6">Access your loan management dashboard</p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@flashfund.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-5">
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <Link 
                    href="/admin/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center mb-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium text-center transition-all 
                  ${loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </form>
            
            <div className="mt-4 text-center text-sm text-slate-600">
              <p>
                Need support?{' '}
                <Link href="/admin/support" className="text-blue-600 hover:text-blue-800 font-medium">
                  Contact admin
                </Link>
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-200">
              <p className="text-xs text-center text-slate-500">
                FlashFund Admin Portal © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side with custom loader */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-400 items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-300 rounded-full opacity-20"></div>
        
        {/* Custom loader */}
        <div className="relative z-10">
          <style jsx>{`
            .loader {
              display: block;
              width: 120px;
              height: 120px;
              position: relative;
            }
            .loader:before, .loader:after {
              content: "";
              position: absolute;
              left: 50%;
              bottom: 0;
              width: 80px;
              height: 80px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.9);
              transform: translate(-50%, -100%) scale(0);
              animation: push_401 2s infinite linear;
            }
            .loader:after {
              animation-delay: 1s;
              background: rgba(240, 249, 255, 0.7);
            }
            @keyframes push_401 {
              0%, 50% {
                transform: translate(-50%, 0%) scale(1)
              }
              100% {
                transform: translate(-50%, -100%) scale(0)
              }
            }
          `}</style>
          <div className="text-center">
            <span className="loader"></span>
            
          </div>
        </div>
      </div>
    </div>
  );
}