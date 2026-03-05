'use client';

import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { FiPlus, FiList } from 'react-icons/fi';

export default function Dashboard() {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Task Manager
            </h1>
            <p className="text-xl text-gray-600">
              Organize your tasks efficiently and boost your productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href="/tasks"
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <FiList className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  View Tasks
                </h2>
                <p className="text-gray-600">
                  See all your tasks, filter and sort them
                </p>
              </div>
            </Link>

            <Link
              href="/tasks/create"
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <FiPlus className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Create New Task
                </h2>
                <p className="text-gray-600">
                  Add a new task to your list
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}