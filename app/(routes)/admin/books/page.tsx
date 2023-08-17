import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

export default function AdminBooksPage() {
  return (
    <main className="container mx-auto">
      <div className="flex justify-end">
        <Button as={Link} color="secondary" href="books/new">
          Crear libro
        </Button>
      </div>
      <Divider className="my-3" />
    </main>
  );
}
