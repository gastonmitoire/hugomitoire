import { BookFeatured } from "./BookFeatured.component";

import { booksService } from "../_service/books.service";

import { Cinzel } from "next/font/google";
import { Bellefair } from "next/font/google";

import { Skeleton } from "@nextui-org/skeleton";
import { Spacer } from "@nextui-org/spacer";

const cinzel = Cinzel({ subsets: ["latin-ext"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });

export const BookFeaturedWrapper: React.FC = async () => {
  const bookFeatured = await booksService.getBySlug("los-ojos-de-mariel");

  const isLoaded = !!bookFeatured;

  const featuredText = (
    <p
      className={`${bellefair.className} h-full text-justify text-lg sm:text-2xl`}
    >
      “Los ricos defienden el aborto ilegal para mantenerlo en secreto y no
      pasar vergüenza. Estoy harto de que se nos mueran chicas pobres para que
      las ricas aborten en secreto. Se nos mueren nenas en las villas y en los
      sanatorios hacen fortunas sacándoles del vientre la vergüenza a las que
      tienen plata. Con el divorcio decían que era el fin de la familia y sólo
      fue el fin de la vergüenza para los separados ilegales. Con el aborto
      legal no habrá más ni menos abortos, habrá menos madres muertas. El resto
      es educar, no legislar”
      <Spacer y={3} />
      <cite className="block text-right text-xl">
        <span className={`${cinzel.className} text-xl`}>
          <strong>René Gerónimo Favaloro</strong>
        </span>
      </cite>
    </p>
  );
  return <BookFeatured book={bookFeatured} featuredText={featuredText} />;
};
