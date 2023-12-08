import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spacer } from "@nextui-org/spacer";

import { AdminBooksWrapper } from "@/app/_admin/_components/AdminBooksWrapper.component";

export default function AdminBooksPage() {
  return (
    <div>
      <span className="flex justify-end">
        <Button as={Link} href="books/create" color="secondary">
          Crear Libro
        </Button>
      </span>
      <Spacer y={5} />
      <AdminBooksWrapper />
    </div>
  );
}
