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
  templates?: Template[];
  conversations: number;
}



export interface Template {
  id: string;
  name: string;
  content: string;
  recipients: number;
  language: string;
  status: 'approved' | 'pending' | 'rejected';
  category: 'Marketing' | 'Utility' | 'Authentication';
  version: string;
  examples?: { [key: string]: string };
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
    name: 'Boe',
    description: 'Medical distribution',
    phoneNumbers: [
      {
        id: '1',
        number: '+1-555-0101',
        whatsappConnected: true,

        conversations: 156
      }
    ],
    createdAt: '2024-01-20',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sodtrack',
    description: 'In place work manager',
    phoneNumbers: [
      {
        id: '2',
        number: '+1-555-0102',
        whatsappConnected: true,

        conversations: 89
      }
    ],
    createdAt: '2024-02-15',
    status: 'active'
  }
];

// Mock Templates
export const templates: Template[] = [
  {
    id: 'tpl_001',
    name: 'Bienvenida a Nuevos Usuarios',
    content: '¡Hola {{nombre}}! Bienvenido a nuestra comunidad. Estamos felices de tenerte con nosotros.',
    recipients: 1250,
    language: 'Español',
    status: 'approved',
    category: 'Marketing',
    version: '1.2',
    examples: { nombre: 'Ana' },
  },
  {
    id: 'tpl_002',
    name: 'Recordatorio de Carrito Abandonado',
    content: '¡Hola {{nombre}}! Notamos que dejaste algunos artículos en tu carrito. ¡Completa tu compra ahora y obtén un 10% de descuento!',
    recipients: 890,
    language: 'Español',
    status: 'approved',
    category: 'Marketing',
    version: '1.5',
    examples: { nombre: 'Carlos' },
  },
  {
    id: 'tpl_003',
    name: 'Confirmación de Pedido',
    content: 'Tu pedido #{{numero_pedido}} ha sido confirmado. Lo recibirás en los próximos 3-5 días hábiles. ¡Gracias por tu compra!',
    recipients: 4320,
    language: 'Español',
    status: 'approved',
    category: 'Utility',
    version: '2.0',
    examples: { numero_pedido: '987654' },
  },
  {
    id: 'tpl_005',
    name: 'Oferta Especial de Aniversario',
    content: '¡Feliz aniversario, {{nombre}}! Como cliente fiel, te ofrecemos un 25% de descuento en tu próxima compra con el código ANIVERSARIO25.',
    recipients: 650,
    language: 'Español',
    status: 'pending',
    category: 'Marketing',
    version: '1.1',
    examples: { nombre: 'Elena' },
  },
  {
    id: 'tpl_006',
    name: 'Notificación de Envío',
    content: '¡Buenas noticias! Tu pedido #{{numero_pedido}} ha sido enviado. Puedes rastrearlo aquí: {{enlace_rastreo}}',
    recipients: 4100,
    language: 'English',
    status: 'approved',
    category: 'Utility',
    version: '1.8',
    examples: { numero_pedido: '112233', enlace_rastreo: 'https://bit.ly/3xyzABC' },
  },
  {
    id: 'tpl_007',
    name: 'Encuesta de Satisfacción',
    content: 'Hola {{nombre}}, ¿podrías calificar tu experiencia con nuestro servicio? Tu opinión es muy importante para nosotros. {{enlace_encuesta}}',
    recipients: 3200,
    language: 'Español',
    status: 'approved',
    category: 'Utility',
    version: '1.3',
    examples: { nombre: 'David', enlace_encuesta: 'https://forms.gle/xyz123' },
  },
  {
    id: 'tpl_004',
    name: 'Código de Verificación',
    content: 'Tu código de verificación es: {{codigo}}. No lo compartas con nadie.',
    recipients: 7650,
    language: 'English',
    status: 'approved',
    category: 'Authentication',
    version: '1.0',
    examples: { codigo: 'G-123456' },
  },
  {
    id: 'tpl_008',
    name: 'Password Reset Request',
    content: 'We received a request to reset your password. If you did not make this request, please ignore this message. Otherwise, use this code: {{reset_code}}',
    recipients: 540,
    language: 'English',
    status: 'rejected',
    category: 'Authentication',
    version: '1.0',
    examples: { reset_code: '987-123' },
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
    currentAgent: 'Order Support Agent',
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
    currentAgent: 'FAQ Agent',
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