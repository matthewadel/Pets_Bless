import React from "react";

export interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "tel";
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  containerClassName?: string;
}

export function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  error,
  className = "",
  containerClassName = "",
}: FormInputProps) {
  const baseInputClasses =
    "mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";

  const inputClasses = className
    ? `${baseInputClasses} ${className}`
    : baseInputClasses;

  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className={inputClasses}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
