export type View = 'dashboard' | 'spending' | 'investments' | 'goals';

export interface User {
  name: string;
  email: string;
  initials: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'Checking' | 'Savings' | 'Credit Card' | 'Investment';
  balance: number;
  last4: string;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  account: string;
}

export interface Investment {
  id: string;
  name: string;
  ticker: string;
  value: number;
  change: number;
  changePercent: number;
  shares: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  emoji: string;
}

export interface NetWorthDataPoint {
    month: string;
    netWorth: number;
}

export interface PortfolioDataPoint {
    date: string;
    value: number;
}

export interface BudgetItem {
    category: string;
    spent: number;
    budget: number;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  dueDate: string; // YYYY-MM-DD
  category: 'bills' | 'shopping' | 'other' | 'food' | 'transport';
  logo?: string; // URL or identifier for logo
}


export interface FinancialData {
    user: User;
    accounts: Account[];
    transactions: Transaction[];
    investments: Investment[];
    goals: Goal[];
    netWorthHistory: NetWorthDataPoint[];
    portfolioHistory: PortfolioDataPoint[];
    budgetItems: BudgetItem[];
    subscriptions: Subscription[];
}