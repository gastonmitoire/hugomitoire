import React from "react";

import { AdminSidebar } from "@/app/_admin/_components/AdminSidebar";

interface AdminLayoutProps extends React.PropsWithChildren<{}> {}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="container mx-auto grid h-screen grid-cols-5 py-20">
      <AdminSidebar />

      <main className="col-span-4">{children}</main>
    </div>
  );
}
