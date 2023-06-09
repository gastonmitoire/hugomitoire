import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ProgressBar } from "./progress_bar";

type SliderProps<T> = {
  items: T[];
  onChange: (index: number) => void;
  renderItem: (item: T) => React.ReactNode;
  autoPlay?: boolean;
};

export function Slider<T>({
  items,
  onChange,
  renderItem,
  autoPlay,
}: SliderProps<T>) {
  const [reset, setReset] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = items.length;

  const handleAutoPlay = useCallback(() => {
    const newIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onChange(newIndex);
    handleReset();
  }, [currentIndex, length, onChange]);

  function handleNext() {
    const newIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onChange(newIndex);
    handleReset();
  }

  function handleReset() {
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 100);
  }

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleAutoPlay();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, handleAutoPlay]);

  return (
    <div className="relative md:w-full md:h-full select-none overflow-x-hidden">
      <div className="flex h-full w-full">
        <ProgressBar timeout={15000} reset={reset} />
      </div>

      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:absolute inset-0 flex items-center justify-center"
        >
          {renderItem(items[currentIndex])}
        </motion.div>
      </AnimatePresence>

      <motion.button
        initial={{ top: 70, opacity: 0 }}
        animate={{ top: 30, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileTap={{ x: 15 }}
        whileHover={{ top: 70 }}
        className="md:absolute group hidden md:grid place-items-center h-3/4 right-0 w-[8%] rounded-l-xl dark:bg-neutral-900 dark:bg-opacity-80 dark:hover:bg-opacity-100"
        onClick={handleNext}
      >
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3 }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 hidden md:block pointer-events-none rotate-90 transition-transform ease-in duration-300 dark:stroke-neutral-700 group-hover:rotate-0 group-hover:dark:stroke-neutral-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </motion.svg>
      </motion.button>
    </div>
  );
}
