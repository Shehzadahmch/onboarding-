import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  FileText, 
  Video, 
  Calendar, 
  Users, 
  Star,
  Building2,
  Heart,
  Coffee,
  Zap
} from 'lucide-react';
import { Employee, Screen, OnboardingTask } from '../App';

interface EmployeePortalScreenProps {
  employee: Employee | null;
  navigateToScreen: (screen: Screen) => void;
}

export function EmployeePortalScreen({ employee, navigateToScreen }: EmployeePortalScreenProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set(['1', '2', '4']));

  // Mock data for the employee portal
  const mockTasks: OnboardingTask[] = [
    {
      id: '1',
      title: 'Upload Your ID',
      completed: true,
      type: 'document',
      description: 'Please upload a clear photo of your government-issued ID'
    },
    {
      id: '2', 
      title: 'Sign NDA & Employment Agreement',
      completed: true,
      type: 'document',
      description: 'Review and digitally sign your employment documents'
    },
    {
      id: '3',
      title: 'Watch Company Intro Video',
      completed: false,
      type: 'video',
      description: 'Learn about our company culture, values, and mission (15 minutes)'
    },
    {
      id: '4',
      title: 'Schedule 1:1 with Manager',
      completed: true,
      type: 'meeting',
      description: 'Book your first meeting with Alex Rodriguez'
    },
    {
      id: '5',
      title: 'Complete IT Setup',
      completed: false,
      type: 'setup',
      description: 'Set up your email, Slack, and development tools'
    },
    {
      id: '6',
      title: 'Meet Your Buddy',
      completed: false,
      type: 'meeting',
      description: 'Connect with your assigned onboarding buddy'
    }
  ];

  const upcomingEvents = [
    {
      date: '2024-02-15',
      time: '9:00 AM',
      title: 'First Day Check-in',
      type: 'Meeting with HR'
    },
    {
      date: '2024-02-15',
      time: '2:00 PM', 
      title: 'Team Introduction',
      type: 'Engineering Team'
    },
    {
      date: '2024-02-16',
      time: '10:00 AM',
      title: '1:1 with Manager',
      type: 'Alex Rodriguez'
    }
  ];

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const completedCount = mockTasks.filter(task => completedTasks.has(task.id)).length;
  const progressPercentage = Math.round((completedCount / mockTasks.length) * 100);

  const getTaskIcon = (type: OnboardingTask['type']) => {
    const icons = {
      email: Building2,
      document: FileText,
      meeting: Calendar,
      setup: Zap,
      video: Video
    };
    return icons[type] || FileText;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigateToScreen('dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Admin View
              </Button>
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">OnboardPro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-700">SC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">Sarah Chen</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">SC</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-700" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to the team, Sarah! 🎉</h1>
          <p className="text-xl text-gray-600 mb-4">
            We're excited to have you join us as a <strong>Frontend Developer</strong>
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Engineering Team
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Starts Feb 15, 2024
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Manager: Alex Rodriguez
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="border-0 shadow-lg mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Onboarding Progress</h2>
                <p className="text-blue-100 mb-4">
                  You're doing great! {completedCount} of {mockTasks.length} tasks completed
                </p>
                <div className="flex items-center space-x-3">
                  <Progress value={progressPercentage} className="flex-1 h-3 bg-blue-400" />
                  <span className="text-xl font-bold">{progressPercentage}%</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold mb-2">{completedCount}</div>
                <div className="text-blue-100">Tasks Done</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Onboarding Checklist */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  Your Onboarding Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTasks.map((task) => {
                    const Icon = getTaskIcon(task.type);
                    const isCompleted = completedTasks.has(task.id);
                    
                    return (
                      <div 
                        key={task.id} 
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isCompleted 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-gray-200 bg-white hover:border-blue-200'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Icon className="w-6 h-6" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-medium ${
                                isCompleted ? 'text-green-700 line-through' : 'text-gray-900'
                              }`}>
                                {task.title}
                              </h4>
                              {isCompleted ? (
                                <Badge className="bg-green-100 text-green-700 border-0">
                                  Complete
                                </Badge>
                              ) : (
                                <Button 
                                  size="sm"
                                  onClick={() => toggleTaskCompletion(task.id)}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Complete
                                </Button>
                              )}
                            </div>
                            <p className={`text-sm mt-1 ${
                              isCompleted ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-blue-700">
                        {formatDate(event.date)}
                      </span>
                      <span className="text-sm text-blue-600">{event.time}</span>
                    </div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.type}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Contact HR Team
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Coffee className="w-4 h-4 mr-2" />
                  IT Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Employee Handbook
                </Button>
              </CardContent>
            </Card>

            {/* Welcome Message */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">You're doing amazing!</h3>
                <p className="text-sm text-gray-600">
                  Your enthusiasm and progress have been noticed by the team. Keep up the great work!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}