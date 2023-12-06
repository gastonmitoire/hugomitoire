"use client";

import React from "react";
import { Cinzel, Reggae_One } from "next/font/google";

const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin-ext"] });

import {
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { SocialLinks } from "./SocialLinks";

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

function LinkItem({ href, children }: any) {
  return (
    <Link
      href={href}
      color="foreground"
      aria-current={"page"}
      className={`select-none font-bold text-inherit ${reggaeOne.className}`}
    >
      {children}
    </Link>
  );
}

export const Topbar: React.FC = () => {
  return (
    <Navbar maxWidth="full" className="px-5" shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/admin" color="foreground">
          <p className={`text-3xl font-bold text-inherit ${cinzel.className}`}>
            Hugo Mitoire
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden gap-5 sm:flex" justify="end">
        {adminRoutes.map((route) => (
          <NavbarItem key={route.name}>
            <LinkItem href={route.href}>{route.name}</LinkItem>
          </NavbarItem>
        ))}
        <Divider orientation="vertical" className="h-1/2 dark" />
        <SocialLinks />
      </NavbarContent>
    </Navbar>
  );
};
