import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserData } from '../types/user';

// Check if user exists in Firestore
export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const userQuery = await getDoc(doc(db, 'users', email));
    return userQuery.exists();
  } catch (error) {
    console.error('Error checking user:', error);
    return false;
  }
}

// Register new user
export async function registerUser(fullName: string, email: string, password: string): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      fullName,
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.email!), userData);
    
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Sign in existing user
export async function signInUser(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Get user data from Firestore
export async function getUserData(email: string): Promise<UserData | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', email));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

// Sign out user
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
}