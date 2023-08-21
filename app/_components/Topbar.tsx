"use client";

import React from "react";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin-ext"] });

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

interface TopbarProps {
  pathname: string | null;
}

const adminRoutes = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Libros",
    href: "/libros",
  },
];

export const Topbar: React.FC<TopbarProps> = ({ pathname }) => {
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {adminRoutes.map((route) => (
          <NavbarItem key={route.name} isActive={pathname === route.href}>
            <Link
              href={route.href}
              color={pathname === route.href ? "secondary" : "foreground"}
              aria-current={pathname === route.href ? "page" : undefined}
            >
              {route.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarBrand className="justify-center">
        <Link href="/admin" color="foreground">
          <p className={`font-bold text-inherit text-3xl ${cinzel.className}`}>
            Hugo Mitoire
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
