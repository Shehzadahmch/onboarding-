import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Pause,
  Building2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Employee, Screen } from '../App';

interface EmployeeListScreenProps {
  employees: Employee[];
  navigateToScreen: (screen: Screen, employeeId?: string) => void;
}

export function EmployeeListScreen({ employees, navigateToScreen }: EmployeeListScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const departments = ['all', ...Array.from(new Set(employees.map(emp => emp.department)))];
  const statuses = ['all', 'In Progress', 'Completed', 'Paused'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusBadge = (status: Employee['status']) => {
    const variants = {
      'In Progress': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-green-100 text-green-700',
      'Paused': 'bg-yellow-100 text-yellow-700'
    };
    return variants[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigateToScreen('dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Building2 className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">OnboardPro</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-2">Manage and track all employee onboarding progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              <p className="text-sm text-gray-600">Total Employees</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {employees.filter(emp => emp.status === 'In Progress').length}
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold text-green-600">
                {employees.filter(emp => emp.status === 'Completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {employees.filter(emp => emp.status === 'Paused').length}
              </p>
              <p className="text-sm text-gray-600">Paused</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-md mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search employees by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48 h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept === 'all' ? 'All Departments' : dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 h-10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Statuses' : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b text-sm font-medium text-gray-600">
                  <div className="col-span-3">Employee</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Start Date</div>
                  <div className="col-span-2">Progress</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <div 
                      key={employee.id} 
                      className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigateToScreen('employee-detail', employee.id)}
                    >
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.role}</p>
                          <p className="text-xs text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex items-center">
                        <span className="text-sm text-gray-900">{employee.department}</span>
                      </div>
                      
                      <div className="col-span-2 flex items-center">
                        <span className="text-sm text-gray-900">{formatDate(employee.startDate)}</span>
                      </div>
                      
                      <div className="col-span-2 flex items-center space-x-2">
                        <Progress value={employee.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                          {employee.progress}%
                        </span>
                      </div>
                      
                      <div className="col-span-2 flex items-center">
                        <Badge className={`${getStatusBadge(employee.status)} border-0`}>
                          {employee.status}
                        </Badge>
                      </div>
                      
                      <div className="col-span-1 flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              navigateToScreen('employee-detail', employee.id);
                            }}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredEmployees.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-gray-500">No employees found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}