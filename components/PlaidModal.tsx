import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface PlaidModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type Step = 'selection' | 'loading' | 'success';

const banks = [
    { name: 'Chase', logo: ICONS.bank },
    { name: 'Bank of America', logo: ICONS.bank },
    { name: 'Wells Fargo', logo: ICONS.bank },
    { name: 'Capital One', logo: ICONS.bank },
    { name: 'U.S. Bank', logo: ICONS.bank },
    { name: 'Citi', logo: ICONS.bank },
];

export const PlaidModal: React.FC<PlaidModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [step, setStep] = useState<Step>('selection');
    const [selectedBank, setSelectedBank] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('selection');
                setSelectedBank(null);
            }, 300); 
        }
    }, [isOpen]);
    
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleBankSelection = (bankName: string) => {
        setSelectedBank(bankName);
    };

    const handleContinue = () => {
        if (!selectedBank) return;
        setStep('loading');
        setTimeout(() => {
            setStep('success');
        }, 2500);
    };

    if (!isOpen) {
        return null;
    }

    const renderContent = () => {
        switch (step) {
            case 'selection':
                return (
                    <>
                        <h2 className="text-xl font-bold text-origin-text-dark mb-1 text-center">Connect an account</h2>
                        <p className="text-center text-gray-500 mb-6">Origin uses Plaid to securely connect your accounts.</p>
                        <div className="space-y-3">
                            {banks.map(bank => (
                                <button
                                    key={bank.name}
                                    onClick={() => handleBankSelection(bank.name)}
                                    className={`w-full flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${selectedBank === bank.name ? 'border-origin-primary bg-blue-50' : 'border-gray-200 hover:border-gray-400'}`}
                                >
                                    <span className="text-origin-primary">{bank.logo}</span>
                                    <span className="ml-4 font-semibold text-origin-text-dark">{bank.name}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleContinue}
                            disabled={!selectedBank}
                            className="w-full mt-6 bg-origin-primary text-white font-bold py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-900 transition-colors"
                        >
                            Continue
                        </button>
                    </>
                );
            case 'loading':
                return (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="w-16 h-16 border-4 border-origin-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 font-semibold text-origin-text-dark">Connecting to {selectedBank}...</p>
                    </div>
                );
            case 'success':
                return (
                     <div className="flex flex-col items-center justify-center text-center h-64">
                        <span className="text-green-500">{ICONS['check-circle']}</span>
                        <h2 className="text-2xl font-bold text-origin-text-dark mt-4">Success!</h2>
                        <p className="text-gray-600 mt-2">Your {selectedBank} account has been securely connected.</p>
                        <p className="text-xs text-gray-400 mt-1">(Your data will now be synced from your account.)</p>
                        <button
                            onClick={onSuccess}
                            className="w-full mt-6 bg-origin-primary text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                );
        }
    };


    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-origin-bg-light rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                     <div className="flex items-center">
                        <div className="bg-origin-primary p-1.5 rounded-md">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        </div>
                        <h1 className="text-lg font-bold text-origin-primary ml-2">Origin</h1>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800">
                        {ICONS.close}
                    </button>
                </div>
                <div className="p-8">
                    {renderContent()}
                </div>
                 <div className="p-4 bg-gray-50 rounded-b-2xl text-center">
                    <p className="text-xs text-gray-400">
                        By selecting Continue, you agree to the <a href="#" className="underline">Plaid End User Privacy Policy</a>.
                    </p>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};