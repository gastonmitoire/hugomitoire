import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";

import { BookDetail } from "@/app/books/_components/BookDetail.component";

import { Bellefair, Reggae_One } from "next/font/google";

const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

import { booksService } from "@/app/books/_service/libros.service";

interface LibroPageProps {
  params: {
    slug: string;
  };
}

export default async function LibroPage({ params }: LibroPageProps) {
  const { slug } = params;
  const { id, title, cover, secondaryImage, genre, description, type } =
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
        <div className="container mx-auto flex h-screen items-end ">
          <section className="grid h-[90%] w-[45%] place-items-center">
            <Skeleton isLoaded>
              <Image
                src={cover}
                width={500}
                height={500}
                alt="Libro"
                radius="none"
              />
            </Skeleton>
          </section>

          <section className="rount flex h-[90%] w-[55%] flex-col overflow-y-hidden rounded-t-3xl">
            <BookDetail
              book={{
                id,
                title,
                description,
                genre,
                type,
              }}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
