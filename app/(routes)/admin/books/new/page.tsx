// new-book page

import { Divider } from "@nextui-org/divider";

import { BookForm } from "@/app/_components/forms/BookForm";

import { imagesService } from "../../images/_service/images.service";
import { genresService } from "../../genres/_service/genres.service";

export default async function AdminBooksNewPage() {
  const images = await imagesService.getAll();
  const genres = await genresService.getAll();

  console.log(images);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl text-center font-bold">Crear libro</h2>
      <Divider className="my-5" />
      <BookForm images={images} genres={genres} />
    </div>
  );
}
