import React from "react";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";

import { Facebook, Instagram, Youtube, ArrowUp } from "iconsax-react";

export const SocialLinks: React.FC = () => {
  const socialMediaLinks = [
    {
      description: "Perfil en Facebook",
      href: "https://www.facebook.com/hmitoire/",
      icon: Facebook,
      color: "4267B2",
    },
    {
      description: "Perfil en Instagram",
      href: "https://www.instagram.com/hugodanielmitoire/",
      icon: Instagram,
      color: "833AB4",
    },
    {
      description: "Canal de YouTube",
      href: "https://www.youtube.com/@hugomitoire7334",
      icon: Youtube,
      color: "FF0000",
    },
  ];

  return (
    <nav className="flex items-center gap-1">
      {socialMediaLinks.map((link, index) => (
        <Tooltip
          key={index}
          content={
            <span className="flex items-center gap-1">
              {link.description}
              <ArrowUp size={16} className="rotate-45" />
            </span>
          }
          color="primary"
          size="sm"
        >
          <Button
            as={Link}
            href={link.href}
            isExternal
            isIconOnly
            variant="light"
            color="default"
            className="opacity-50 transition-opacity hover:opacity-100"
          >
            <link.icon variant="Bold" color={`#${link.color}`} size={32} />
          </Button>
        </Tooltip>
      ))}
    </nav>
  );
};
