# HSwift - Conversational Bot Management Platform

HSwift is a professional multi-tenant platform for managing conversational bots, with a focus on WhatsApp integration. Built with React, TypeScript, and modern UI components.

## 🚀 Features

### Core Functionality
- **Multi-tenant Architecture**: Manage multiple clients and their bots
- **User Management**: Role-based access control with custom roles
- **Conversational Bot Management**: Create and manage WhatsApp bots
- **Real-time Conversations**: Trello-style board for conversation management
- **Analytics Dashboard**: Comprehensive metrics and insights
- **Membership System**: Free, Pro, and Premium tiers

### Key Pages
- **Dashboard**: Overview of metrics, recent conversations, and quick actions
- **Tenants**: Manage clients and their phone numbers
- **Conversations**: Kanban-style board for conversation monitoring
- **Templates & Prompts**: Message template management (coming soon)
- **Users & Roles**: User management with custom roles (coming soon)
- **Analytics**: Detailed insights and reporting (coming soon)
- **Membership**: Subscription management (coming soon)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation

## 🎨 Design System

HSwift uses a professional design system with:
- **Colors**: Deep blues and purples for a professional look
- **Typography**: Clean, modern font hierarchy
- **Components**: Consistent, reusable UI components
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-git-url>
   cd hswift-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Sidebar, AppLayout)
│   └── ui/             # shadcn/ui components
├── contexts/           # React contexts (Auth, etc.)
├── data/              # Mock data and types
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Main application pages
└── App.tsx            # Main application component
```

### Key Files
- `src/data/mockData.ts` - Mock data for development
- `src/contexts/AuthContext.tsx` - Authentication management
- `src/components/layout/AppSidebar.tsx` - Main navigation
- `src/index.css` - Design system tokens and global styles
- `tailwind.config.ts` - Tailwind configuration

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Mock Data
The application currently uses mock data stored in `src/data/mockData.ts`. This simulates a REST API and includes:
- User authentication
- Tenant management
- Conversation data
- Analytics metrics

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `src/App.tsx`
4. Extend mock data in `src/data/mockData.ts`

## 🎯 Future Enhancements

### Backend Integration
- Replace mock data with REST API calls
- Add proper authentication with JWT
- Implement real-time features with WebSockets

### Features to Implement
- Template editor with visual flow builder
- Advanced analytics with charts
- Real WhatsApp API integration
- Payment processing
- Multi-language support

### Technical Improvements
- Add proper error boundaries
- Implement data caching with React Query
- Add comprehensive testing
- Performance optimizations

## 🔒 Authentication

The platform includes a mock authentication system:
- Username/password login
- Protected routes
- User session management
- Role-based access control (foundation)

## 📱 Responsive Design

HSwift is designed mobile-first with:
- Responsive sidebar that collapses on mobile
- Touch-friendly interface elements
- Optimized layouts for all screen sizes
- Progressive web app capabilities

## 🎨 Customization

### Design System
The design system is fully customizable through:
- `src/index.css` - CSS custom properties for colors, spacing, etc.
- `tailwind.config.ts` - Tailwind theme configuration
- Component variants in shadcn/ui components

### Theming
Colors and styles are defined as semantic tokens:
- Primary colors for brand identity
- Semantic colors for status and feedback
- Consistent spacing and typography scales

## 📄 License

This project is part of a demo/portfolio application. Please refer to your organization's licensing requirements.

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding comprehensive testing
- Implementing proper error handling
- Adding accessibility features
- Performance optimization
- Security hardening

---

Built with ❤️ using React, TypeScript, and modern web technologies.