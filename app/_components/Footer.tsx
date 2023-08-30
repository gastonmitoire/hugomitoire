import React from "react";

import { Cinzel } from "next/font/google";

import { Divider } from "@nextui-org/divider";

const cinzel = Cinzel({ subsets: ["latin-ext"] });

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark z-10 flex h-32 w-full flex-col items-center justify-center">
      <h3 className={`text-3xl font-bold text-inherit ${cinzel.className}`}>
        Hugo Mitoire
      </h3>
      <Divider orientation="horizontal" className="my-3 max-w-xs" />
      <p className="flex items-center gap-1">
        <span className="text-foreground">© 2021 •</span>
        <span className="text-foreground">Todos los derechos reservados</span>
      </p>
    </footer>
  );
};
