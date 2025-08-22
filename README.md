# Pet Bless Web Application

A Next.js web application for pet management with authentication using the Pet Store API.

## Features

- 🔐 User Authentication (Login/Register)
- 📱 Responsive Design
- ✅ Form Validation with Zod
- 🔄 API Integration with TanStack Query
- 🎨 Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication Flow

1. **First Visit**: Users are redirected to the `/register` page
2. **Register**: Users can create a new account with the Pet Store API
3. **Login**: Existing users can sign in using their credentials
4. **Protected Routes**: Authenticated users can access the main application
5. **Logout**: Users can log out and will be redirected back to register

## API Integration

The application integrates with the Pet Store Swagger API:

- **Login**: `GET https://petstore.swagger.io/v2/user/login`
- **Register**: `POST https://petstore.swagger.io/v2/user`
- **Get User**: `GET https://petstore.swagger.io/v2/user/{username}`

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **TanStack Query** - API state management
- **Zod** - Schema validation

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── login/          # Login page
│   ├── register/       # Register page
│   └── page.tsx        # Home page (protected)
├── components/         # Reusable components
├── lib/               # Utilities and API functions
└── providers/         # React context providers
```

## Form Validation

Both login and register forms include comprehensive validation:

- **Username**: Required, minimum 3 characters
- **Password**: Required, minimum 6 characters
- **Email**: Valid email format
- **Phone**: Required
- **Names**: Required fields

## Responsive Design

The application is fully responsive and works on:

- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
