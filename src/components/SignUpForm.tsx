'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { authFormSchema, AuthFormData } from '../lib/validations';
import { registerUser } from '../lib/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface SignUpFormProps {
  onToggleMode: () => void;
}

/**
 * SignUpForm Component
 * Handles new user registration with Firebase Auth and Firestore
 * Features: Full form validation, error handling, user data storage
 */
export function SignUpForm({ onToggleMode }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // React Hook Form setup with comprehensive validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),//Uses full validation including name requirements
  });

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setError('');

    try {
      await registerUser(data.fullName, data.email, data.password);
      router.push('/');
    } catch (err: any) {
      if (err.message.includes('auth/email-already-in-use')) {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.message.includes('auth/weak-password')) {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-green-600">
          Join Babylon Radio
        </CardTitle>
        <CardDescription>
          Create your account to get started
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register('fullName')}
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password (min 6 characters)"
              {...register('password')}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>

          <div className="text-sm text-center">
            Already have an account?{' '}
            <Button
              type="button"
              variant="link"
              className="px-0 text-green-600 hover:text-green-700"
              onClick={onToggleMode}
            >
              Sign in
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}