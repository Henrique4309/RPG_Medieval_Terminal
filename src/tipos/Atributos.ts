export type NomeAtributo =
  | "forca"
  | "resistencia"
  | "agilidade"
  | "inteligencia"
  | "oratoria"
  | "fe";

export type Atributos = Record<NomeAtributo, number>;