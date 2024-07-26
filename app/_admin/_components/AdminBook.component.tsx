import React from "react";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";

import { EnhancedBookModel } from "@/app/_book/_service/books.service";
import { ChapterList } from "@/app/_chapter/_components/ChaptersList.component";
import { ChapterFormWrapper } from "@/app/_chapter/_components/ChapterFormWrapper.component";

interface AdminBookProps {
  book: EnhancedBookModel;
}

export const AdminBook: React.FC<AdminBookProps> = ({ book }) => {
  return (
    <div className="grid grid-cols-2 [&>section>span]:italic [&>section>span]:text-light [&>section>span]:text-opacity-50">
      <section>
        <span>Titulo</span>
        <h3 className="text-3xl">{book.title}</h3>
        <Spacer y={5} />
        <span>Descripcion</span>
        <p className="text-xl">{book.description}</p>
        <Spacer y={5} />
        <span>Tipo</span>
        <p className="text-xl">{book.type}</p>
        <Spacer y={5} />
        <span>Genero</span>
        <p className="text-xl">{book.genre.name}</p>
        <Spacer y={5} />
        <span>Ilustrador</span>
        <p className="text-xl">{book.illustrator.username}</p>
        <Spacer y={5} />
        <span>Editorial</span>
        <p className="text-xl">{book.publisher.username}</p>
        <Spacer y={5} />
        <figure>
          <Image
            src={book.secondaryImage}
            alt={`imagen_secundaria-${book.title}`}
            width={350}
          />

          <figcaption>Imagen Secundaria</figcaption>
        </figure>
      </section>

      <section>
        <figure>
          <Image src={book.cover} alt={`tapa-${book.title}`} width={350} />

          <figcaption>Tapa</figcaption>
        </figure>
      </section>

      <span className="col-span-3 w-full py-10">
        <Button color="secondary" size="lg" variant="bordered" fullWidth>
          Editar
        </Button>
      </span>
    </div>
  );
};
