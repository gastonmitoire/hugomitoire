// new-book page

import { Divider } from "@nextui-org/divider";

import { BookForm } from "@/app/_components/forms/BookForm";

const fetchImages = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/images");
  const data = await response.json();

  return data;
};

export default async function AdminBooksNewPage() {
  const images = await fetchImages();

  console.log(images);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl text-center font-bold">Crear libro</h2>
      <Divider className="my-5" />
      <BookForm images={images} />
    </div>
  );
}
