# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js LMS (Learning Management System) application with integrated Claude AI tutoring capabilities. The app provides a sidebar navigation interface with sections for syllabus, assignments, lectures, and Claude AI tutoring.

## Common Development Commands

\`\`\`bash
# Development
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Package management
npm install          # Install dependencies
\`\`\`

## Architecture Overview

### Core Application Structure
- **App Router**: Uses Next.js 15 app directory structure with React 19
- **Main Layout**: Single-page application with sidebar navigation (`components/layout/main-layout.tsx`)
- **Page Components**: Separate page components for each section (`components/pages/`)
- **API Integration**: Claude AI integration via `/app/api/chat/route.tsx` endpoint

### Key Architectural Patterns
- **State Management**: React useState for local state, no external state management
- **Navigation**: Section-based routing handled via state (`activeSection`) rather than Next.js routing
- **Component Structure**: 
  - Layout components in `components/layout/`
  - Page components in `components/pages/`
  - Reusable UI components in `components/ui/` (shadcn/ui)

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: Anthropic SDK with Claude 3.5 Sonnet
- **Fonts**: Playfair Display (serif) and Source Sans 3 (sans-serif)

## Environment Configuration

### Required Environment Variables
- `ANTHROPIC_API_KEY`: Must be set for Claude AI functionality (format: `sk-ant-*`)

### Configuration Notes
- ESLint and TypeScript errors are ignored during builds (`next.config.mjs`)
- Images are unoptimized for deployment compatibility
- Uses `@/*` path alias for imports

## Claude AI Integration

### Chat API Endpoint (`/app/api/chat/route.tsx`)
- Handles POST requests with message and conversation history
- Includes comprehensive error handling and API key validation
- Uses Claude 3.5 Sonnet with 1000 max tokens
- System prompt optimized for educational tutoring context with consciousness-competence classification

### Assignment Context Integration
- Claude page can be pre-loaded with assignment context via `assignmentId`
- Automatically builds prompts with assignment instructions, rubric, and feedback for graded assignments
- Assignment data is hardcoded in `components/pages/assignments.tsx` and `components/pages/claude.tsx`

## UI Component System

### shadcn/ui Configuration
- Style: "new-york" variant
- Base color: neutral
- CSS variables enabled
- Components configured with path aliases

### Component Patterns
- All components use TypeScript interfaces for props
- UI components follow shadcn/ui patterns
- Consistent use of Card, Button, Badge, and other primitives
- Icons from lucide-react library

## Assignment Data Structure

Assignment data is currently hardcoded with the following structure:
- **Current Assignments**: Include instructions, rubric, due dates, difficulty levels
- **Graded Assignments**: Include feedback, scores, code examples, detailed rubric breakdown
- Both types support Claude AI integration for contextual help

## Additional Integrations

### Usetiful Analytics
- User onboarding and analytics integration via `components/usetiful-provider.tsx`
- Provides user behavior tracking and guided tours
- Initialized with unique token for session management

## Deployment

- **Platform**: Vercel
- **Live URL**: https://claude-lms-assistant.vercel.app/
- **Build Configuration**: ESLint and TypeScript errors ignored for faster deployment
- **Images**: Unoptimized for compatibility

## Development Notes

- The application disables build-time ESLint and TypeScript checks for faster deployment
- Uses client-side rendering for interactive components
- Responsive design with mobile-first approach
- Consistent spacing and layout patterns using Tailwind CSS
