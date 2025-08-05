import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Settings, 
  User,
  LogOut,
  Building2,
  TrendingUp,
  Calendar,
  FileText
} from 'lucide-react';
import { Employee, Screen } from '../App';

interface HRDashboardProps {
  employees: Employee[];
  navigateToScreen: (screen: Screen, employeeId?: string) => void;
}

export function HRDashboard({ employees, navigateToScreen }: HRDashboardProps) {
  const inProgressEmployees = employees.filter(emp => emp.status === 'In Progress');
  const completedEmployees = employees.filter(emp => emp.status === 'Completed');
  const avgProgress = employees.reduce((sum, emp) => sum + emp.progress, 0) / employees.length;
  const avgOnboardingTime = 4.2; // Mock data

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">OnboardPro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-700">AM</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">Anna Martinez</span>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Anna</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your team onboarding</p>
          </div>
          <Button onClick={() => navigateToScreen('add-employee')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Employee
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Onboarding</p>
                  <p className="text-3xl font-bold text-gray-900">{inProgressEmployees.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{completedEmployees.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">This month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                  <p className="text-3xl font-bold text-gray-900">{Math.round(avgProgress)}%</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={avgProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Time</p>
                  <p className="text-3xl font-bold text-gray-900">{avgOnboardingTime}</p>
                  <p className="text-sm text-gray-500">days</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Hires in Progress */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <CardTitle>New Hires in Progress</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToScreen('employee-list')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inProgressEmployees.map((employee) => (
                    <div 
                      key={employee.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => navigateToScreen('employee-detail', employee.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.role} • {employee.department}</p>
                          <p className="text-xs text-gray-500">Starts {employee.startDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{employee.progress}%</span>
                        </div>
                        <Progress value={employee.progress} className="w-24 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Needed & Quick Actions */}
          <div className="space-y-6">
            {/* Action Needed */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                  Action Needed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">3 pending documents</p>
                    <p className="text-xs text-gray-600">Sarah Chen needs to upload ID</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">1 welcome kit not sent</p>
                    <p className="text-xs text-gray-600">Emily Rodriguez's equipment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">2 meetings to schedule</p>
                    <p className="text-xs text-gray-600">Manager 1:1 sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigateToScreen('flow-builder')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Create Onboarding Flow
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigateToScreen('employee-portal')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Preview Employee Portal
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigateToScreen('settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Templates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}