'use client';

import { useState, useEffect } from 'react';
import PrivateRoute from '../../../components/PrivateRoute';
import Navbar from '../../../components/Navbar';
import TaskForm from '../../../components/TaskForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { taskService } from '../../../services/taskService';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditTask() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await taskService.getTask(params.id);
      setTask(response.data);
    } catch (error) {
      toast.error('Failed to fetch task');
      router.push('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await taskService.updateTask(params.id, formData);
      toast.success('Task updated successfully');
      router.push('/tasks');
    } catch (error) {
      toast.error('Failed to update task');
      throw error;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Task</h1>
          <TaskForm initialData={task} onSubmit={handleSubmit} />
        </div>
      </div>
    </PrivateRoute>
  );
}