'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';
import { FiLogOut, FiList, FiPlus, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            TaskManager
          </Link>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/tasks"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/tasks') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiList />
              <span>Tasks</span>
            </Link>
            
            <Link
              href="/tasks/create"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/tasks/create') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiPlus />
              <span>Create Task</span>
            </Link>
          </div>

          {/* Desktop User Info - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, <span className="font-semibold">{user?.name?.split(' ')[0]}</span>
            </span>
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile User Greeting (compact) */}
            <span className="text-sm text-gray-700 truncate max-w-[100px]">
              Hi, {user?.name?.split(' ')[0]}
            </span>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {/* Mobile Navigation Links */}
              <Link
                href="/tasks"
                onClick={closeMenu}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/tasks') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiList />
                <span>Tasks</span>
              </Link>
              
              <Link
                href="/tasks/create"
                onClick={closeMenu}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/tasks/create') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiPlus />
                <span>Create Task</span>
              </Link>

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}