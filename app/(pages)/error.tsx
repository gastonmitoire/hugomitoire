"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const redirectHome: () => void = () => router.push("/");
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-white">
      <h2>Hubo un error.</h2>
      <div className="space-x-5 py-5">
        {pathname !== "/" && (
          <Button onClick={redirectHome} color="secondary">
            Volver al inicio
          </Button>
        )}
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}
