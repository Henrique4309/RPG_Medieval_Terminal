export type NomeAtributo =
  | "Forca"
  | "Resistencia"
  | "Agilidade"
  | "Inteligencia"
  | "Oratoria"
  | "Fe";

export type Atributos = Record<NomeAtributo, number>;