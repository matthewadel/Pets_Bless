# Pet Bless Documentation

## 🎥 **Live Demo & Module Overview**

> **Watch the complete walkthrough of Pet Bless application modules and features**

[![Pet Bless App Demo](https://img.youtube.com/vi/eXdy3tsfquQ/maxresdefault.jpg)](https://www.youtube.com/watch?v=eXdy3tsfquQ&feature=youtu.be)

**[▶️ Click to Watch Full Demo Video](https://www.youtube.com/watch?v=eXdy3tsfquQ&feature=youtu.be)**

_This video provides a comprehensive overview of the application's architecture, modules, and key features including authentication, pet management, search functionality, and responsive design._

---

**App Live Location**: **[https://pets-bless-task.vercel.app/auth/register](https://pets-bless-task.vercel.app/auth/register)**

## Core Features

- **Pet Management**: Browse, search, and manage pets with detailed information
- **Authentication System**: Secure user registration and login functionality
- **Advanced Search & Filtering**: Search by name, filter by status, and browse by tags
- **Pet Details & Updates**: Detailed pet profiles with update capabilities
- **Responsive Design**: Optimized for all device sizes (Desktop, Mobile, Tablet)
- **Smart Caching**: Efficient data fetching with TanStack Query
- **Error Handling**: Graceful error recovery with retry mechanisms
- **Type Safety**: Full TypeScript implementation

## Architecture Overview

The application follows a modular architecture with clear separation of concerns:

```
src/
├── app/           # Next.js App Router pages
│   ├── auth/      # Authentication module
│   └── pets/      # Pet management module
├── components/    # Reusable UI components
├── providers/     # Context providers for state management
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Pets Module (`src/app/pets/`)

The pets module is the core feature of the application, providing comprehensive pet management functionality with a well-organized structure:

```
pets/
├── page.tsx                    # Main pets listing page
├── [id]/                      # Dynamic pet routes
│   ├── page.tsx               # Pet details page
│   └── update/
│       └── page.tsx           # Pet update page
├── _components/               # Pet-specific components
│   ├── index.ts               # Component exports
│   ├── LinksContainer.tsx     # Breadcrumb navigation
│   ├── LoadingSkeleton.tsx    # Grid loading skeleton
│   ├── PetCard.tsx            # Individual pet card
│   ├── PetDetailsSkeleton.tsx # Pet details loading state
│   ├── PetNotFound.tsx        # Pet not found error
│   ├── SearchInput.tsx        # Search functionality
│   └── StatusToggle.tsx       # Status filter component
├── _hooks/                    # Pet data management hooks
│   ├── index.ts               # Hook exports
│   ├── usePet.ts              # Main pets listing hook
│   ├── usePetDetails.ts       # Individual pet details hook
│   └── useUpdatePet.ts        # Pet update operations hook
└── _services/                 # Pet API services
    └── index.ts               # API service functions
```

### Pets Module Features

#### Core Functionality

- **Pet Listing**: Browse all pets with status-based filtering
- **Advanced Search**: Real-time search by pet name with debouncing
- **Tag Filtering**: Filter pets by associated tags
- **Status Management**: Filter by available, pending, or sold status
- **Infinite Pagination**: Smooth scrolling with automatic loading
- **Pet Details**: Comprehensive pet information display
- **Pet Updates**: Modify pet information and status

#### Performance Features

- **Smart Caching**: 10-minute cache for optimal performance
- **Client-side Filtering**: Immediate search and filter responses
- **Optimized Rendering**: Memoized components and data processing
- **Background Loading**: Seamless data fetching without blocking UI

## Authentication Module (`src/app/auth/`)

The authentication module provides secure user management with a comprehensive folder structure:

```
auth/
├── login/                     # Login page route
│   └── page.tsx               # Login form page
├── register/                  # Registration page route
│   └── page.tsx               # Registration form page
├── _actions/                  # Server actions for form handling
│   ├── index.ts               # Action exports
│   ├── login.ts               # Login server action
│   └── register.ts            # Registration server action
├── _hooks/                    # Authentication hooks
│   ├── index.ts               # Hook exports
│   ├── useGetUser.ts          # User data fetching hook
│   ├── useLogin.ts            # Login functionality hook
│   └── useRegister.ts         # Registration functionality hook
├── _schemas/                  # Zod validation schemas
│   ├── index.ts               # Schema exports
│   ├── login.ts               # Login form validation
│   └── register.ts            # Registration form validation
└── _services/                 # Authentication API services
    └── index.ts               # API service functions
```

### Authentication Module Details

#### `_actions/` - Server Actions

This folder contains Next.js server actions for handling form submissions securely on the server side.

**`login.ts`**

- Validates login form data using Zod schemas
- Handles authentication with Pet Store API
- Returns structured success/error responses
- Manages user session data

**`register.ts`**

- Processes registration form submissions
- Validates user data comprehensively
- Creates new user accounts via API
- Handles registration errors gracefully

#### `_hooks/` - Authentication Hooks

Custom React hooks that manage authentication state and provide clean interfaces for components.

**`useLogin.ts`**

- Manages login form state and validation
- Handles login mutations with TanStack Query
- Provides error handling and loading states
- Integrates with user data fetching

**`useRegister.ts`**

- Manages registration form state
- Handles user creation process
- Provides comprehensive error feedback
- Manages form validation states

**`useGetUser.ts`**

- Fetches authenticated user data
- Manages user session state
- Provides loading and error states
- Handles user data caching

#### `_schemas/` - Validation Schemas

Zod schemas for type-safe form validation and data structure enforcement.

**`login.ts`**

- Username validation (required, minimum length)
- Password validation (required, minimum length)
- Type inference for form data

**`register.ts`**

- Comprehensive user data validation
- Email format validation
- Phone number validation
- Password strength requirements
- Name field validations

#### `_services/` - API Services

Service layer for authentication-related API calls and external integrations.

**Features:**

- Pet Store API integration
- User authentication endpoints
- User registration endpoints
- User data retrieval functions
- Error handling and response parsing

## Module Documentation

### App Router (`src/app/`)

The application uses Next.js 15's App Router for file-based routing and modern React features.

#### `layout.tsx`

Root layout component that wraps the entire application with essential providers and global configurations.

**Key Features:**

- Sets up global providers (TanStack Query, Auth Provider)
- Configures global styling with Tailwind CSS
- Applies Geist font family
- Defines SEO metadata

#### `page.tsx`

Home page that serves as the main entry point, redirecting authenticated users to the pets listing.

#### Authentication Pages

- **`auth/login/page.tsx`**: User login page with form validation
- **`auth/register/page.tsx`**: User registration page with comprehensive form validation

**Features:**

- Secure authentication flow
- Form validation with Zod schemas
- Error handling and user feedback
- Redirect management for protected routes

#### Pet Management Pages

**`pets/page.tsx`**
Main pet listing page with advanced search and filtering capabilities.

**Features:**

- Status-based filtering (available, pending, sold)
- Real-time search functionality with debouncing (300ms delay)
- Tag-based filtering system with clickable tags
- Infinite scroll pagination with automatic loading
- Results counter and filtering feedback
- Loading states and error handling
- Responsive grid layout (1-4 columns based on screen size)
- Empty state handling with clear actions

**State Management:**

- Search state with debouncing
- Selected tag filtering
- Status filter management
- Visible pages pagination
- Loading and error states

**`pets/[id]/page.tsx`**
Dynamic pet detail page displaying comprehensive information about individual pets.

**Features:**

- Dynamic routing based on pet ID with URL parameter handling
- Detailed pet information display with all attributes
- Status indicators with color-coded badges
- Image gallery with fallback handling for missing images
- Navigation breadcrumbs for user context
- Update functionality access with direct linking
- Loading skeleton during data fetching
- Error handling for non-existent pets

**`pets/[id]/update/page.tsx`**
Pet update page allowing modifications to pet information.

**Features:**

- Form pre-population with existing pet data
- Status update functionality
- Image URL management and validation
- Real-time validation feedback
- Optimistic updates for better UX
- Error handling and rollback capabilities

### Components (`src/components/`)

Reusable UI components organized by functionality.

#### Core Components

**`FormInput.tsx`**
Flexible form input component with validation support and customizable styling.

**`loading.tsx`**
Standardized loading component with spinner animation for consistent user experience.

#### Pet-Specific Components (`src/app/pets/_components/`)

**`PetCard.tsx`**
Individual pet card component displaying pet image, name, ID, status, and tags with interactive elements.

**Key Features:**

- Status color coding with semantic color system:
  - Available: Green badge
  - Pending: Yellow badge
  - Sold: Red badge
- Tag interaction (clickable tags for instant filtering)
- Hover effects and smooth transitions
- Image loading states and fallbacks with paw print icon
- Responsive design with flexible grid layout
- Pet ID display for identification
- Direct link to pet details page

**Props:**

- `pet`: Complete pet object with all properties
- `onTagClick`: Callback function for tag filtering

**`SearchInput.tsx`**
Search input component with real-time filtering capabilities.

**Features:**

- Debounced search input (300ms delay) for performance
- Clear search functionality with X button
- Search icon with visual feedback
- Responsive design with mobile-optimized sizing
- Accessibility features (ARIA labels, keyboard navigation)
- Placeholder text for user guidance
- Real-time character counting and feedback

**Props:**

- `value`: Current search value
- `onChange`: Search value change handler
- `placeholder`: Input placeholder text

**`StatusToggle.tsx`**
Status filter component allowing users to switch between pet statuses.

**Features:**

- Visual status indicators with color coding
- Smooth toggle animations with CSS transitions
- Active state management with highlighted selection
- Responsive button design with touch-friendly targets
- Status count display (if available)
- Keyboard navigation support

**Props:**

- `currentStatus`: Currently selected status
- `onStatusChange`: Status change callback
- `statusCounts`: Optional count per status

**`LoadingSkeleton.tsx` & `LoadingGrid.tsx`**
Loading skeleton components providing visual feedback during data fetching.

**Features:**

- Animated skeleton placeholders matching actual content layout
- Grid layout simulation for pet cards
- Responsive skeleton sizing
- Smooth pulsing animation
- Performance optimized with CSS-only animations

**`PetDetailsSkeleton.tsx`**
Specialized loading skeleton for pet detail pages.

**Features:**

- Two-column layout simulation (image + details)
- Breadcrumb skeleton
- Button placeholders
- Text line simulations of varying widths
- Mobile-responsive skeleton layout

**`PetNotFound.tsx`**
Error component displayed when a pet is not found or doesn't exist.

**Features:**

- Clear error messaging with helpful text
- Action buttons for navigation (Back to Pets, Home)
- Sad pet icon for visual feedback
- Responsive layout with centered content
- SEO-friendly error state

**`LinksContainer.tsx`**
Breadcrumb navigation component for maintaining user context and navigation.

**Features:**

- Dynamic breadcrumb generation
- Clickable navigation links
- Current page highlighting
- Separator icons between links
- Mobile-responsive with text truncation
- Accessibility compliance (ARIA navigation)

**Props:**

- `items`: Array of breadcrumb items with labels and hrefs
- `separator`: Custom separator component (optional)

### Hooks (`src/app/pets/_hooks/`)

Custom React hooks that encapsulate data fetching logic and provide clean interfaces for components.

#### `usePet.ts` (Main Pets Hook)

Comprehensive hook for fetching and managing pet data with advanced filtering and pagination capabilities.

**Features:**

- **Status-based data fetching**: Fetches all pets by status from API
- **Client-side filtering**: Efficient search and tag filtering without additional API calls
- **Pagination management**: Configurable page size (20 pets per page)
- **Performance optimized**: 10-minute cache duration with stale-while-revalidate
- **Memoized processing**: Efficient data filtering and pagination calculations
- **Real-time search**: Instant filtering as user types (with debouncing)
- **Tag filtering**: Filter by specific pet tags with exact matching

**Parameters:**

- `status`: Pet status to fetch (available, pending, sold)
- `search`: Search term for pet name filtering
- `selectedTag`: Tag name for tag-based filtering

**Returns:**

- `data`: Processed and filtered pet data
- `isLoading`: Loading state indicator
- `isError`: Error state indicator
- `error`: Error object with details
- `allPets`: All pets for current page
- `totalCount`: Total number of filtered pets
- `hasMorePages`: Pagination availability indicator

**Internal Logic:**

```typescript
// Query key only includes status for efficient caching
queryKey: ["pets", status];

// Client-side filtering for immediate response
const filteredPets = useMemo(() => {
  let pets = allPets;

  // Search filtering
  if (search) {
    pets = pets.filter((pet) =>
      pet.name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Tag filtering
  if (selectedTag) {
    pets = pets.filter((pet) =>
      pet.tags?.some(
        (tag) => tag.name?.toLowerCase() === selectedTag.toLowerCase()
      )
    );
  }

  return pets;
}, [allPets, search, selectedTag]);
```

#### `usePetDetails.ts`

Specialized hook for fetching individual pet information by ID.

**Features:**

- **Conditional fetching**: Only fetches when valid ID is provided
- **TanStack Query integration**: Automatic caching and background updates
- **Error state management**: Comprehensive error handling
- **Loading optimization**: Prevents unnecessary API calls

**Parameters:**

- `petId`: Unique pet identifier

**Returns:**

- `data`: Complete pet object with all details
- `isLoading`: Loading state for UI feedback
- `isError`: Error state indicator
- `error`: Detailed error information

#### `useUpdatePet.ts`

Handles pet update operations with optimistic updates and comprehensive error handling.

**Features:**

- **Mutation management**: TanStack Query mutation for updates
- **Optimistic updates**: Immediate UI feedback before API confirmation
- **Cache invalidation**: Automatic refresh of related data
- **Error handling and rollback**: Automatic revert on failure
- **Form integration**: Seamless integration with update forms

**Parameters:**

- Update mutation accepts pet data changes

**Returns:**

- `mutate`: Function to trigger pet updates
- `isLoading`: Update operation state
- `isError`: Error state for updates
- `error`: Detailed error information
- `isSuccess`: Success state indicator

### Providers (`src/providers/`)

Context providers that manage global application state and external library integration.

#### `query-provider.tsx`

TanStack Query configuration and provider setup for the entire application.

**Configuration:**

- 5-minute default stale time
- 3 retry attempts with exponential backoff
- Development tools integration
- Global query defaults

#### `auth-provider.tsx`

Authentication context provider managing user state and authentication flow.

**State Management:**

- User session management
- Login/logout functionality
- Protected route handling
- Authentication state persistence

### Services (`src/app/pets/_services/`)

API service layer that handles external data fetching and provides clean interfaces for data operations.

#### Pet API Services (`index.ts`)

Centralized API service functions for all pet-related operations with comprehensive error handling.

**Core Functions:**

**`fetchAllPetsByStatus(status: PetStatus): Promise<Pet[]>`**

- Fetches complete list of pets filtered by status
- No pagination at API level - returns all pets for status
- Error handling with descriptive messages
- Response validation and type safety

**`fetchPetById(petId: string): Promise<Pet>`**

- Retrieves detailed information for specific pet
- ID validation and error handling
- Returns complete pet object with all properties
- Handles non-existent pet scenarios

**`updatePet(params: UpdatePetParams): Promise<Pet>`**

- Updates pet information via PUT request
- Parameters: id, name, status
- Returns updated pet object
- Optimistic update support

**`uploadPetImage(params: UpdateImageParams): Promise<void>`**

- Handles pet image uploads
- File validation and processing
- Multipart form data handling
- Progress tracking support (future enhancement)

**Error Handling Strategy:**

- Consistent error message formatting
- HTTP status code interpretation
- Network error detection and recovery
- Timeout handling with retry logic

**API Endpoints:**

- Base URL: `https://petstore.swagger.io/v2/pet/`
- Status endpoint: `findByStatus?status=${status}`
- Detail endpoint: `{petId}`
- Update endpoint: `{petId}` (PUT)
- Image upload: `{petId}/uploadImage` (POST)

**Authentication Integration:**

- Automatic auth header injection
- Token refresh handling
- Unauthorized request management
- Session validation

### Types (`src/types/`)

TypeScript type definitions ensuring type safety throughout the application.

#### `pet.ts`

Comprehensive type definitions for pet data structures.

**Types Defined:**

- `Pet`: Complete pet object with all properties
- `PetStatus`: Union type for pet status states
- `Tag`: Pet tag structure
- `Category`: Pet category information

#### `user.ts`

User-related type definitions for authentication and user management.

## Data Flow

### Pet Listing & Filtering

1. User navigates to pets page
2. `usePet` hook fetches data based on selected status
3. Client-side filtering applied for search and tags
4. Data is cached by TanStack Query for 10 minutes
5. `PetCard` components render filtered results
6. Pagination manages large datasets

### Pet Details

1. User clicks on pet card
2. Navigation to `/pets/[id]` route
3. `usePetDetails` hook fetches detailed data
4. Detailed view renders with complete information
5. User can navigate to update page or back to list

### Pet Updates

1. User navigates to update page
2. Form pre-populates with existing data
3. `useUpdatePet` hook handles form submission
4. Optimistic updates provide immediate feedback
5. Cache is invalidated and refreshed

### Authentication Flow

1. Unauthenticated users redirected to register/login
2. Form validation with Zod schemas
3. API integration with Pet Store API
4. Session management with Auth Provider
5. Protected route access granted

## Performance Optimizations

### Caching Strategy

- **Pet Data**: 10-minute cache for pet lists and details
- **User Data**: Session-based caching for authentication
- **Background Updates**: Stale-while-revalidate pattern

### Search & Filtering Optimizations

- Debounced search input (300ms delay)
- Client-side filtering for immediate response
- Memoized data processing to prevent unnecessary recalculations
- Efficient re-rendering with proper dependency arrays

### Loading Optimizations

- Skeleton loading states for improved perceived performance
- Image lazy loading with proper loading indicators
- Progressive loading for large datasets
- Optimistic updates for better user experience

### Memory Management

- Automatic cleanup of event listeners
- Efficient re-rendering with React.memo where appropriate
- Proper dependency arrays in useEffect and useMemo

## Error Handling

### API Error Handling

- Retry logic with exponential backoff
- User-friendly error messages
- Manual retry capabilities
- Graceful degradation for network issues

### Form Validation

- Real-time validation with Zod schemas
- Comprehensive error messaging
- Field-level validation feedback
- Accessible error announcements

### Loading States

- Skeleton loaders for content areas
- Spinner indicators for actions
- Progressive loading feedback
- Empty state handling

## Responsive Design

### Breakpoint System

- **Mobile**: 1 column grid (320px+)
- **Small Tablet**: 2 columns (640px+)
- **Tablet**: 3 columns (1024px+)
- **Desktop**: 4 columns (1280px+)

### Touch Optimization

- Minimum 44px touch targets
- Touch-friendly spacing
- Optimized hover states for touch devices
- Swipe gestures where appropriate

## Styling System

### CSS Architecture

- Tailwind CSS for utility-first styling
- Component-specific classes for reusable patterns
- Responsive design with mobile-first approach
- Custom CSS variables for consistent theming

### Design Tokens

- Consistent color palette with semantic naming
- Standardized spacing scale
- Typography hierarchy
- Shadow and border radius system
- Status-based color coding

## Authentication & Security

### Authentication Flow

- Secure user registration and login
- Session management with proper token handling
- Protected route implementation
- Automatic logout on session expiry

### Form Security

- Input validation and sanitization
- XSS prevention measures
- CSRF protection considerations
- Secure API communication

## Development Guidelines

### Code Organization

- Feature-based file organization
- Consistent naming conventions
- Clear separation of concerns
- Reusable component patterns

### Type Safety

- Strict TypeScript configuration
- Comprehensive type definitions
- Proper error type handling
- Interface consistency across modules

### Performance Considerations

- Optimized re-rendering with proper memoization
- Efficient data fetching patterns
- Image optimization strategies
- Bundle size optimization

### Testing Strategy

- Component unit testing
- API integration testing
- User flow testing
- Error handling validation

## API Integration

The application integrates with the Pet Store Swagger API:

- **Authentication**: `POST/GET https://petstore.swagger.io/v2/user/`
- **Pet Management**: `GET https://petstore.swagger.io/v2/pet/findByStatus`
- **Pet Details**: `GET https://petstore.swagger.io/v2/pet/{petId}`
- **Pet Updates**: `PUT https://petstore.swagger.io/v2/pet`

## Deployment

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Environment Configuration

- Configure API endpoints
- Set up authentication secrets
- Configure caching parameters

This documentation provides a comprehensive overview of the Pet Bless application, covering all major modules, functionality, and architectural decisions. The application demonstrates modern React development practices with a focus on user experience, performance, and maintainability.
