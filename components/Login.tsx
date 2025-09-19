import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';
import { ICONS } from '../constants';

export const Login: React.FC = () => {

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-origin-bg-dark text-center p-4">
      <div className="flex items-center mb-6">
        <div className="bg-origin-primary p-3 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h1 className="text-4xl font-bold text-white ml-4">Origin</h1>
      </div>
      <p className="text-lg text-origin-text-light max-w-md mb-8">
        Your all-in-one platform to manage spending, investments, and financial wellness.
      </p>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center px-6 py-3 bg-white text-origin-text-dark font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
      >
        <span className="mr-3">{ICONS.google}</span>
        Sign In with Google
      </button>
    </div>
  );
};