import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Mail, 
  Palette, 
  Users, 
  Save, 
  Upload,
  Building2,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { Screen } from '../App';

interface SettingsScreenProps {
  navigateToScreen: (screen: Screen) => void;
}

export function SettingsScreen({ navigateToScreen }: SettingsScreenProps) {
  const [companyName, setCompanyName] = useState('OnboardPro Inc.');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [welcomeEmailTemplate, setWelcomeEmailTemplate] = useState(`Hello {{employee_name}},

Welcome to {{company_name}}! We're thrilled to have you join our team as a {{job_title}}.

Your first day is scheduled for {{start_date}}. Here's what you need to know:

1. Please complete your onboarding checklist before your start date
2. Your manager {{manager_name}} will reach out to you soon
3. If you have any questions, don't hesitate to contact our HR team

We're excited to work with you!

Best regards,
The {{company_name}} Team`);

  const emailTemplates = [
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to {{company_name}}!',
      lastModified: '2024-02-10'
    },
    {
      id: '2',
      name: 'Document Reminder',
      subject: 'Action Required: Missing Documents',
      lastModified: '2024-02-08'
    },
    {
      id: '3',
      name: 'First Day Instructions',
      subject: 'Your First Day at {{company_name}}',
      lastModified: '2024-02-05'
    }
  ];

  const onboardingTemplates = [
    {
      id: '1',
      name: 'Engineering Onboarding',
      description: 'Standard flow for engineering team members',
      steps: 8,
      lastModified: '2024-02-12'
    },
    {
      id: '2',
      name: 'Marketing Onboarding',
      description: 'Flow for marketing and content team',
      steps: 6,
      lastModified: '2024-02-10'
    },
    {
      id: '3',
      name: 'Executive Onboarding',
      description: 'Enhanced flow for leadership roles',
      steps: 12,
      lastModified: '2024-02-08'
    }
  ];

  const userRoles = [
    {
      id: '1',
      name: 'Anna Martinez',
      email: 'anna@company.com',
      role: 'Admin',
      lastActive: '2024-02-15'
    },
    {
      id: '2',
      name: 'James Wilson',
      email: 'james@company.com',
      role: 'HR Manager',
      lastActive: '2024-02-14'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'Viewer',
      lastActive: '2024-02-13'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your onboarding platform configuration</p>
        </div>

        <Tabs defaultValue="email-templates" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="email-templates">Email Templates</TabsTrigger>
            <TabsTrigger value="onboarding-templates">Onboarding Flows</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
          </TabsList>

          {/* Email Templates */}
          <TabsContent value="email-templates">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Email Templates</CardTitle>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      New Template
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emailTemplates.map((template) => (
                        <div key={template.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-600">{template.subject}</p>
                            <p className="text-xs text-gray-500">Modified {template.lastModified}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Edit Welcome Email</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="emailSubject">Subject Line</Label>
                      <Input
                        id="emailSubject"
                        placeholder="Welcome to {{company_name}}!"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailTemplate">Email Content</Label>
                      <Textarea
                        id="emailTemplate"
                        value={welcomeEmailTemplate}
                        onChange={(e) => setWelcomeEmailTemplate(e.target.value)}
                        rows={12}
                        className="text-sm font-mono"
                      />
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium mb-2">Available Variables:</p>
                      <div className="text-xs text-blue-600 space-y-1">
                        <div>{{employee_name}} - Employee's full name</div>
                        <div>{{company_name}} - Your company name</div>
                        <div>{{job_title}} - Employee's role</div>
                        <div>{{start_date}} - First day of work</div>
                        <div>{{manager_name}} - Direct manager's name</div>
                      </div>
                    </div>
                    <Button className="w-full">
                      Save Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Onboarding Templates */}
          <TabsContent value="onboarding-templates">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Onboarding Flow Templates</CardTitle>
                <Button onClick={() => navigateToScreen('flow-builder')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Flow
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {onboardingTemplates.map((template) => (
                    <Card key={template.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{template.steps} steps</span>
                          <span>Modified {template.lastModified}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding */}
          <TabsContent value="branding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">Company Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload logo</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Website URL</Label>
                    <Input
                      id="companyWebsite"
                      placeholder="https://company.com"
                      className="h-10"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Theme & Colors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        id="primaryColor"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-10 flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Preview</Label>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div 
                        className="h-20 rounded-lg mb-4 flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Welcome to {companyName}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
                        >
                          Primary Button
                        </Button>
                        <Button size="sm" variant="outline">
                          Secondary Button
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode Support</Label>
                      <p className="text-sm text-gray-600">Enable dark theme for employee portal</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users & Roles */}
          <TabsContent value="users">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  User Management
                </CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Invite User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRoles.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-700 font-medium">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Last active {user.lastActive}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Select defaultValue={user.role.toLowerCase()}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="hr manager">HR Manager</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Role Permissions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong className="text-blue-800">Admin:</strong>
                      <ul className="text-blue-700 mt-1 space-y-1">
                        <li>• Full system access</li>
                        <li>• Manage users</li>
                        <li>• Edit templates</li>
                        <li>• View all data</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-800">HR Manager:</strong>
                      <ul className="text-blue-700 mt-1 space-y-1">
                        <li>• Manage employees</li>
                        <li>• Edit flows</li>
                        <li>• View reports</li>
                        <li>• Send emails</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-800">Viewer:</strong>
                      <ul className="text-blue-700 mt-1 space-y-1">
                        <li>• View employees</li>
                        <li>• View progress</li>
                        <li>• Basic reporting</li>
                        <li>• Read-only access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}