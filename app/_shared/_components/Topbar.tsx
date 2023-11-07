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

function isActiveRoute(pathname: string, href: string) {
  return pathname === href;
}

function LinkItem({ href, pathname, children }: any) {
  const isActive = isActiveRoute(pathname, href);

  const activeClass = isActive ? "opacity-30" : "opacity-100";

  return (
    <Link
      href={href}
      color="foreground"
      aria-current={isActive ? "page" : undefined}
      className={`select-none font-bold text-inherit ${reggaeOne.className} ${activeClass}`}
      isDisabled={isActive}
    >
      {children}
    </Link>
  );
}

export const Topbar: React.FC<TopbarProps> = ({ pathname }) => {
  return (
    <Navbar maxWidth="full" className="px-5">
      <NavbarBrand>
        <Link href="/admin" color="foreground">
          <p className={`text-3xl font-bold text-inherit ${cinzel.className}`}>
            Hugo Mitoire
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden gap-10 sm:flex" justify="end">
        {adminRoutes.map((route) => (
          <NavbarItem key={route.name} isActive={pathname === route.href}>
            <LinkItem href={route.href} pathname={pathname}>
              {route.name}
            </LinkItem>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
};
