'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserData } from '../lib/auth';
import { UserData } from '../types/user';

//Define the shape of our authentication context
interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
}

//Create the context with undefined as default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

//Provider component that wraps the app and provides auth state
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser && firebaseUser.email) {
        // Get user data from Firestore
        const data = await getUserData(firebaseUser.email);
        setUserData(data);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

      //Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userData,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}