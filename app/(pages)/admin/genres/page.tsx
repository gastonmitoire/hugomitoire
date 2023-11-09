import { Spacer } from "@nextui-org/spacer";

import { GenreFormWrapper } from "@/app/_genres/_components/GenreFormWrapper.component";

import { genresService } from "@/app/_genres/_service/genres.service";

export default async function AdminGenresPage() {
  const genres = await genresService.getAll();

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <h1 className="text-3xl font-bold">Genres list ({genres.length})</h1>

        <Spacer y={2} />

        <ul
          className="flex flex-col gap-3 pb-3 pr-10"
          style={{ listStyle: "none" }}
        >
          {genres.map((genre) => (
            <li
              key={genre.id}
              className="rounded-lg bg-light bg-opacity-10 p-3 shadow-md"
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-1">
        <h1 className="text-3xl font-bold">Create a genre</h1>

        <Spacer y={2} />

        <GenreFormWrapper />
      </div>
    </div>
  );
}
