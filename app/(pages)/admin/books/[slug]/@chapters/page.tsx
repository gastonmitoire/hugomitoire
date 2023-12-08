import { ChapterFormWrapper } from "@/app/_chapters/_components/ChapterFormWrapper.component";

import { chapterService } from "@/app/_chapters/_service/chapter.service";

interface AdminBookChapterSectionPageProps {
  params: {
    slug: string;
  };
}

export default async function AdminBookChapterSectionPage({
  params,
}: AdminBookChapterSectionPageProps) {
  const { chapters, bookId } = await chapterService.getByQueryParam({
    key: "bookSlug",
    value: params.slug,
  });

  return (
    <div>
      <ChapterFormWrapper
        bookId={bookId}
        currentChapterOrder={chapters.length}
      />
      <h5 className="pb-1.5 pt-3 font-bold uppercase text-light text-opacity-50">
        Capítulos ({chapters.length})
      </h5>
      <ul className="space-y-3">
        {chapters
          .sort((a, b) => b.order - a.order)
          .map((chapter, index) => (
            <li
              key={index}
              className="flex select-none items-center gap-3 bg-light bg-opacity-10 p-3 transition-opacity hover:cursor-pointer hover:bg-opacity-20"
            >
              <p>{chapter.order}</p>
              <p>{chapter.title}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
