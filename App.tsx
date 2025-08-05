import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HRDashboard } from './components/HRDashboard';
import { AddEmployeeScreen } from './components/AddEmployeeScreen';
import { FlowBuilderScreen } from './components/FlowBuilderScreen';
import { EmployeeListScreen } from './components/EmployeeListScreen';
import { EmployeeDetailScreen } from './components/EmployeeDetailScreen';
import { EmployeePortalScreen } from './components/EmployeePortalScreen';
import { SettingsScreen } from './components/SettingsScreen';

export type Screen = 'login' | 'dashboard' | 'add-employee' | 'flow-builder' | 'employee-list' | 'employee-detail' | 'employee-portal' | 'settings';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  startDate: string;
  manager: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Paused';
  avatar?: string;
}

export interface OnboardingTask {
  id: string;
  title: string;
  completed: boolean;
  type: 'email' | 'document' | 'meeting' | 'setup' | 'video';
  description?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'Frontend Developer',
      department: 'Engineering',
      startDate: '2024-02-15',
      manager: 'Alex Rodriguez',
      progress: 75,
      status: 'In Progress'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.johnson@company.com',
      role: 'Product Manager',
      department: 'Product',
      startDate: '2024-02-20',
      manager: 'Lisa Wang',
      progress: 100,
      status: 'Completed'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'UX Designer',
      department: 'Design',
      startDate: '2024-02-25',
      manager: 'David Kim',
      progress: 45,
      status: 'In Progress'
    }
  ]);

  const navigateToScreen = (screen: Screen, employeeId?: string) => {
    setCurrentScreen(screen);
    if (employeeId) {
      setSelectedEmployeeId(employeeId);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const addEmployee = (employee: Omit<Employee, 'id' | 'progress' | 'status'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
      progress: 0,
      status: 'In Progress'
    };
    setEmployees([...employees, newEmployee]);
    navigateToScreen('dashboard');
  };

  const selectedEmployee = selectedEmployeeId ? employees.find(emp => emp.id === selectedEmployeeId) : null;

  if (!isLoggedIn && currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <HRDashboard employees={employees} navigateToScreen={navigateToScreen} />;
      case 'add-employee':
        return <AddEmployeeScreen onAddEmployee={addEmployee} navigateToScreen={navigateToScreen} />;
      case 'flow-builder':
        return <FlowBuilderScreen navigateToScreen={navigateToScreen} />;
      case 'employee-list':
        return <EmployeeListScreen employees={employees} navigateToScreen={navigateToScreen} />;
      case 'employee-detail':
        return <EmployeeDetailScreen employee={selectedEmployee} navigateToScreen={navigateToScreen} />;
      case 'employee-portal':
        return <EmployeePortalScreen employee={selectedEmployee} navigateToScreen={navigateToScreen} />;
      case 'settings':
        return <SettingsScreen navigateToScreen={navigateToScreen} />;
      default:
        return <HRDashboard employees={employees} navigateToScreen={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {renderScreen()}
    </div>
  );
}