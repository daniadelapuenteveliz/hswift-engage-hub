// Mock data for HSwift platform

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  membership: 'Free' | 'Pro' | 'Premium';
  createdAt: string;
  lastLogin: string;
}

export interface Tenant {
  id: string;
  name: string;
  description: string;
  phoneNumbers: PhoneNumber[];
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface PhoneNumber {
  id: string;
  number: string;
  whatsappConnected: boolean;
  templates: MessageTemplate[];
  conversations: number;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Conversation {
  id: string;
  contactName: string;
  contactPhone: string;
  status: 'waiting' | 'bot_responding' | 'escalated' | 'resolved';
  lastMessage: string;
  lastActivity: string;
  currentAgent: string;
  messages: number;
  tenantId: string;
  phoneNumberId: string;
}

export interface Analytics {
  totalConversations: number;
  avgResponseTime: number;
  successRate: number;
  activeUsers: number;
  period: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'usuario',
    email: 'admin@hswift.com',
    role: 'admin',
    membership: 'Pro',
    createdAt: '2024-01-15',
    lastLogin: '2024-07-25'
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@hswift.com',
    role: 'manager',
    membership: 'Pro',
    createdAt: '2024-02-10',
    lastLogin: '2024-07-24'
  }
];

// Mock Tenants
export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'E-commerce Solutions',
    description: 'Customer support for online retail',
    phoneNumbers: [
      {
        id: '1',
        number: '+1-555-0101',
        whatsappConnected: true,
        templates: [
          {
            id: '1',
            name: 'Welcome Message',
            content: 'Hello {{name}}! Welcome to our store. How can we help you today?',
            variables: ['name'],
            category: 'greeting',
            status: 'approved'
          },
          {
            id: '2',
            name: 'Order Status',
            content: 'Your order {{order_id}} is {{status}}. Expected delivery: {{date}}',
            variables: ['order_id', 'status', 'date'],
            category: 'order',
            status: 'approved'
          }
        ],
        conversations: 156
      }
    ],
    createdAt: '2024-01-20',
    status: 'active'
  },
  {
    id: '2',
    name: 'Healthcare Assistant',
    description: 'Medical appointment scheduling and support',
    phoneNumbers: [
      {
        id: '2',
        number: '+1-555-0102',
        whatsappConnected: true,
        templates: [
          {
            id: '3',
            name: 'Appointment Reminder',
            content: 'Hi {{patient_name}}, this is a reminder for your appointment on {{date}} at {{time}}.',
            variables: ['patient_name', 'date', 'time'],
            category: 'reminder',
            status: 'approved'
          }
        ],
        conversations: 89
      }
    ],
    createdAt: '2024-02-15',
    status: 'active'
  }
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    contactName: 'John Smith',
    contactPhone: '+1-555-1234',
    status: 'waiting',
    lastMessage: 'I need help with my order',
    lastActivity: '2 minutes ago',
    currentAgent: 'Order Support Bot',
    messages: 3,
    tenantId: '1',
    phoneNumberId: '1'
  },
  {
    id: '2',
    contactName: 'Maria Garcia',
    contactPhone: '+1-555-5678',
    status: 'bot_responding',
    lastMessage: 'What are your business hours?',
    lastActivity: '5 minutes ago',
    currentAgent: 'FAQ Bot',
    messages: 2,
    tenantId: '1',
    phoneNumberId: '1'
  },
  {
    id: '3',
    contactName: 'David Wilson',
    contactPhone: '+1-555-9012',
    status: 'escalated',
    lastMessage: 'I want to speak to a human agent',
    lastActivity: '15 minutes ago',
    currentAgent: 'Human Agent Required',
    messages: 8,
    tenantId: '1',
    phoneNumberId: '1'
  },
  {
    id: '4',
    contactName: 'Sarah Johnson',
    contactPhone: '+1-555-3456',
    status: 'resolved',
    lastMessage: 'Thank you for your help!',
    lastActivity: '1 hour ago',
    currentAgent: 'Support Complete',
    messages: 12,
    tenantId: '1',
    phoneNumberId: '1'
  }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalConversations: 1247,
  avgResponseTime: 2.3,
  successRate: 89.5,
  activeUsers: 156,
  period: 'Last 30 days'
};

// Auth function
export const authenticateUser = (username: string, password: string): User | null => {
  if (username === 'usuario' && password === 'pass') {
    return mockUsers[0];
  }
  return null;
};