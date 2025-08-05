import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2, Mail, Lock, Chrome } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Building2 className="w-12 h-12 mr-3" />
            <h1 className="text-3xl font-bold">OnboardPro</h1>
          </div>
          <h2 className="text-xl mb-4">Streamline Your Employee Onboarding</h2>
          <p className="text-blue-100 leading-relaxed">
            Create seamless onboarding experiences that get your new hires productive from day one. 
            Build custom flows, track progress, and ensure nothing falls through the cracks.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-blue-200">Completion Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">3.2</div>
              <div className="text-sm text-blue-200">Days Faster</div>
            </div>
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-blue-200">Companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4 lg:hidden">
              <Building2 className="w-8 h-8 mr-2 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">OnboardPro</h1>
            </div>
            <CardTitle className="text-2xl">
              {isSignup ? 'Create your account' : 'Welcome back'}
            </CardTitle>
            <CardDescription>
              {isSignup 
                ? 'Start your free trial today' 
                : 'Sign in to your account to continue'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              {!isSignup && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded" />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                {isSignup ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11" type="button">
              <Chrome className="w-4 h-4 mr-2" />
              Sign in with Google
            </Button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-sm text-gray-600"
              >
                {isSignup 
                  ? "Already have an account? " 
                  : "Don't have an account? "
                }
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  {isSignup ? 'Sign in' : 'Sign up'}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}