"use client";

import React, { useState, useEffect } from "react";

import { TopbarAdmin } from "@/app/components/TopbarAdmin";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="dark text-foreground bg-background h-screen">
      <TopbarAdmin />

      {mounted && children}
    </div>
  );
};
