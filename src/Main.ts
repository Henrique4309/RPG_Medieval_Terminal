import { Personagem } from "./classes/personagens/Personagem.ts";

const personagem = new Personagem("Henrique", "Humanoide");

personagem.receberDano(15);

personagem.curar(5);

console.log(personagem);