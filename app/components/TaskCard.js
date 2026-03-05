'use client';

import Link from 'next/link';
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import { format } from 'date-fns';

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

export default function TaskCard({ task, onDelete, onComplete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <Link
            href={`/tasks/${task._id}/edit`}
            className="text-blue-600 hover:text-blue-800"
          >
            <FiEdit2 />
          </Link>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-800"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
            {task.status === 'in-progress' ? 'In Progress' : 
              task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <FiClock className="mr-1" />
          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </div>
      </div>

      {task.status !== 'completed' && (
        <button
          onClick={() => onComplete(task._id)}
          className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <FiCheckCircle />
          <span>Mark Completed</span>
        </button>
      )}
    </div>
  );
}