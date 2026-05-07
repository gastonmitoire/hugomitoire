import { VideoData } from "./types";

export const SERIES_LABELS: Record<VideoData["series"], string> = {
  terror: "Cuarentena de Terror",
  jovenes: "Cuarentena con Jóvenes y Adultos",
  aventuras: "Cuarentena con Aventuras y Humor",
};

export const videos: VideoData[] = [
  // Cuarentena de Terror (10 ep)
  { id: "wQHN8scACoI", slug: "terror-01", title: "Cuarentena de Terror – Ep. 1", series: "terror", episode: 1, duration: 649, tags: ["terror", "cuarentena"] },
  { id: "7FCFRkYzNYA", slug: "terror-02", title: "Cuarentena de Terror – Ep. 2", series: "terror", episode: 2, duration: 840, tags: ["terror", "cuarentena"] },
  { id: "da23Be36XW0", slug: "terror-03", title: "Cuarentena de Terror – Ep. 3", series: "terror", episode: 3, duration: 882, tags: ["terror", "cuarentena"] },
  { id: "Ym3ya4hzaXQ", slug: "terror-04", title: "Cuarentena de Terror – Ep. 4", series: "terror", episode: 4, duration: 1732, tags: ["terror", "cuarentena"] },
  { id: "lf1qePpErTM", slug: "terror-05", title: "Cuarentena de Terror – Ep. 5", series: "terror", episode: 5, duration: 869, tags: ["terror", "cuarentena"] },
  { id: "3piQBDz84Bg", slug: "terror-06", title: "Cuarentena de Terror – Ep. 6", series: "terror", episode: 6, duration: 1830, tags: ["terror", "cuarentena"] },
  { id: "Uuf_7Ak0k90", slug: "terror-07", title: "Cuarentena de Terror – Ep. 7", series: "terror", episode: 7, duration: 461, tags: ["terror", "cuarentena"] },
  { id: "YmtE2QZElGA", slug: "terror-08", title: "Cuarentena de Terror – Ep. 8", series: "terror", episode: 8, duration: 1292, tags: ["terror", "cuarentena"] },
  { id: "huz8bl6SGdU", slug: "terror-09", title: "Cuarentena de Terror – Ep. 9", series: "terror", episode: 9, duration: 577, tags: ["terror", "cuarentena"] },
  { id: "SQ1UUHUDZLk", slug: "terror-10", title: "Cuarentena de Terror – Ep. 10", series: "terror", episode: 10, duration: 687, tags: ["terror", "cuarentena"] },

  // Cuarentena con Jóvenes y Adultos (11 ep)
  { id: "h4LlNmGgWP4", slug: "jovenes-01", title: "Cuarentena con Jóvenes y Adultos – Ep. 1", series: "jovenes", episode: 1, duration: 302, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "qBPJdP5NR88", slug: "jovenes-02", title: "Cuarentena con Jóvenes y Adultos – Ep. 2", series: "jovenes", episode: 2, duration: 368, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "oE_p9dxSYDw", slug: "jovenes-03", title: "Cuarentena con Jóvenes y Adultos – Ep. 3", series: "jovenes", episode: 3, duration: 452, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "sk7tZPWjQC8", slug: "jovenes-04", title: "Cuarentena con Jóvenes y Adultos – Ep. 4", series: "jovenes", episode: 4, duration: 227, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "Yx8W4_5H3RU", slug: "jovenes-05", title: "Cuarentena con Jóvenes y Adultos – Ep. 5", series: "jovenes", episode: 5, duration: 308, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "4ywtCFsWuAg", slug: "jovenes-06", title: "Cuarentena con Jóvenes y Adultos – Ep. 6", series: "jovenes", episode: 6, duration: 164, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "1FmPmiS_UKY", slug: "jovenes-07", title: "Cuarentena con Jóvenes y Adultos – Ep. 7", series: "jovenes", episode: 7, duration: 1147, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "C_w5VOY3_AE", slug: "jovenes-08", title: "Cuarentena con Jóvenes y Adultos – Ep. 8", series: "jovenes", episode: 8, duration: 550, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "nz6pGqWSJiI", slug: "jovenes-09", title: "Cuarentena con Jóvenes y Adultos – Ep. 9", series: "jovenes", episode: 9, duration: 568, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "cUwmUswFXzI", slug: "jovenes-10", title: "Cuarentena con Jóvenes y Adultos – Ep. 10", series: "jovenes", episode: 10, duration: 110, tags: ["jóvenes", "adultos", "cuarentena"] },
  { id: "R-P8CuBnCRg", slug: "jovenes-11", title: "Cuarentena con Jóvenes y Adultos – Ep. 11", series: "jovenes", episode: 11, duration: 603, tags: ["jóvenes", "adultos", "cuarentena"] },

  // Cuarentena con Aventuras y Humor (9 ep)
  { id: "eqnuqfqY8uI", slug: "aventuras-01", title: "Cuarentena con Aventuras y Humor – Ep. 1", series: "aventuras", episode: 1, duration: 996, tags: ["aventuras", "humor", "cuarentena"] },
  { id: "PjfCmhBVJ9g", slug: "aventuras-02", title: "Cuarentena con Aventuras y Humor – Ep. 2", series: "aventuras", episode: 2, duration: 512, tags: ["aventuras", "humor", "cuarentena"] },
  { id: "Q0ZGsn-Wajo", slug: "aventuras-03", title: "Cuarentena con Aventuras y Humor – Ep. 3", series: "aventuras", episode: 3, duration: 690, tags: ["aventuras", "humor", "cuarentena"] },
  { id: "uaqhInrp9Ck", slug: "aventuras-04", title: "Cuarentena con Aventuras y Humor – Ep. 4", series: "aventuras", episode: 4, duration: 464, tags: ["aventuras", "humor", "cuarentena"] },
  { id: "1giMuV2HsOs", slug: "aventuras-05", title: "Cuarentena con Aventuras y Humor – Ep. 5", series: "aventuras", episode: 5, duration: 552, tags: ["aventuras", "humor", "cuarentena"] },
  { id: "BuSSlLEA9kk", slug: "aventuras-06", title: "Cuarentena con Aventuras y Humor – Ep. 6", series: "aventuras", episode: 6, duration: 168, tags: ["aventuras", "humor", "cuarentena"] },
  { id: "qZ2vJlH_w6Q", slug: "aventuras-07", title: "Cuarentena con Aventuras y Humor – Ep. 7", series: "aventuras", episode: 7, duration: 720, tags: ["aventuras", "humor", "cuarentena"] },
  { id: "VDflZxpsYyo", slug: "aventuras-08", title: "Cuarentena con Aventuras y Humor – Ep. 8", series: "aventuras", episode: 8, duration: 1414, tags: ["aventuras", "humor", "cuarentena"] },
  { id: "fV9emDhqTIA", slug: "aventuras-09", title: "Cuarentena con Aventuras y Humor – Ep. 9", series: "aventuras", episode: 9, duration: 916, tags: ["aventuras", "humor", "cuarentena"] },
];
