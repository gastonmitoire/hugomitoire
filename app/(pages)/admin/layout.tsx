import React from "react";
import { headers } from "next/headers";

import { Spacer } from "@nextui-org/spacer";

import { AdminSidebar } from "@/app/_admin/_components/AdminSidebar";

interface AdminLayoutProps extends React.PropsWithChildren<{}> {}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const headersList = headers();
  const activePath =
    headersList.get("x-invoke-path") === "/admin"
      ? "dashboard"
      : headersList.get("x-invoke-path");

  return (
    <div className="container mx-auto grid h-screen grid-cols-5 py-20">
      <AdminSidebar />

      <main className="col-span-4 px-10 pb-3 pt-5">
        <h3 className="text-center font-bold text-white text-opacity-50">
          {activePath ? activePath.replace("/admin/", "").toUpperCase() : ""}
        </h3>
        <Spacer y={3} />
        {children}
      </main>
    </div>
  );
}
