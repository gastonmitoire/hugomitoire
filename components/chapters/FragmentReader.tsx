"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cleanFragmentHtml } from "@/lib/utils";
import { ChapterData } from "@/data/types";

interface FragmentReaderProps {
  bookTitle: string;
  chapter: ChapterData | null;
  open: boolean;
  onClose: () => void;
}

export function FragmentReader({ bookTitle, chapter, open, onClose }: FragmentReaderProps) {
  const html = chapter?.fragment ? cleanFragmentHtml(chapter.fragment) : "";

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/72 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Panel */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.98 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
              >
                <div
                  className="relative w-full max-w-2xl max-h-[90dvh] flex flex-col rounded-sm overflow-hidden shadow-2xl"
                  style={{
                    background: "#F4ECD8",
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#2C1A10]/10 shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen size={15} className="text-[#2C1A10]/45 shrink-0" />
                      <div className="min-w-0">
                        <Dialog.Title className="font-cinzel text-[10px] font-bold text-[#1A0F08] uppercase tracking-widest leading-none truncate">
                          {bookTitle}
                        </Dialog.Title>
                        {chapter && (
                          <p className="text-[#2C1A10]/55 text-[11px] mt-0.5 truncate">
                            {chapter.order}. {chapter.title}
                          </p>
                        )}
                      </div>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        aria-label="Cerrar"
                        className="shrink-0 p-1.5 rounded-sm text-[#2C1A10]/45 hover:text-[#2C1A10] hover:bg-[#2C1A10]/08 transition-colors ml-4"
                      >
                        <X size={17} />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Body */}
                  <ScrollArea.Root className="flex-1 min-h-0 overflow-hidden">
                    <ScrollArea.Viewport className="h-full w-full">
                      <div className="px-8 sm:px-14 py-8">
                        <div
                          className="fragment-reader"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                      orientation="vertical"
                      className="flex select-none touch-none p-0.5 w-2.5 transition-colors"
                    >
                      <ScrollArea.Thumb className="flex-1 bg-[#2C1A10]/25 rounded-full" />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>

                  {/* Footer */}
                  <div className="px-8 py-3 border-t border-[#2C1A10]/10 flex justify-end shrink-0">
                    <button
                      onClick={onClose}
                      className="text-[10px] text-[#2C1A10]/45 hover:text-[#2C1A10] transition-colors uppercase tracking-widest"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
