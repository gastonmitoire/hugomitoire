"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Cinzel, Bellefair, Reggae_One } from "next/font/google";

import {
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  Chip,
  Image,
  Link,
  Spacer,
  User,
} from "@nextui-org/react";
import {
  Element3 as Element3Icon,
  RowVertical as RowVerticalIcon,
} from "iconsax-react";

const cinzel = Cinzel({ subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

import { EnhancedBookModel } from "../_service/books.service";

interface BooksProps {
  books: EnhancedBookModel[];
}

interface ContainerLayout {
  mode: "grid" | "list";
}

const BookCard: React.FC<EnhancedBookModel> = (book) => {
  return (
    <Card
      as={Link}
      key={book.id}
      href={`/libros/${book.slug}`}
      className="group border-none"
      isHoverable
      isFooterBlurred
      radius="lg"
    >
      <Image
        src={book.cover}
        alt={book.title}
        style={{ height: "470px" }}
        className="cursor-pointer"
      />

      <CardFooter className="absolute bottom-1 z-10 w-[calc(100%_-_8px)] justify-between gap-5 overflow-hidden rounded-large border-1 border-white/20 bg-dark/50 py-1 shadow-small before:rounded-xl before:bg-white/10 group-hover:bg-primary group-hover:[&>p]:text-darker">
        <p
          className={`text-tiny font-semibold text-white/80 ${reggaeOne.className}`}
        >
          {book.title}
        </p>
        <Chip
          className={`bg-secondary/70 text-tiny text-white ${cinzel.className}`}
          variant="flat"
          color="default"
          radius="lg"
        >
          {book.type}
        </Chip>
      </CardFooter>
    </Card>
  );
};

const BookBanner: React.FC<EnhancedBookModel> = (book) => {
  const configs = (value: string) => {
    switch (value) {
      case "cuando-era-chico-i":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 35%",
        };
      case "cuando-era-chico-ii":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 50%",
        };
      case "recuerdos-de-mi-muerte":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 75%",
        };
      case "la-bestia":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 45%",
        };
      case "la-caceria":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 55%",
        };
      case "los-ojos-de-mariel":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 65%",
        };
      case "mensajes-del-mas-alla":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 40%",
        };
      case "historia-de-un-nino-lobo":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 75%",
        };
      case "la-chancha-con-ruleros":
        return {
          backgroundSize: "100%",
          backgroundPosition: "center",
        };
      case "criaturas-celestes":
        return {
          backgroundSize: "100%",
          backgroundPosition: "center",
        };
      case "crispin-soto-y-el-diablo":
        return {
          backgroundSize: "100%",
          backgroundPosition: "center",
        };
      case "cuentos-de-terror-para-franco-i":
        return {
          backgroundSize: "100%",
          backgroundPosition: "center",
        };
      case "cuentos-de-terror-para-franco-ii":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 45%",
        };
      case "cuentos-de-terror-para-franco-iii":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 50%",
        };
      case "cuentos-de-terror-para-franco-iv":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 30%",
        };
      case "cuentos-de-terror-para-franco-v":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 65%",
        };
      case "cuentos-de-terror-para-franco-vi":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 65%",
        };
      case "cuentos-de-terror-para-franco-vii":
        return {
          backgroundSize: "100%",
          backgroundPosition: "center",
        };
      case "cuentos-de-terror-para-franco-ix":
        return {
          backgroundSize: "100%",
          backgroundPosition: "0 45%",
        };

      default:
        return {
          backgroundSize: "100%",
          backgroundPosition: "bottom",
        };
    }
  };

  return (
    <div className="relative flex items-center">
      <div
        className="absolute bottom-0 left-0 right-0 top-0 m-auto"
        style={{
          backgroundImage: `url(${book.secondaryImage.replaceAll(
            "png",
            "jpg"
          )})`,
          backgroundRepeat: "no-repeat",
          maxHeight: 330,
          clipPath: "polygon(0 100%, 25% 0, 100% 0, 100% 100%)",
          ...configs(book.slug),
        }}
      >
        <div className="h-full w-full bg-darker/50 backdrop-blur-sm"></div>
      </div>

      <div className="flex-0 ml-20">
        <Image
          src={book.cover}
          alt={book.title}
          style={{ height: "370px" }}
          className=" cursor-pointer"
        />
      </div>

      <div className="z-10 flex max-h-[330px] min-h-[330px] w-full flex-1 flex-col justify-between gap-3 px-14 py-3">
        <div>
          <h1
            className={`flex items-center gap-3 text-3xl ${reggaeOne.className}`}
          >
            {book.title}
            <Chip
              className={`bg-secondary/70 text-tiny text-white ${cinzel.className}`}
              variant="flat"
              color="default"
              radius="lg"
            >
              {book.type}
            </Chip>
          </h1>
          <h5
            className={`text-lg font-semibold opacity-70 ${cinzel.className}`}
          >
            {book.genre.name}
          </h5>
        </div>

        <p
          className={`w-min min-w-[350px] flex-1 rounded-sm bg-black bg-opacity-30 p-3 text-xl font-light italic ${bellefair.className}`}
        >
          {book.description}
        </p>

        <div className="flex gap-5">
          <User
            name={
              book.illustrator.profile.firstName +
              " " +
              book.illustrator.profile.lastName
            }
            description="Ilustrador"
            avatarProps={{
              src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqQHdzCHkTan_Dl8-P-RPhEI4rtzADs8JSVdg8sVSuEnWPEJQudUlpBGbUjm2TwiP4KgzEMksTks-OSHA3oFvqYygKRtdpglWx19ejDMlPV716cVX9Kc0G13e11NKbBuvtFhc84g11nIQ/s320/FB_IMG_15126431820236753.jpg",
            }}
          />
          <User
            name={book.publisher.profile.displayName}
            description="Editorial"
            avatarProps={{
              src: "https://th.bing.com/th/id/R.1c8004fe38fe202ff6ae1208e63637b4?rik=L4EAtU5wX5zMjw&riu=http%3a%2f%2fcamaradgchaco.com.ar%2fwp-content%2fuploads%2f2020%2f05%2flibreria-la-paz.jpg&ehk=xmuHAd%2bGPikd8vo7zhNXg7F1H1W7bJ4Vm3lMYUA3tHo%3d&risl=&pid=ImgRaw&r=0",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Books: React.FC<BooksProps> = ({ books }) => {
  const [containerLayout, setContainerLayout] = useState<ContainerLayout>({
    mode: "list",
  });

  const containerStyles = {
    grid: "grid grid-cols-auto-fit-300 gap-5",
    list: "flex flex-col gap-5",
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };

  return (
    <section className="container mx-auto min-h-screen space-y-3 py-20">
      <ButtonGroup size="sm">
        <Button
          isDisabled={containerLayout.mode === "list"}
          onClick={() =>
            setContainerLayout({
              mode: "list",
            })
          }
        >
          <RowVerticalIcon />
        </Button>
        <Button
          isDisabled={containerLayout.mode === "grid"}
          onClick={() =>
            setContainerLayout({
              mode: "grid",
            })
          }
        >
          <Element3Icon />
        </Button>
      </ButtonGroup>
      <div className={containerStyles[containerLayout.mode]}>
        {books.map((book) =>
          containerLayout.mode === "grid" ? (
            <BookCard key={book.id} {...book} />
          ) : (
            <BookBanner key={book.id} {...book} />
          )
        )}
      </div>
    </section>
  );
};
