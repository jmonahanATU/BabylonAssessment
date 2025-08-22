'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { signInUser } from '../lib/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

//Validation schema for sign-in form - only needs email and password
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onToggleMode: () => void;//Function to switch to sign-up form
}

/**
 * SignInForm Component
 * Handles user authentication for existing users
 * Features: Form validation, error handling, loading states
 */
export function SignInForm({ onToggleMode }: SignInFormProps) {
    //State management for loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  //React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  /**
   * Handle form submission
   * Attempts to sign in user with Firebase Auth
   */
  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Call Firebase authentication service
      await signInUser(data.email, data.password);
      // Redirect to homepage on successful login
      router.push('/');
    } catch (err: any) {
      // Handle different types of authentication errors
      if (err.message.includes('auth/user-not-found') || err.message.includes('auth/invalid-credential')) {
        setError('No account found with this email. Please check your email or create an account.');
      } else if (err.message.includes('auth/wrong-password')) {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Sign in failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-green-600">
          Welcome Back
        </CardTitle>
        <CardDescription>
          Sign in to your Babylon Radio account
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
              placeholder="Enter your password"
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
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-sm text-center">
            Don't have an account?{' '}
            <Button
              type="button"
              variant="link"
              className="px-0 text-green-600 hover:text-green-700"
              onClick={onToggleMode}
            >
              Create account
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}