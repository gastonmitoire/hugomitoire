import React from "react";

import { GenreList } from "./GenreList.component";

import { genresService } from "../_service/genres.service";

export const GenreListWrapper: React.FC = async () => {
  const genres = await genresService.getAll();

  return <GenreList genres={genres} />;
};
