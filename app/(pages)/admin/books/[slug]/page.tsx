import React from "react";

interface AdminBookPageProps {
  params: {
    slug: string;
  };
}

export default async function AdminBookPage({ params }: AdminBookPageProps) {
  const { slug } = params;

  return <main>slug</main>;
}
