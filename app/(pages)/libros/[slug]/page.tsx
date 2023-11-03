import { Image } from "@nextui-org/image";

import { BookDetail } from "@/app/_books/_components/BookDetail.component";

import { booksService } from "@/app/_books/_service/books.service";

interface LibroPageProps {
  params: {
    slug: string;
  };
}

export default async function LibroPage({ params }: LibroPageProps) {
  const { slug } = params;
  const { title, cover, secondaryImage, genre, description, type, chapters } =
    await booksService.getBySlug(slug);

  return (
    <main
      style={{
        backgroundImage: `url(${secondaryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-50">
        <div className="container mx-auto flex h-screen items-end gap-5 xl:gap-0">
          <section className="grid h-[90%] w-[45%] items-center xl:place-items-center">
            <Image
              src={cover}
              width={500}
              height={500}
              alt="Libro"
              radius="none"
              isBlurred
            />
          </section>

          <section className="rount flex h-[90%] w-[55%] flex-col overflow-y-hidden rounded-t-3xl">
            <BookDetail
              book={{
                title,
                description,
                genre,
                type,
                chapters,
              }}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
