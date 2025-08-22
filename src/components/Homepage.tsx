'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '../lib/auth';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function Homepage() {
  const { userData } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Babylon Radio</h1>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-green-600">
              Hey, {userData.fullName}! You're successfully logged in.
            </CardTitle>
            <CardDescription className="text-lg">
              Welcome to Babylon Radio - your authentication was successful!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="text-green-800">
                <strong>Account Created:</strong> {userData.createdAt.toLocaleDateString()}
              </p>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleSignOut} size="lg" className="bg-green-600 hover:bg-green-700">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}