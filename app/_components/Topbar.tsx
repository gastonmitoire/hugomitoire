"use client";

import React from "react";
import { Cinzel, Reggae_One } from "next/font/google";

const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin-ext"] });

import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

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
    <Navbar maxWidth="2xl">
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        {adminRoutes.map((route) => (
          <NavbarItem key={route.name} isActive={pathname === route.href}>
            <Link
              href={route.href}
              color={pathname === route.href ? "secondary" : "foreground"}
              aria-current={pathname === route.href ? "page" : undefined}
              className={`${reggaeOne.className}`}
            >
              {route.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarBrand className="justify-center">
        <Link href="/admin" color="foreground">
          <p className={`text-3xl font-bold text-inherit ${cinzel.className}`}>
            Hugo Mitoire
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end"></NavbarContent>
    </Navbar>
  );
};
