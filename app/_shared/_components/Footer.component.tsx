import React from "react";

import { Cinzel, Reggae_One } from "next/font/google";

const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin-ext"] });

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const footerRoutes = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Libros",
    href: "/libros",
  },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container">
      <div className="flex items-center justify-between gap-5 py-3">
        <Link href="/">
          <h3 className={`text-3xl font-bold text-inherit ${cinzel.className}`}>
            Hugo Mitoire
          </h3>
        </Link>

        <nav className="flex flex-1 items-center">
          {footerRoutes.map((route, index) => (
            <Button
              key={index}
              variant="light"
              color="default"
              radius="none"
              size="sm"
            >
              {route.name}
            </Button>
          ))}
        </nav>

        <span>
          <p className="text-light text-opacity-70">
            © {currentYear} Hugo Mitoire. Todos los derechos reservados.
          </p>
        </span>
      </div>
    </footer>
  );
};
