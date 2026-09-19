import { Arma } from "./src/classes/Arma.ts";
import { Armadura } from "./src/classes/Armadura.ts";
import { Heroi } from "./src/classes/Heroi.ts";
import { Vilao } from "./src/classes/Vilao.ts";

const armaduraPadrao: Armadura = new Armadura("Armadura de Teste", "leve", 10)
const armaPadrao: Arma = new Arma("Arma de Teste", "corpo-corpo-leve", 10);
const heroiTeste: Heroi = new Heroi("Herói de Teste", 10, 10, 10, 10, 10, 10, 10, 0, 10, armaPadrao, armaduraPadrao);
const vilaoTeste: Vilao = new Vilao("Vilao de Teste", 100, 10, 10);

console.log("heroi :>> ", heroiTeste);
console.log("vilao :>> ", vilaoTeste);