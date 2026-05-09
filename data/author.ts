import { AuthorData } from "./types";

export const author: AuthorData = {
  name: "Hugo Mitoire",
  origin: "Margarita Belén, Chaco, Argentina",
  bio: [
    "Hugo Mitoire es un escritor argentino nacido en Margarita Belén, Chaco. Su obra recorre géneros tan diversos como el terror, el fantástico, la ciencia ficción y el policial negro, pero siempre con un hilo conductor: las historias del interior profundo de Argentina.",
    "Desde sus primeros relatos construyó un universo propio donde conviven leyendas del monte chaqueño, criaturas del folclore popular y personajes tan reales como cualquier vecino de barrio. Su prosa directa y su oído para el habla coloquial lo convierten en un narrador visceral e inmediato.",
    "La serie 'Cuentos de Terror para Franco', su obra más extensa y querida por el público infantil y juvenil, alcanzó nueve tomos y se convirtió en referencia del género en la región. Pero su veta más oscura se despliega en novelas como 'Los Ojos de Mariel' o 'La Cacería', donde el noir argentino encuentra una voz propia.",
  ],
  quote: "Contar historias es el único conjuro que conozco contra el olvido.",
  quoteSource: "Entrevista, 2022",
  stats: { books: 20, series: 2, yearsWriting: 25 },
  awards: [
    {
      title: "Premio Regional de Literatura",
      year: "2015",
      description: "Por la serie Cuentos de Terror para Franco",
    },
    {
      title: "Reconocimiento Cultural del Chaco",
      year: "2019",
      description: "Por su aporte a la literatura infantil y juvenil regional",
    },
    {
      title: "Mención especial — Feria del Libro del NEA",
      year: "2022",
      description: "Por Los Ojos de Mariel",
    },
  ],
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com/hugodanielmitoire" },
    { platform: "facebook", url: "https://facebook.com/hmitoire" },
    { platform: "youtube", url: "https://www.youtube.com/@hugomitoire7334" },
  ],
};
