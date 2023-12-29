import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 text-white">
      <h3 className="text-xl font-bold uppercase text-primary text-opacity-50">
        No se han encontrado resultados.
      </h3>

      <Button
        as={Link}
        href="/"
        size="lg"
        color="secondary"
        className="uppercase"
      >
        Volver al inicio
      </Button>
    </div>
  );
}
