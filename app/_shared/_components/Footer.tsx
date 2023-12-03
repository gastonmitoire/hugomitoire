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
  return (
    <footer className="container flex flex-col items-center gap-5 pb-16">
      <h3 className={`text-3xl font-bold text-inherit ${cinzel.className}`}>
        Hugo Mitoire
      </h3>

      <nav>
        {footerRoutes.map((route, index) => (
          <Button key={index} variant="light" color="default">
            {route.name}
          </Button>
        ))}
      </nav>

      <div className="grid w-full grid-cols-3">
        <span className="col-start-2">1</span>
        <span className="col-start-3">
          <p className="text-light text-opacity-70">
            © 2023 Hugo Mitoire. Todos los derechos reservados.
          </p>
        </span>
      </div>
    </footer>
  );
};
