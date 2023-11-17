import React from "react";
interface AdminBooksLayoutProps extends React.PropsWithChildren<{}> {}

export default function AdminBooksLayout({ children }: AdminBooksLayoutProps) {
  return <div className="h-full">{children}</div>;
}
