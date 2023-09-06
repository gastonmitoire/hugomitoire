"use client";
import React from "react";

import { motion } from "framer-motion";

import { Spacer } from "@nextui-org/spacer";

import { Cinzel, Bellefair, Reggae_One } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

interface BookDetailProps {
  book: {
    title: string;
    genre: {
      name: string;
      ageRange: string;
    };
    description: string;
    type: string;
  };
}

// reusable component for book detail heading
interface BookDetailHeadingProps {
  children: React.ReactNode;
  section: string;
  onClick: (section: string) => void;
  className?: string;
}
const BookDetailHeading: React.FC<BookDetailHeadingProps> = ({
  children,
  section,
  onClick,
  className,
}) => {
  return (
    <h5
      className={`sticky top-0 z-10 cursor-pointer select-none bg-darker px-5 py-3 text-xl text-lighter text-opacity-70 ${
        reggaeOne.className
      } ${className ? className : null}`}
      onClick={() => onClick(section)}
    >
      {children}
    </h5>
  );
};

export const BookDetail: React.FC<BookDetailProps> = ({
  book: { title, genre, description, type },
}) => {
  function handleSectionClick(section: string) {
    // if section is details, scroll to book-detail top
    if (section === "details") {
      const bookDetail = document.getElementById(`book-detail`);
      if (bookDetail) {
        bookDetail.className = bookDetail.className.replace(
          "bg-dark",
          "bg-darker"
        );
        bookDetail.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    // if section is chapters, scroll to chapters top
    if (section === "chapters") {
      const chapters = document.getElementById("chapters");
      if (chapters) {
        chapters.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  // TODO: add chapters

  // motion config for book detail (slide in from bottom slowly)
  const bookDetailVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={bookDetailVariants}
      id="book-detail"
      className="overflow-y-auto scrollbar-hide"
    >
      <BookDetailHeading section="details" onClick={handleSectionClick}>
        Detalles
      </BookDetailHeading>
      <div className="flex flex-col bg-dark bg-opacity-50 p-7 backdrop-blur-md">
        <h3 className={`text-3xl ${cinzel.className}`}>{title}</h3>
        <Spacer y={3} />
        <h5 className={`text-xl opacity-70 ${cinzel.className}`}>
          {type} | {genre.name} | {genre.ageRange}
        </h5>
        <Spacer y={5} />
        <p className={`text-xl ${bellefair.className}`}>{description}</p>
      </div>

      <BookDetailHeading
        section="chapters"
        onClick={handleSectionClick}
        className="top-12"
      >
        Capítulos
      </BookDetailHeading>
      <div id="chapters" className="bg-dark bg-opacity-50 backdrop-blur-md">
        <p className="p-7 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quibusdam
          accusantium, blanditiis velit maxime excepturi voluptatibus laboriosam
          at a impedit itaque nisi voluptatem suscipit, nemo eum dolorem qui
          quisquam recusandae. Aspernatur esse quos quia necessitatibus minima
          neque voluptates perspiciatis repudiandae porro unde, exercitationem
          possimus ullam aliquid illo recusandae alias. Reprehenderit, delectus
          provident expedita iure recusandae minima cum animi. Facilis,
          molestias! Soluta voluptatibus laborum sit? Unde voluptatem
          repellendus ab? Hic deserunt maiores veritatis sequi neque? Ab magni
          itaque dignissimos aliquid, aliquam qui animi similique eos recusandae
          ea iure quae, dolorum culpa! Ipsum asperiores quasi consectetur sint
          odit repellat dicta et deleniti provident ad ut distinctio,
          aspernatur, impedit, eum autem totam nam facilis quia repudiandae.
          Delectus blanditiis voluptas repellendus minus labore quo. Praesentium
          ea harum culpa iure enim vel quo eveniet accusantium cumque saepe?
          Repellat, veritatis sed incidunt, fugit doloremque earum laudantium
          laborum velit beatae ipsam quasi nostrum eveniet impedit culpa
          voluptate. Nemo provident impedit error amet tempore! Voluptatem in
          eligendi dicta, minima obcaecati accusantium omnis voluptates ut
          labore? Necessitatibus ex est fugit quos repellendus. Itaque culpa
          earum, accusamus minus consequuntur labore. Dolorum cumque quas eaque
          veniam qui, consectetur accusamus sit modi tempora ab in quasi.
          Provident recusandae repellat delectus itaque, odit, minus illo, iure
          tenetur fuga odio doloremque facere laborum molestiae! Quidem ad
          maxime, voluptatibus reprehenderit adipisci repellat voluptas
          recusandae! Temporibus ipsam quibusdam excepturi, nihil et dolorum,
          fuga doloribus adipisci quia voluptate magni dicta itaque ad,
          architecto quasi molestias sunt nesciunt! Molestiae obcaecati ad
          facilis iste earum, veritatis ipsa et? Ad laboriosam temporibus amet
          repellat iure corporis illum. Nulla iste, ea quibusdam obcaecati
          numquam dolorem perferendis voluptatibus, nemo tenetur repudiandae
          maiores? Quaerat, rerum? Perspiciatis est suscipit exercitationem, eum
          et rem officiis temporibus natus cum illum corrupti nesciunt libero
          voluptate veniam ex. Voluptatum repellendus atque omnis ullam natus
          qui neque consequatur animi. Dolorum quae non minima incidunt quisquam
          obcaecati! Doloribus ipsa quia asperiores ipsum corporis aliquid,
          dolor similique eos incidunt et vero cupiditate amet, doloremque non
          veniam consectetur! Saepe iusto totam sunt. Ratione tempore
          exercitationem, esse ad enim ipsam non nesciunt eum veniam tempora
          asperiores perferendis a perspiciatis vitae dolores velit, cum
          tenetur? Praesentium doloribus inventore architecto ullam? Quam
          voluptates at quibusdam. Totam nihil voluptas sunt natus quibusdam
          repellat adipisci et blanditiis minus sit magni mollitia nulla,
          molestiae voluptate. Odit tempore corrupti iure laborum. Dolor dicta
          quisquam neque quis adipisci, molestiae nulla? Neque cupiditate cumque
          repellat libero ad! Sequi minus sit officia voluptatum non esse
          molestiae culpa sed a saepe tempora repellat, eligendi quibusdam? Odio
          est maiores aspernatur illo debitis quod esse. Nihil quis voluptas
          quam officia officiis quidem, ad recusandae voluptate aliquid
          voluptates hic. Minima at assumenda qui deleniti fugiat praesentium
          dignissimos. Et illo architecto necessitatibus consequuntur omnis
          accusantium odit qui! Dignissimos in praesentium voluptates nesciunt
          debitis minus quae deserunt quod, quo vel velit cum ipsam omnis
          laboriosam unde, soluta, aut ad ratione odit sunt at vitae culpa!
          Harum, aliquam est. Suscipit, minus! Perspiciatis debitis ducimus
          alias tempora repellendus voluptate minus iste repudiandae, voluptatem
          ratione eligendi modi neque quasi animi nisi. Animi quis, placeat
          facilis illum consequuntur et vitae molestiae culpa. Tenetur, nihil
          porro voluptatem nobis ratione tempore magnam qui fugiat numquam quos.
          Sit, eius debitis. Voluptates sequi incidunt totam iure quia ex,
          praesentium quae, alias ipsa veniam, sint labore illo? Delectus minima
          eaque sapiente, quisquam deleniti facilis. Veritatis soluta enim
          praesentium et eos atque porro temporibus nisi id facere, aliquid
          pariatur autem consequatur obcaecati velit vero laborum alias.
          Eveniet, doloribus? Esse nam non molestiae dolore fugit voluptate,
          neque beatae est enim perferendis voluptatibus doloremque voluptas
          eligendi mollitia unde quidem, hic, corporis eum quae cumque
          consequatur quis? Aliquam veniam voluptates aspernatur. Tempora at
          obcaecati eligendi provident eum, quis accusamus nobis asperiores
          minima sequi saepe consequatur. Repellendus reiciendis doloremque
          impedit quam cupiditate aliquam id? Repellat tempora voluptatibus
          beatae? Voluptatem cumque voluptas quasi! Cum, officia beatae et
          excepturi sit, molestias rem tempora, ullam minus repellat nemo
          tempore fugiat! Harum dolorum enim atque. Maxime quae nobis molestias
          consectetur eaque ipsam obcaecati quisquam accusamus modi! Molestias,
          doloremque ea atque pariatur omnis necessitatibus fugiat consequatur
          accusamus illum rem ex fuga ipsum tenetur vero aspernatur, dicta
          asperiores corporis officia voluptate dolores. Odit modi voluptatibus
          sunt. Reprehenderit, debitis. Porro dolorem, minus laboriosam dolore
          enim expedita ducimus harum facilis soluta quisquam sequi doloremque
          nemo voluptatum quidem vitae sunt omnis doloribus similique maiores,
          impedit suscipit nam est! Ratione, provident consectetur! Blanditiis
          neque laborum officiis asperiores praesentium doloremque. Tenetur
          saepe temporibus fugit ipsam accusantium expedita exercitationem, quis
          iusto unde quibusdam officia architecto dicta quos rerum at excepturi
          optio deserunt, rem et. Placeat a fuga eius, esse, velit nobis,
          deleniti dicta est iure tempore labore sint. Laboriosam nostrum,
          veritatis quidem vel maiores nesciunt repudiandae ullam. Veritatis
          rerum ab omnis consequuntur quidem ratione. Aspernatur deleniti,
          officia delectus illum, possimus ea voluptate voluptatum cupiditate
          consectetur culpa dolore quisquam placeat quod deserunt veritatis
          autem cum sapiente repellat sunt animi error, beatae ducimus totam.
          Culpa, nobis! Odio iste error temporibus corporis quis, sequi
          excepturi rem? Dolorum ea rem nisi iure, dolores debitis, hic
          distinctio numquam consectetur esse libero modi itaque delectus
          nesciunt doloremque ullam quod quam. Perferendis quam ab sapiente
          ducimus expedita consequuntur numquam nobis velit, ad natus enim,
          saepe rerum adipisci, commodi laudantium aliquam incidunt eum
          molestias sed corporis quae? Soluta porro exercitationem maiores
          neque. Atque minus cum quam ab illo tenetur a ea. Minus sunt obcaecati
          nobis asperiores! Repellat commodi, repudiandae corrupti cum, ipsa
          harum amet autem blanditiis, eos repellendus id reprehenderit nesciunt
          odio? Corporis eius, praesentium deserunt accusantium aperiam fugit.
          Impedit aspernatur corrupti necessitatibus consequuntur, rerum
          consectetur? Fugiat maiores enim, ipsa illo eveniet eos magni
          assumenda laborum possimus veniam debitis aliquid vitae aspernatur.
          Error itaque nemo excepturi perferendis dolorum facilis, obcaecati
          praesentium corrupti inventore molestiae beatae sit ex officiis totam
          repudiandae accusantium ut numquam quae. Magnam provident
          necessitatibus minima dolores, voluptatem dolorem earum! Ipsa maiores
          quidem aut perspiciatis tempora culpa explicabo officiis voluptates
          voluptatibus eveniet! Dolorum deleniti ut beatae voluptatum vitae
          voluptatibus, aspernatur nisi ex autem omnis numquam pariatur earum at
          voluptates eligendi! Explicabo corrupti modi, odio dolores laborum
          laudantium voluptatibus aut doloremque deleniti ut quidem obcaecati
          aspernatur culpa placeat assumenda molestias eveniet necessitatibus
          perferendis, officiis numquam alias! Quas voluptas aliquam
          exercitationem vel. Ducimus blanditiis obcaecati sit, recusandae magni
          consequuntur nobis iusto voluptatibus adipisci, reprehenderit unde
          maiores distinctio. Delectus, tenetur? Qui nostrum minus amet sint
          dolores doloremque expedita ea similique veniam repellat. Quae.
          Voluptatibus libero repellendus voluptate exercitationem, eum
          doloribus dolor iusto aliquam quibusdam natus, nam voluptatum dolore
          minima distinctio adipisci. Ea in vero amet facilis qui cumque,
          voluptas dignissimos optio aperiam nulla? Ad a reiciendis id obcaecati
          praesentium nostrum enim hic impedit expedita quasi, inventore natus
          animi quam ipsam repellendus aut fugit nobis placeat, sapiente ipsum?
          Laborum similique sed quam optio praesentium. Atque necessitatibus
          recusandae nulla commodi, nesciunt ipsam maiores minus! Animi dolorum
          laboriosam, fugiat ipsam, corrupti temporibus voluptatem id, esse eius
          perspiciatis unde ut! Dignissimos, qui! Molestias, dignissimos
          corrupti. Laudantium, illum? Fuga veritatis, minima delectus, quo
          iusto modi animi incidunt alias earum atque cumque architecto
          laudantium nulla consectetur? Corrupti dolorum recusandae fugit,
          repellendus earum blanditiis delectus culpa molestias ea ipsum nobis?
          Velit, quas aliquam praesentium beatae blanditiis nobis natus
          voluptates obcaecati et in perspiciatis assumenda at ad culpa
          doloribus dicta repellendus accusantium, esse iure dolorem maxime
          eius. Dicta dignissimos aspernatur repudiandae. Enim ullam beatae
          distinctio, repellat rerum assumenda architecto, vel cum mollitia quos
          inventore aliquam aspernatur repudiandae perferendis veritatis
          eligendi eveniet cupiditate laborum nihil quisquam repellendus in
          voluptates maxime? Dolorum, optio! Doloribus eos odit accusamus
          pariatur id ducimus veritatis minus cumque assumenda sit. Cumque
          doloribus esse ex sint nihil voluptatibus voluptatem quia possimus
          itaque, blanditiis aut earum molestiae velit vero eveniet. Sapiente,
          at explicabo eius eos velit odit molestias blanditiis, ex dolores
          adipisci ullam. Dolorum rem autem animi, itaque alias doloremque
          eligendi, ratione voluptatibus deserunt iure quam at cum
          exercitationem et. Aperiam animi rem doloremque labore ea quae atque
          similique reprehenderit, illum nemo a praesentium inventore
          repellendus debitis ratione adipisci magnam reiciendis obcaecati sunt
          expedita quis dolor sequi id assumenda. Sunt? Porro explicabo rem
          maiores et. Magni similique laboriosam ipsum libero sequi aspernatur
          suscipit placeat dicta veniam incidunt voluptatem praesentium
          accusamus porro vitae, quae obcaecati deserunt. Harum consectetur
          vitae rerum quae? Eveniet unde temporibus, vitae minima expedita vel
          neque sed error eius sunt quidem esse sapiente, inventore ipsa, quod
          quisquam nesciunt odio alias cum nihil pariatur! Magni ab facere
          delectus quisquam. Amet vel doloribus adipisci quidem dolor ut ipsum
          quo ullam deserunt nisi eos eaque veritatis in ab culpa nemo quisquam
          ratione sit, tempore illo possimus assumenda a voluptate? Nulla, amet.
          Harum dicta accusamus modi quia iusto consectetur delectus corporis
          magnam praesentium, totam expedita alias consequatur cupiditate
          officiis reiciendis optio obcaecati unde sed, odit tempore? Nulla
          earum dignissimos similique dolores eveniet! Recusandae quidem commodi
          in earum sapiente nesciunt cumque aliquam aperiam, iure culpa!
          Doloribus ipsa delectus alias possimus nostrum, perspiciatis esse
          maxime. Impedit, quaerat quae? Beatae ipsam quo sequi commodi autem!
          Ducimus nisi facere repudiandae. Pariatur, provident exercitationem.
          Blanditiis inventore molestiae nulla animi asperiores rem harum
          eligendi aut, consectetur tempora iusto adipisci eaque aliquam saepe
          tempore eius repellendus quasi est. Recusandae?
        </p>
      </div>
    </motion.div>
  );
};
