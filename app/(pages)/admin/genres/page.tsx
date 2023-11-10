import { Spacer } from "@nextui-org/spacer";

import { GenreFormWrapper } from "@/app/_assets/_genres/_components/GenreFormWrapper.component";
import { GenreListWrapper } from "@/app/_assets/_genres/_components/GenreListWrapper.component";

import { genresService } from "@/app/_assets/_genres/_service/genres.service";

export default async function AdminGenresPage() {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <h1 className="text-3xl font-bold">Genres list</h1>

        <Spacer y={2} />

        <GenreListWrapper />
      </div>

      <div className="col-span-1">
        <h1 className="text-3xl font-bold">Create a genre</h1>

        <Spacer y={2} />

        <GenreFormWrapper />
      </div>
    </div>
  );
}
