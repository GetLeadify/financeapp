import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { FinancialData } from '../types';
import * as connectedData from '../data/mockData-connected';

/**
 * Fetches the financial data for a given user from Firestore.
 * @param userId The user's unique ID from Firebase Auth.
 * @returns The user's financial data object, or null if it doesn't exist.
 */
export const getUserData = async (userId: string): Promise<FinancialData | null> => {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data() as FinancialData;
  } else {
    console.log('No such document for user:', userId);
    return null;
  }
};

/**
 * Creates an initial financial data document for a new user in Firestore.
 * Uses the `mockData-connected` as a starting template.
 * @param userId The new user's unique ID.
 * @param userName The new user's display name.
 */
export const initializeUserData = async (userId: string, userName: string) => {
  const userDocRef = doc(db, 'users', userId);
  
  // Create a fresh copy of the seed data
  const initialData: FinancialData = {
    ...connectedData,
    user: {
      ...connectedData.user,
      name: userName,
      initials: userName.split(' ').map(n => n[0]).join(''),
    }
  };

  try {
    await setDoc(userDocRef, initialData);
    console.log('User document created for:', userId);
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
};