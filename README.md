# Senfibem France Frontend

Senfibem France is a professional services platform that connects professionals with clients, featuring job listings, recruitment tools, and service management capabilities.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Styling](#styling)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

This is the frontend application for Senfibem France, built with Next.js. It provides a comprehensive platform for professionals, candidates, and recruiters to connect and manage job postings, applications, and services.

## Technologies Used

- **Next.js 16** - React framework for production
- **TypeScript** - Strongly typed programming language
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible low-level UI components
- **Lucide React** - Beautifully simple icons
- **TanStack Query** - Server state management
- **Zustand** - State management
- **NextAuth.js** - Authentication solution
- **React Hook Form** + **Zod** - Form validation
- **Recharts** - Charting library

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn package manager
- Git
- Access to the backend API (typically running on port 8000)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd senfibemfrance_test/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure your environment variables (see Environment Variables section below)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Authentication secret for NextAuth.js
AUTH_SECRET="your-auth-secret-here"

# Backend API URLs
NEXT_PUBLIC_BACKEND_URL='http://localhost:8000'
BACKEND_URL='http://localhost:8000'

# OAuth Client Credentials
NEXT_FIBEM_CLIENT_ID="your-client-id"
NEXT_FIBEM_CLIENT_SECRET="your-client-secret"
```

### Environment Variable Details

- `AUTH_SECRET`: Secret key for NextAuth.js encryption. Generate a secure random string.
- `NEXT_PUBLIC_BACKEND_URL`: Base URL for the backend API. Used by client-side code.
- `BACKEND_URL`: Internal URL for backend API. Used by server-side code.
- `NEXT_FIBEM_CLIENT_ID`: OAuth client ID for authentication.
- `NEXT_FIBEM_CLIENT_SECRET`: OAuth client secret for authentication.

> **Note**: The `NEXT_PUBLIC_*` prefix is required for variables that need to be accessible in the browser.

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:3000`.

### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

The application will start on `http://localhost:3000` (or the port specified in the PORT environment variable).

### Other Scripts

- `npm run lint`: Run linting checks
- `npm run build`: Create a production build

## Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── logo.png
│   └── images/
├── src/
│   ├── app/               # Next.js 13+ App Router pages
│   │   ├── [locale]/      # Internationalized routes
│   │   │   ├── (auth)/    # Authentication pages
│   │   │   ├── (marketing)/ # Marketing pages
│   │   │   ├── dashboard/ # Dashboard pages
│   │   │   └── ...       # Other route groups
│   │   └── layout.tsx    # Root layout
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Radix UI components
│   │   └── ...          # Custom components
│   ├── stores/           # Zustand stores
│   ├── actions/          # API calls and server actions
│   ├── types/            # TypeScript type definitions
│   ├── auth.ts           # Authentication configuration
│   └── proxy.ts          # Proxy configuration
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Features

### User Roles
- **CANDIDAT**: Job seekers who can browse and apply for positions
- **RECRUTEUR**: Employers who can post jobs and manage applications
- **PROFESSIONNEL**: Service providers who can offer their services
- **ADMIN**: Platform administrators

### Key Functionalities

#### For Candidates
- Browse job listings
- Apply for positions
- Manage profile and CV
- Track application status

#### For Recruiters
- Post job offers
- Manage applications
- View candidate profiles
- Access recruitment tools
- View statistics and analytics

#### For Professionals
- Create service profiles
- Manage portfolio
- Receive client requests
- Handle invoicing

#### Common Features
- User authentication and authorization
- Dashboard with role-specific views
- Responsive design for all devices
- Internationalization support

## API Integration

The application communicates with the backend API through the following:

1. **Actions**: Located in `src/actions/`, these handle API calls
2. **Axios Configuration**: Found in `src/actions/config.ts`
3. **Endpoints**: Various API endpoints for jobs, applications, users, etc.

### Available Actions

- `fetchJobOffers()` - Retrieve job listings
- `createJobOffer()` - Create new job posting
- `updateJobOffer()` - Update existing job posting
- `deleteJobOffer()` - Delete job posting
- `applyForJob()` - Submit job application
- `fetchRecruiterApplications()` - Get applications for recruiter

## Authentication

The application uses NextAuth.js for authentication with the following features:

- OAuth-based login system
- Session management
- Role-based access control
- Secure token handling

Authentication is configured in `src/auth.ts`.

## Styling

### Color Palette (FIBEM Brand Colors)
- **Primary**: `#379DE0` (Deep blue)
- **Secondary**: `#3B82F6` (Bright blue)
- **Accent**: `#faab22` (Orange/amber accent)
- **Light**: `#DBEAFE` (Light blue)
- **Dark**: `#1E293B` (Dark slate)

### Typography
- **Font Family**: Inter (with system fallbacks)
- **Custom classes**: Available through Tailwind CSS

### Components
- **UI Library**: Radix UI for accessible components
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization

## Deployment

### Environment Setup

For deployment, ensure your environment variables are properly configured:

```env
NEXT_PUBLIC_BACKEND_URL='https://your-backend-domain.com'
AUTH_SECRET='your-production-auth-secret'
NEXT_FIBEM_CLIENT_ID='your-production-client-id'
NEXT_FIBEM_CLIENT_SECRET='your-production-client-secret'
```

### Building for Production

```bash
npm run build
```

### Deploying to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Deploying Elsewhere

The application can be deployed to any platform that supports Next.js applications (Netlify, AWS, Azure, etc.) by building the application and serving the static files.

## Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
- Ensure `.env.local` is in the root directory
- Check that variables are prefixed with `NEXT_PUBLIC_` if needed client-side
- Restart the development server after changing environment variables

#### 2. API Connection Issues
- Verify `NEXT_PUBLIC_BACKEND_URL` points to the correct backend address
- Ensure the backend server is running
- Check CORS settings in the backend

#### 3. Authentication Problems
- Verify OAuth credentials are correct
- Check that redirect URIs are properly configured
- Ensure `AUTH_SECRET` is consistent across environments

#### 4. Build Errors
- Run `npm run dev` to see detailed error messages
- Check TypeScript compilation errors
- Verify all dependencies are installed

#### 5. Component Import Issues
- Ensure all imports use the `@/*` alias correctly
- Check that the `tsconfig.json` paths are configured properly

### Development Tips

- Use the development server (`npm run dev`) for hot reloading
- Check browser console and terminal for error messages
- Use the Next.js development tools for debugging
- Leverage TypeScript for type safety

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use Tailwind CSS utility classes consistently
- Maintain accessibility standards
- Write meaningful commit messages
- Update documentation as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or open an issue in the repository.