import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Mail, 
  FileText, 
  Calendar, 
  Settings, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Building2,
  Phone,
  MapPin,
  Briefcase
} from 'lucide-react';
import { Employee, Screen, OnboardingTask } from '../App';

interface EmployeeDetailScreenProps {
  employee: Employee | null;
  navigateToScreen: (screen: Screen) => void;
}

export function EmployeeDetailScreen({ employee, navigateToScreen }: EmployeeDetailScreenProps) {
  const [newNote, setNewNote] = useState('');

  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <p className="text-gray-500">Employee not found</p>
      </div>
    );
  }

  const mockTasks: OnboardingTask[] = [
    {
      id: '1',
      title: 'Welcome Email Sent',
      completed: true,
      type: 'email',
      description: 'Initial welcome message with company information'
    },
    {
      id: '2', 
      title: 'Documents Uploaded',
      completed: true,
      type: 'document',
      description: 'ID and tax forms received'
    },
    {
      id: '3',
      title: 'IT Setup',
      completed: false,
      type: 'setup',
      description: 'Email, Slack, and system access provisioning'
    },
    {
      id: '4',
      title: 'Manager 1:1 Scheduled',
      completed: true,
      type: 'meeting',
      description: 'Introduction meeting with direct manager'
    },
    {
      id: '5',
      title: 'Buddy Assignment',
      completed: false,
      type: 'setup',
      description: 'Pair with experienced team member'
    },
    {
      id: '6',
      title: 'Company Intro Video',
      completed: false,
      type: 'video',
      description: 'Watch company culture and values presentation'
    }
  ];

  const mockNotes = [
    {
      id: '1',
      author: 'Anna Martinez',
      date: '2024-02-10',
      content: 'Sarah has been very responsive and proactive. All documents submitted on time.'
    },
    {
      id: '2',
      author: 'Alex Rodriguez',
      date: '2024-02-12',
      content: 'Had a great intro meeting. Sarah is excited to start and has good questions about the tech stack.'
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTaskIcon = (type: OnboardingTask['type']) => {
    const icons = {
      email: Mail,
      document: FileText,
      meeting: Calendar,
      setup: Settings,
      video: Users
    };
    return icons[type] || FileText;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: Employee['status']) => {
    const variants = {
      'In Progress': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-green-100 text-green-700',
      'Paused': 'bg-yellow-100 text-yellow-700'
    };
    return variants[status];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigateToScreen('employee-list')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Employee List
              </Button>
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">OnboardPro</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Mark Complete
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Employee Header */}
        <Card className="border-0 shadow-md mb-8">
          <CardContent className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{employee.role}</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{employee.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Start Date: {formatDate(employee.startDate)}</span>
                    <span>Manager: {employee.manager}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`${getStatusBadge(employee.status)} border-0 mb-3`}>
                  {employee.status}
                </Badge>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">Progress:</span>
                    <span className="text-lg font-bold text-blue-600">{employee.progress}%</span>
                  </div>
                  <Progress value={employee.progress} className="w-32 h-3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Timeline */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Onboarding Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockTasks.map((task, index) => {
                    const Icon = getTaskIcon(task.type);
                    const isCompleted = task.completed;
                    const isPending = !isCompleted;
                    
                    return (
                      <div key={task.id} className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              isCompleted ? 'text-gray-900' : 'text-gray-600'
                            }`}>
                              {task.title}
                            </h4>
                            {isPending && (
                              <Button size="sm" variant="outline">
                                Mark Complete
                              </Button>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {isCompleted ? (
                              <span className="text-xs text-green-600 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completed
                              </span>
                            ) : (
                              <span className="text-xs text-orange-600 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {index < mockTasks.length - 1 && (
                          <div className="absolute left-5 mt-10 w-px h-6 bg-gray-200"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes and Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tasks Completed</span>
                  <span className="font-medium text-gray-900">
                    {mockTasks.filter(t => t.completed).length} / {mockTasks.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Days Since Start</span>
                  <span className="font-medium text-gray-900">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estimated Completion</span>
                  <span className="font-medium text-gray-900">3 days</span>
                </div>
              </CardContent>
            </Card>

            {/* Add Note */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Add Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add a note about this employee's progress..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                />
                <Button className="w-full" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </CardContent>
            </Card>

            {/* Recent Notes */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Recent Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotes.map((note) => (
                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{note.author}</span>
                        <span className="text-xs text-gray-500">{formatDate(note.date)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}