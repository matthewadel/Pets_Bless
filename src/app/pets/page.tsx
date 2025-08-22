"use client";

import { useAuth } from "@/providers/auth-provider";
import React from "react";

const Pets = () => {
  const { logout } = useAuth();
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div onClick={logout}>Hello World</div>
    </div>
  );
};

export default Pets;
