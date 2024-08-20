import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Text } from "@prisma/client";
import { Cinzel, Bellefair, Reggae_One } from "next/font/google";
import { EnhancedChapterModel } from "../_service/chapter.service";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const cinzel = Cinzel({ subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

interface ChapterListProps {
  chapters: EnhancedChapterModel[];
  bookTitle: Book["title"];
}

interface ContentTextProps {
  selectedText: Text[] | null;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -50 },
};

export function ChapterList({ chapters, bookTitle }: ChapterListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedText, setSelectedText] = useState<
    EnhancedChapterModel["text"] | null
  >(null);

  const handleChapterModal = (text: EnhancedChapterModel["text"]) => {
    setSelectedText(text);
    onOpen();
  };

  const ContentText = ({ selectedText }: ContentTextProps) => {
    const combinedHtmlString = selectedText
      ? selectedText.map((textItem) => textItem.content).join("")
      : "";

    const replacedHtmlString = combinedHtmlString.replace(
      /font-family:'[^']*'/g,
      "font-family:''"
    );

    return (
      <div
        className={cinzel.className}
        dangerouslySetInnerHTML={{ __html: replacedHtmlString }}
      />
    );
  };

  return (
    <section className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
      {chapters.length > 0 ? (
        chapters.map(({ title, order, text }, index) => (
          <motion.div
            key={index}
            className="flex w-full"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delayChildren: 0.3 }}
            variants={container}
          >
            <AnimatePresence>
              <motion.span
                className={`h-full w-full select-none rounded-sm border border-transparent ${
                  cinzel.className
                } ${
                  text.length > 0
                    ? "duration-300 hover:border-primary hover:transition-colors"
                    : ""
                }`}
                transition={{ delay: 0.1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                variants={item}
              >
                {text.length > 0 ? (
                  <div
                    className={`flex cursor-pointer bg-darker bg-opacity-50 p-5 text-lg`}
                    onClick={() => handleChapterModal(text)}
                  >
                    <span className="truncate">
                      {order}. {title}
                    </span>
                  </div>
                ) : (
                  <span className={`flex bg-darker bg-opacity-50 p-5 text-lg`}>
                    <span className="truncate">
                      {order}. {title}
                    </span>
                  </span>
                )}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        ))
      ) : (
        <div className="col-span-2 text-center text-xl font-bold uppercase text-light text-opacity-50">
          no hay capítulos disponibles
        </div>
      )}
      <div className="col-span-2 mx-auto h-1 w-1/2 bg-light bg-opacity-20" />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <p className="text-dark">{bookTitle}</p>
          </ModalHeader>
          <ModalBody>
            <ContentText selectedText={selectedText} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
}
