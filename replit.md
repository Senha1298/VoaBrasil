# Overview

This is a full-stack web application built with React and Express that appears to be designed for displaying news content, specifically about the "Voa Brasil" flight ticket program. The application uses a modern tech stack with TypeScript, Vite for the frontend build process, and includes a comprehensive UI component library based on Radix UI and shadcn/ui.

The project implements a news article page with responsive design and mobile-first approach, featuring a CNN Brasil-style layout with header navigation, article content, and audio playback capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Component Library**: Comprehensive UI library built on Radix UI primitives and shadcn/ui components
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript for full-stack type safety
- **Development**: tsx for TypeScript execution in development mode
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Data Storage
- **Database**: PostgreSQL configured with Drizzle ORM for type-safe database operations
- **Provider**: Neon Database (serverless PostgreSQL) for production deployment
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Development Storage**: In-memory storage implementation for local development and testing

## Authentication & Session Management
- **Session Storage**: connect-pg-simple for PostgreSQL-based session storage
- **User Schema**: Basic user model with username/password authentication structure

## UI/UX Design System
- **Design Language**: shadcn/ui "new-york" style with neutral base colors
- **Theming**: CSS custom properties for light/dark mode support
- **Typography**: Roboto font family with multiple weights (400, 700, 900)
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Component Architecture**: Modular component system with consistent styling patterns

## Build & Development
- **Frontend**: Vite with React plugin and TypeScript support
- **Backend**: esbuild for production bundle optimization
- **Development Tools**: Replit integration with runtime error overlay and cartographer plugin
- **Path Aliases**: Configured path mapping for clean imports (@/, @shared/, @assets/)

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database provider for production
- **Drizzle ORM**: Type-safe ORM for database operations and schema management

## UI & Styling
- **Radix UI**: Comprehensive set of accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library providing consistent iconography
- **Font Awesome**: Additional icon set for specific UI elements
- **Google Fonts**: Roboto font family hosting

## Development Tools
- **Replit Plugins**: Development environment integration with error handling and debugging tools
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins

## Form & Validation
- **React Hook Form**: Performance-focused form library for complex form handling
- **Zod**: TypeScript-first schema validation for form data and API contracts

## Additional Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx & twMerge**: Utility functions for conditional CSS class management
- **cmdk**: Command palette component for enhanced user interactions
- **Embla Carousel**: Touch-friendly carousel component for content display