
import type { FinancialData, Account, Subscription } from '../types';

const user = {
    name: 'Jordan Lee',
    email: 'jordan.lee@email.com',
    initials: 'JL',
};

// FIX: Explicitly type the array as Account[] to enforce the union type for the 'type' property.
const accounts: Account[] = [
  { id: 'c1', name: 'Chase Checking', type: 'Checking', balance: 8450.75, last4: '1234' },
  { id: 'c2', name: 'Amex Gold', type: 'Credit Card', balance: -2450.10, last4: '5678' },
  { id: 'c3', name: 'Fidelity Roth IRA', type: 'Investment', balance: 76500.00, last4: '9012' },
  { id: 'c4', name: 'High-Yield Savings', type: 'Savings', balance: 25000.00, last4: '3456' },
];

const transactions = [
  { id: 'ct1', date: '2024-07-28', merchant: 'Apollo Bagels', amount: 32.00, category: 'food', account: 'Amex Gold' },
  { id: 'ct2', date: '2024-07-27', merchant: 'Netflix', amount: 24.99, category: 'bills', account: 'Amex Gold' },
  { id: 'ct3', date: '2024-07-26', merchant: 'Amtrak Ticket', amount: 77.01, category: 'transport', account: 'Amex Gold' },
  { id: 'ct4', date: '2024-07-25', merchant: 'PG&E', amount: 150.80, category: 'bills', account: 'Chase Checking' },
  { id: 'ct5', date: '2024-07-24', merchant: 'Blue Bottle Coffee', amount: 12.50, category: 'food', account: 'Amex Gold' },
];

const investments = [
  { id: 'ci1', name: 'Fidelity 500 Index', ticker: 'FXAIX', value: 55000.00, change: 80.10, changePercent: 0.15, shares: 300 },
  { id: 'ci2', name: 'Tesla Inc.', ticker: 'TSLA', value: 21500.00, change: -150.45, changePercent: -0.69, shares: 100 },
];

const goals = [
  { id: 'cg1', name: 'New Car', targetAmount: 40000, currentAmount: 15000, emoji: '🚗' },
  { id: 'cg2', name: 'European Getaway', targetAmount: 10000, currentAmount: 8500, emoji: '🏰' },
];

const netWorthHistory = [
    { month: 'Jan', netWorth: 280000 },
    { month: 'Feb', netWorth: 285000 },
    { month: 'Mar', netWorth: 302000 },
    { month: 'Apr', netWorth: 298000 },
    { month: 'May', netWorth: 315000 },
    { month: 'Jun', netWorth: 325472 },
];

const portfolioHistory = [
    { date: 'Jan', value: 60000 },
    { date: 'Feb', value: 63000 },
    { date: 'Mar', value: 69000 },
    { date: 'Apr', value: 68000 },
    { date: 'May', value: 74000 },
    { date: 'Jun', value: 76500 },
];

const budgetItems = [
    { category: 'Food', spent: 415, budget: 650 },
    { category: 'Travel & vacation', spent: 560, budget: 1000 },
    { category: 'Household', spent: 289, budget: 800 },
    { category: 'Auto & transport', spent: 115, budget: 500 },
    { category: 'Childcare & education', spent: 520, budget: 700 },
];

// FIX: Explicitly type the array as Subscription[] to enforce the union type for the 'category' property.
const subscriptions: Subscription[] = [
    { id: 's1', name: 'Rent', amount: 2400.00, dueDate: '2024-08-01', category: 'bills'},
    { id: 's2', name: 'Doordash', amount: 9.99, dueDate: '2024-08-03', category: 'food'},
    { id: 's3', name: 'Spotify', amount: 11.99, dueDate: '2024-08-16', category: 'bills'},
    { id: 's4', name: 'YouTube TV', amount: 82.99, dueDate: '2024-08-16', category: 'bills'},
    { id: 's5', name: 'Amazon Prime', amount: 14.99, dueDate: '2024-08-20', category: 'shopping'},
    { id: 's6', name: 'Car Insurance', amount: 144.99, dueDate: '2024-08-25', category: 'transport'},
];

export const financialData: FinancialData = {
    user,
    accounts,
    transactions,
    investments,
    goals,
    netWorthHistory,
    portfolioHistory,
    budgetItems,
    subscriptions
};