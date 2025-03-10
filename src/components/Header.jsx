import React from 'react';
import Image from 'next/image';
import { Avatar,AvatarFallback  } from "@/components/ui/avatar";
export default function Header() {
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
            <Avatar className="cursor-pointer ring-2 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
    );
  }