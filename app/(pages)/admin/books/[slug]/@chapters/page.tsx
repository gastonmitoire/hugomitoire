interface AdminBookChapterSectionPageProps {
  params: {
    slug: string;
  };
}

export default async function AdminBookChapterSectionPage({
  params,
}: AdminBookChapterSectionPageProps) {
  return "CHAPTERS";
}
