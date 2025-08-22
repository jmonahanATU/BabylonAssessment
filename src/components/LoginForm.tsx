'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { authFormSchema, AuthFormData } from '../lib/validations';
import { checkUserExists, registerUser, signInUser } from '../lib/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
  });

  const emailValue = watch('email');

  // Check if user exists when email changes
  const handleEmailBlur = async () => {
    if (emailValue && !errors.email) {
      try {
        const userExists = await checkUserExists(emailValue);
        setIsNewUser(!userExists);
      } catch (error) {
        console.error('Error checking user:', error);
      }
    }
  };

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const userExists = await checkUserExists(data.email);
      
      if (userExists) {
        // Existing user - sign in
        await signInUser(data.email, data.password);
      } else {
        // New user - register
        await registerUser(data.fullName, data.email, data.password);
      }
      
      // Redirect to homepage after successful authentication
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Babylon Radio
          </CardTitle>
          <CardDescription className="text-center">
            {isNewUser === null 
              ? 'Enter your details to continue'
              : isNewUser 
                ? 'Create your new account'
                : 'Welcome back! Sign in to continue'
            }
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
                onBlur={handleEmailBlur}
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? 'Processing...' 
                : isNewUser === null 
                  ? 'Continue'
                  : isNewUser 
                    ? 'Create Account'
                    : 'Sign In'
              }
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}