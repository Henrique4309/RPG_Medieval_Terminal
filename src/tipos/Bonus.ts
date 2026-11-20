import { NomeAtributo } from "./Atributos.ts";

export type Bonus = {
  atributo: NomeAtributo;
  valor: number;          
  fonte: string;          
  turnos?: number;        
};