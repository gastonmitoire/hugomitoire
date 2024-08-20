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
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { DocumentText as DocumentTextIcon } from "iconsax-react";

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
  const [darkMode, setDarkMode] = useState(false);
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
                    <span className="flex-1 truncate">
                      {order}. {title}
                    </span>

                    <DocumentTextIcon className="text-primary" />
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

      <Modal
        size="3xl"
        className="bg-[#F4ECD8]"
        classNames={{
          closeButton: "hover:bg-[#F4ECD8] hover:text-dark",
        }}
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        style={{
          backgroundColor: "#f4ecd8",
          backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
        }}
      >
        <ModalContent>
          <ModalHeader>
            <p className="text-dark dark:text-light">{bookTitle}</p>
          </ModalHeader>
          <ModalBody>
            <ScrollShadow className="max-h-[75vh] scrollbar-hide dark:text-light">
              <ContentText selectedText={selectedText} />
            </ScrollShadow>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
}
