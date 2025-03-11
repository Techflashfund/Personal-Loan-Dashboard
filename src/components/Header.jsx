import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useAuthStore from '../store/store';

export default function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);
  
  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
  };
  
  const handleLogout = () => {
    logout(); // Clear authentication data from store
    router.push('/auth'); // Redirect to authentication page
    setShowLogout(false);
  };
  
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Image 
            src="/FlashfundLogo.png"
            alt="FlashFund logo"
            width={180}
            height={110}
            className="w-46"
          />
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-900 font-medium border-b-2 border-blue-500 pb-1 cursor-pointer">Dashboard</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200 cursor-pointer">Applications</a>
          </nav>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative cursor-pointer">
            <i className="fas fa-bell text-slate-600 text-xl"></i>
          </div>
          <div className="relative">
            <Avatar 
              className="cursor-pointer ring-2 ring-blue-100"
              onClick={handleAvatarClick}
            >
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">AD</AvatarFallback>
            </Avatar>
            
            {/* Logout Popup */}
            {showLogout && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}