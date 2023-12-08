import React from "react";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";

import { EnhancedBookModel } from "@/app/_books/_service/books.service";
import { ChapterList } from "@/app/_chapters/_components/ChaptersList.component";
import { ChapterFormWrapper } from "@/app/_chapters/_components/ChapterFormWrapper.component";

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

      {/* <section>
        <ChapterFormWrapper
          bookId={book.id}
          currentChapterOrder={book.chapters.length}
        />
        <h5 className="pb-1.5 pt-3 font-bold uppercase text-light text-opacity-50">
          Capítulos ({book.chapters.length})
        </h5>
        <ul className="space-y-3">
          {book.chapters.map((chapter, index) => (
            <li
              key={index}
              className="flex select-none items-center gap-3 bg-light bg-opacity-10 p-3 transition-opacity hover:cursor-pointer hover:bg-opacity-20"
            >
              <p>{chapter.order}</p>
              <p>{chapter.title}</p>
            </li>
          ))}
        </ul>
      </section> */}

      <span className="col-span-3 w-full py-10">
        <Button color="secondary" size="lg" variant="bordered" fullWidth>
          Editar
        </Button>
      </span>
    </div>
  );
};
