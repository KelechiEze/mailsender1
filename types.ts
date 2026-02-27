
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export enum Page {
  Dashboard = 'Dashboard',
  Compose = 'Compose',
  Templates = 'Templates',
  SMTP = 'SMTP Settings',
  Databases = 'Databases',
  Campaigns = 'Campaigns',
  Logs = 'Email Logs',
  Analytics = 'Analytics',
  Profile = 'Profile'
}

export interface SMTPConfig {
  id: string;
  name: string;
  provider: 'gmail' | 'hostinger' | 'custom';
  email: string;
  username: string;
  password?: string;
  host: string;
  port: number;
  encryption: 'SSL' | 'TLS' | 'None';
  isDefault: boolean;
}

export type DatabaseType = 'firebase' | 'mysql' | 'postgres' | 'mongodb' | 'supabase' | 'csv' | 'google_sheets' | 'excel';

export interface DatabaseConnection {
  id: string;
  name: string;
  type: DatabaseType;
  status: 'connected' | 'disconnected';
  recordCount: number;
  spreadsheetData?: any[];
  columnHeaders?: string[];
}

export interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
}

export interface EmailLog {
  id: string;
  recipient: string;
  status: 'sent' | 'failed' | 'pending';
  smtpUsed: string;
  date: string;
  opened: boolean;
  error?: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'draft';
  sent: number;
  opened: number;
  date: string;
}
