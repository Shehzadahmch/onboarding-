import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Mail, 
  FileText, 
  Settings, 
  Calendar, 
  Users, 
  Play, 
  Eye,
  GripVertical,
  Plus,
  Building2
} from 'lucide-react';
import { Screen } from '../App';

interface FlowBuilderScreenProps {
  navigateToScreen: (screen: Screen) => void;
}

interface FlowBlock {
  id: string;
  type: 'email' | 'document' | 'meeting' | 'setup' | 'buddy';
  title: string;
  description: string;
  config: Record<string, any>;
}

export function FlowBuilderScreen({ navigateToScreen }: FlowBuilderScreenProps) {
  const [selectedBlock, setSelectedBlock] = useState<FlowBlock | null>(null);
  const [preOnboardingBlocks, setPreOnboardingBlocks] = useState<FlowBlock[]>([
    {
      id: '1',
      type: 'email',
      title: 'Send Welcome Email',
      description: 'Automated welcome message with next steps',
      config: {
        subject: 'Welcome to the team!',
        template: 'welcome'
      }
    },
    {
      id: '2', 
      type: 'document',
      title: 'Collect Documents',
      description: 'Request required paperwork and forms',
      config: {
        documents: ['ID', 'Tax forms', 'Emergency contact']
      }
    }
  ]);

  const [postOnboardingBlocks, setPostOnboardingBlocks] = useState<FlowBlock[]>([
    {
      id: '3',
      type: 'setup',
      title: 'Set Up IT Access',
      description: 'Provision accounts and equipment',
      config: {
        systems: ['Email', 'Slack', 'GitHub', 'Figma']
      }
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Schedule Manager 1:1',
      description: 'First meeting with direct manager',
      config: {
        duration: 60,
        type: 'intro'
      }
    },
    {
      id: '5',
      type: 'buddy',
      title: 'Assign Buddy',
      description: 'Pair with experienced team member',
      config: {
        department: 'same',
        duration: '2 weeks'
      }
    }
  ]);

  const availableBlocks = [
    { type: 'email', title: 'Send Email', icon: Mail, color: 'bg-blue-100 text-blue-600' },
    { type: 'document', title: 'Collect Documents', icon: FileText, color: 'bg-green-100 text-green-600' },
    { type: 'meeting', title: 'Book Meeting', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
    { type: 'setup', title: 'IT Setup', icon: Settings, color: 'bg-orange-100 text-orange-600' },
    { type: 'buddy', title: 'Assign Buddy', icon: Users, color: 'bg-pink-100 text-pink-600' }
  ];

  const addBlock = (type: string, isPreOnboarding: boolean) => {
    const newBlock: FlowBlock = {
      id: Date.now().toString(),
      type: type as any,
      title: availableBlocks.find(b => b.type === type)?.title || 'New Block',
      description: 'Configure this block',
      config: {}
    };

    if (isPreOnboarding) {
      setPreOnboardingBlocks([...preOnboardingBlocks, newBlock]);
    } else {
      setPostOnboardingBlocks([...postOnboardingBlocks, newBlock]);
    }
  };

  const BlockComponent = ({ block, onClick }: { block: FlowBlock; onClick: () => void }) => {
    const blockType = availableBlocks.find(b => b.type === block.type);
    const Icon = blockType?.icon || FileText;
    
    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${blockType?.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{block.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{block.description}</p>
              </div>
            </div>
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
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
                onClick={() => navigateToScreen('dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">OnboardPro</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview as Employee
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Save Flow
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Flow Builder</h1>
          <p className="text-gray-600 mt-2">Design the perfect onboarding experience with drag-and-drop blocks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Available Blocks Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Available Blocks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableBlocks.map((block) => {
                  const Icon = block.icon;
                  return (
                    <div
                      key={block.type}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${block.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{block.title}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Flow Builder */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="pre-onboarding" className="space-y-6">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="pre-onboarding">Pre-Onboarding</TabsTrigger>
                <TabsTrigger value="post-onboarding">Post-Onboarding</TabsTrigger>
              </TabsList>

              <TabsContent value="pre-onboarding" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Pre-Onboarding Steps</h3>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addBlock('email', true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Block
                  </Button>
                </div>
                <div className="space-y-3">
                  {preOnboardingBlocks.map((block) => (
                    <BlockComponent 
                      key={block.id} 
                      block={block} 
                      onClick={() => setSelectedBlock(block)} 
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="post-onboarding" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Post-Onboarding Steps</h3>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addBlock('setup', false)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Block
                  </Button>
                </div>
                <div className="space-y-3">
                  {postOnboardingBlocks.map((block) => (
                    <BlockComponent 
                      key={block.id} 
                      block={block} 
                      onClick={() => setSelectedBlock(block)} 
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Block Properties Panel */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedBlock ? 'Block Properties' : 'Select a Block'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedBlock ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="blockTitle">Title</Label>
                      <Input
                        id="blockTitle"
                        value={selectedBlock.title}
                        onChange={() => {}} // Would update the block in real app
                        className="h-9"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blockDescription">Description</Label>
                      <Textarea
                        id="blockDescription"
                        value={selectedBlock.description}
                        onChange={() => {}} // Would update the block in real app
                        rows={3}
                      />
                    </div>

                    {selectedBlock.type === 'email' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="emailSubject">Email Subject</Label>
                          <Input
                            id="emailSubject"
                            placeholder="Welcome to the team!"
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emailTemplate">Template</Label>
                          <Input
                            id="emailTemplate"
                            placeholder="welcome_template"
                            className="h-9"
                          />
                        </div>
                      </>
                    )}

                    {selectedBlock.type === 'meeting' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="meetingDuration">Duration (minutes)</Label>
                          <Input
                            id="meetingDuration"
                            type="number"
                            placeholder="60"
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="meetingType">Meeting Type</Label>
                          <Input
                            id="meetingType"
                            placeholder="Introduction"
                            className="h-9"
                          />
                        </div>
                      </>
                    )}

                    <Button className="w-full mt-4" size="sm">
                      Update Block
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 text-center py-8">
                    Click on a block to edit its properties
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}