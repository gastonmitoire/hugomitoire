import React from "react";

import { Link } from "@nextui-org/link";

import { UserMenuWrapper } from "../../_user/_components/UserMenuWrapper";

import { Category, People, Book, Image, I3DSquare } from "iconsax-react";

export const AdminSidebar: React.FC = () => {
  const adminLinks = [
    { name: "Dashboard", href: "/admin", current: true, icon: Category },
    {
      name: "Users",
      href: "/admin/users",
      current: false,
      icon: People,
    },
    {
      name: "Books",
      href: "/admin/books",
      current: false,
      icon: Book,
    },
    { name: "Images", href: "/admin/images", current: false, icon: Image },
    { name: "Genres", href: "/admin/genres", current: false, icon: I3DSquare },
  ];

  return (
    <aside className="h-full w-full rounded-3xl bg-[#201e50] px-7 py-14 shadow-xl">
      <h3 className="text-center font-bold text-white text-opacity-50">
        ADMIN
      </h3>

      <div className="py-10">
        <UserMenuWrapper />
      </div>

      <nav className="space-y-5 py-10">
        {adminLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex w-full items-center space-x-5 px-3 py-5 text-white text-opacity-50 hover:text-opacity-100"
          >
            <link.icon className="h-5 w-5" />
            <span>{link.name}</span>

            <span className="flex flex-auto items-center justify-end place-self-end text-right"></span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
