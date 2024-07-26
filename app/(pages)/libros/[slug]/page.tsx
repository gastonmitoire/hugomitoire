import { Image } from "@nextui-org/image";

import { BookDetail } from "@/app/_book/_components/BookDetail.component";

import { booksService } from "@/app/_book/_service/books.service";

interface LibroPageProps {
  params: {
    slug: string;
  };
}

export default async function LibroPage({ params }: LibroPageProps) {
  const { slug } = params;
  const book = await booksService.getBySlug(slug);

  return (
    <main
      style={{
        backgroundImage: `url(${book.secondaryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-50">
        <div className="container flex h-screen items-end gap-5 xl:gap-0">
          <section className="grid h-[90%] w-[45%] items-center xl:place-items-center">
            <Image
              src={book.cover}
              width={500}
              height={500}
              alt="Libro"
              radius="none"
              isBlurred
            />
          </section>

          <section className="h-[90%] w-[55%]">
            <BookDetail book={book} />
          </section>
        </div>
      </div>
    </main>
  );
}
