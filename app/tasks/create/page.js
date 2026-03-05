'use client';

import PrivateRoute from '../../components/PrivateRoute';
import Navbar from '../../components/Navbar';
import TaskForm from '../../components/TaskForm';
import { taskService } from '../../services/taskService';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateTask() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      await taskService.createTask(formData);
      toast.success('Task created successfully');
      router.push('/tasks');
    } catch (error) {
      toast.error('Failed to create task');
      throw error;
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Task</h1>
          <TaskForm onSubmit={handleSubmit} />
        </div>
      </div>
    </PrivateRoute>
  );
}