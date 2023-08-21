import type { Metadata } from "next";

import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");

  return <>{children}</>;
}
