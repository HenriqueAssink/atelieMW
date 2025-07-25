Ateliê Márcia Waltrick - Website
Overview
This is a full-stack web application for Ateliê Márcia Waltrick, a custom lingerie and swimwear atelier. The application is built with a modern tech stack using React for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for data persistence. The project follows a monorepo structure with shared schemas and clean separation between client and server code.

Major Update (July 24, 2025): Implemented dynamic dropdown navigation menu system with comprehensive category management capabilities.

User Preferences
Preferred communication style: Simple, everyday language.

System Architecture
Frontend Architecture
Framework: React 18 with TypeScript
Styling: Tailwind CSS with shadcn/ui component library
Routing: Wouter for client-side routing
State Management: TanStack Query for server state management
Build Tool: Vite for development and production builds
Design System: Dark theme with charcoal background, gold accents (brand colors)
Backend Architecture
Runtime: Node.js with Express.js framework
Language: TypeScript with ES modules
API Design: RESTful API with conventional HTTP methods
Authentication: JWT-based authentication for admin access
Password Hashing: bcrypt for secure password storage
Middleware: Custom logging and error handling
Database Architecture
Database: PostgreSQL (configured for Neon serverless)
ORM: Drizzle ORM with TypeScript schema definitions
Migration: Drizzle Kit for schema management
Connection: Connection pooling with @neondatabase/serverless
Key Components
Data Models
Users: Admin authentication system
Categories: Product categorization (lingerie, swimwear)
Products: Catalog items with images, descriptions, and metadata
Orders: Customer order management with status tracking
PageContent: Dynamic content management for website pages
FaqItems: Frequently asked questions management
UI Components
Product Management: Product cards, detailed views, and admin forms
Dynamic Navigation: Responsive header with dropdown menu system that automatically updates based on categories
Category Management: Comprehensive admin interface for creating, editing, and managing product categories
Content Display: Hero sections, galleries, and informational pages
Admin Interface: Dashboard for conSet-ExecutionPolicy RemoteSigned
tent, category, and order management
Contact Integration: WhatsApp integration for customer communication
Authentication System
JWT token-based authentication for admin access
Secure password storage with bcrypt
Protected admin routes and API endpoints
Local storage for token persistence
Data Flow
Public User Flow
Users browse categories and products
Product details displayed with high-quality images
WhatsApp integration for direct customer contact
FAQ and contact information readily available
Admin Flow
Admin login with JWT authentication
Dashboard access for product and order management
CRUD operations on all content types
Real-time updates with TanStack Query
API Communication
RESTful endpoints for all data operations
JSON request/response format
Error handling with appropriate HTTP status codes
Request logging for debugging and monitoring
External Dependencies
Frontend Dependencies
UI Framework: Radix UI primitives for accessible components
Icons: Lucide React for consistent iconography
Forms: React Hook Form with Zod validation
Styling: Tailwind CSS with PostCSS processing
Backend Dependencies
Database: Neon PostgreSQL serverless database
Authentication: jsonwebtoken for JWT handling
Security: bcrypt for password hashing
Development: tsx for TypeScript execution
Development Tools
Linting: ESLint configuration
Type Checking: TypeScript strict mode
Build: esbuild for production server bundling
Deployment Strategy
Development Environment
Vite dev server for frontend with HMR
tsx for backend TypeScript execution
Environment variables for database configuration
Replit-specific plugins for development experience
Production Build Process
Frontend: Vite builds React app to static files
Backend: esbuild bundles server code to single file
Database migrations run via Drizzle Kit
Environment variables configure production database
Hosting Considerations
Static frontend can be served from any CDN
Node.js backend requires server environment
PostgreSQL database (Neon serverless recommended)
Environment variables for sensitive configuration
Performance Optimizations
Image optimization for product galleries
Lazy loading for better performance
TanStack Query caching for reduced API calls
Responsive design for mobile-first experience
Recent Changes (July 24, 2025)
Dynamic Navigation Menu System
Navigation Structure: Changed from static links (Início | Lingerie | Moda Praia | FAQ | Contato) to dynamic dropdown structure (Início | Produtos ▾ | FAQ | Contato)
Category Dropdown: Implemented NavigationMenu component with dynamic category listing
Mobile Support: Updated mobile navigation to include expandable products section
Database Integration: Categories are automatically fetched and displayed in navigation
Category Management System
Admin Interface: Created comprehensive category management in admin dashboard
CRUD Operations: Full create, read, update, delete functionality for categories
Form Validation: Zod schema validation with automatic slug generation
User Experience: Intuitive forms with proper error handling and success feedback
Database Schema: Fixed array type issues in products table (images column)
Technical Improvements
Type Safety: Fixed TypeScript type issues with nullable fields
CSS Organization: Corrected import order for better performance
Component Structure: Modular category form and management components
API Integration: Enhanced category endpoints with proper error handling
