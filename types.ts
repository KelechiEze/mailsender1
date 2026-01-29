
export interface User {
  id: string;
  email: string;
  name: string;
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
  host: string;
  port: number;
  isDefault: boolean;
}

export interface DatabaseConnection {
  id: string;
  name: string;
  type: 'firebase' | 'mysql' | 'postgres' | 'mongodb' | 'supabase' | 'csv';
  status: 'connected' | 'disconnected';
  recordCount: number;
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
