import React from "react";

import { Link } from "@nextui-org/link";

import { UserMenuWrapper } from "../../_users/_components/UserMenuWrapper";

import {
  UserIcon,
  BookOpenIcon,
  PhotoIcon,
  CubeIcon,
  Squares2X2Icon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

export const AdminSidebar: React.FC = () => {
  const adminLinks = [
    { name: "Dashboard", href: "/admin", current: true, icon: Squares2X2Icon },
    {
      name: "Users",
      href: "/admin/users",
      current: false,
      icon: UserIcon,
    },
    {
      name: "Books",
      href: "/admin/books",
      current: false,
      icon: BookOpenIcon,
    },
    { name: "Images", href: "/admin/images", current: false, icon: PhotoIcon },
    { name: "Genres", href: "/admin/genres", current: false, icon: CubeIcon },
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

            <span className="flex flex-auto items-center justify-end place-self-end text-right">
              <ChevronRightIcon className="h-5 w-5" />
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
