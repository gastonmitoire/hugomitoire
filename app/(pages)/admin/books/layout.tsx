import React from "react";
import { headers } from "next/headers";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spacer } from "@nextui-org/spacer";

import { ArrowLeftIcon } from "@heroicons/react/20/solid";

interface AdminBooksLayoutProps extends React.PropsWithChildren<{}> {}

export default function AdminBooksLayout({ children }: AdminBooksLayoutProps) {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");

  return (
    <div className="h-full">
      <nav className="flex items-center rounded-2xl border border-light border-opacity-10 p-3">
        {activePath === "/admin/books" ? (
          <Button as={Link} href="/admin/books/create" className="mr-3">
            New Book
          </Button>
        ) : (
          <Button as={Link} href="/admin/books" className="mr-3" isIconOnly>
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
        )}
      </nav>
      <Spacer y={5} />
      {children}
    </div>
  );
}
