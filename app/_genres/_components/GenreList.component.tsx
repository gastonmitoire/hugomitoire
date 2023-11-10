"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";
import { toast } from "sonner";

import { TrashIcon } from "@heroicons/react/20/solid";

import { Genre as GenreModel } from "@prisma/client";

import { genresService } from "../_service/genres.service";

interface GenreListProps {
  genres: GenreModel[];
}

export const GenreList: React.FC<GenreListProps> = ({ genres }) => {
  const router = useRouter();
  const handleDelete = async (slug: string) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    try {
      await genresService.delete(slug);
      toast.success("Genre deleted successfully");
      router.refresh();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ul
      className="flex flex-col gap-3 pb-3 pr-10"
      style={{ listStyle: "none" }}
    >
      {genres.map((genre) => (
        <li
          key={genre.id}
          className="flex items-center justify-between rounded-lg bg-light bg-opacity-10 p-3 shadow-md"
        >
          <p className="cursor-pointer text-lg font-bold">{genre.name}</p>

          <Button
            color="danger"
            variant="ghost"
            size="sm"
            isIconOnly
            onClick={() => handleDelete(genre.slug)}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </li>
      ))}
    </ul>
  );
};
