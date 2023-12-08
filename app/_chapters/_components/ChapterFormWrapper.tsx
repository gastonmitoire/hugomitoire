import React from "react";

import { ChapterForm } from "./ChapterForm";

interface ChapterFormWrapperProps {
  bookId: string;
  currentChapterOrder: number;
}

export const ChapterFormWrapper: React.FC<ChapterFormWrapperProps> = ({
  bookId,
  currentChapterOrder,
}) => {
  return <ChapterForm bookId={bookId} currentOrder={currentChapterOrder} />;
};
