import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { ArrowLeft, Upload, Mail, Building2 } from 'lucide-react';
import { Employee, Screen } from '../App';

interface AddEmployeeScreenProps {
  onAddEmployee: (employee: Omit<Employee, 'id' | 'progress' | 'status'>) => void;
  navigateToScreen: (screen: Screen) => void;
}

export function AddEmployeeScreen({ onAddEmployee, navigateToScreen }: AddEmployeeScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    startDate: '',
    manager: '',
    sendWelcomeEmail: true
  });

  const [offerLetter, setOfferLetter] = useState<File | null>(null);

  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];
  const managers = ['Alex Rodriguez', 'Lisa Wang', 'David Kim', 'Sarah Johnson', 'Michael Chen'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOfferLetter(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEmployee({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      startDate: formData.startDate,
      manager: formData.manager
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Employee</h1>
          <p className="text-gray-600 mt-2">Create a personalized onboarding experience for your new team member</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">Employee Information</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="employee@company.com"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Job Title *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manager">Reporting Manager *</Label>
                  <Select onValueChange={(value) => handleInputChange('manager', value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.map(manager => (
                        <SelectItem key={manager} value={manager}>{manager}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <Label>Offer Letter (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="offerLetter"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="offerLetter" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    {offerLetter ? (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600">{offerLetter.name}</span> uploaded
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600">Click to upload offer letter</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Welcome Email Toggle */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <Label className="text-sm font-medium">Send Welcome Email</Label>
                    <p className="text-xs text-gray-600">Automatically send a welcome email with onboarding instructions</p>
                  </div>
                </div>
                <Switch
                  checked={formData.sendWelcomeEmail}
                  onCheckedChange={(checked) => handleInputChange('sendWelcomeEmail', checked.toString())}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigateToScreen('dashboard')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                  disabled={!formData.name || !formData.email || !formData.role || !formData.department || !formData.startDate || !formData.manager}
                >
                  Create Onboarding Flow
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="mt-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Onboarding Flow Created</h4>
                <p className="text-sm text-gray-600">A personalized onboarding plan will be generated</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Welcome Email Sent</h4>
                <p className="text-sm text-gray-600">Employee receives welcome instructions</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Progress Tracking</h4>
                <p className="text-sm text-gray-600">Monitor completion and provide support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}