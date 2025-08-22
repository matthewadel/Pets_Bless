import React from "react";
import { PetStatus } from "@/types";

interface StatusToggleProps {
  currentStatus: PetStatus;
  onStatusChange: (status: PetStatus) => void;
}

export function StatusToggle({
  currentStatus,
  onStatusChange,
}: StatusToggleProps) {
  const statuses: { value: PetStatus; label: string; color: string }[] = [
    { value: "available", label: "Available", color: "bg-green-500" },
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
    { value: "sold", label: "Sold", color: "bg-red-500" },
  ];

  return (
    <div className="flex bg-gray-200 rounded-lg p-1 space-x-1">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onStatusChange(status.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 text-center ${
            currentStatus === status.value
              ? `${status.color} text-white shadow-sm`
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-300"
          }`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}
