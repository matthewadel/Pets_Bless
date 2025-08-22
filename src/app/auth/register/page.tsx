"use client";

import Link from "next/link";
import { useRegister } from "@/app/auth/_hooks";
import { FormInput } from "@/components";

export default function RegisterPage() {
  const { handleSubmit, errors, isSubmitting, isPending } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome to Pet Bless
          </p>
        </div>
        <form className="mt-8 space-y-6" action={handleSubmit}>
          <div className="space-y-4">
            <FormInput
              id="username"
              name="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              required
              error={errors.username}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                placeholder="First name"
                required
                error={errors.firstName}
              />

              <FormInput
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Last name"
                required
                error={errors.lastName}
              />
            </div>

            <FormInput
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              required
              error={errors.email}
            />

            <FormInput
              id="phone"
              name="phone"
              label="Phone"
              type="tel"
              placeholder="Enter your phone number"
              required
              error={errors.phone}
            />

            <FormInput
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
              error={errors.password}
            />
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isPending
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
