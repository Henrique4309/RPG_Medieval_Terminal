import { Arma } from "./src/classes/Arma.ts";
import { Armadura } from "./src/classes/Armadura.ts";
import { Heroi } from "./src/classes/Heroi.ts";
import { Vilao } from "./src/classes/Vilao.ts";
import prompt from 'prompt-sync'

const teclado = prompt();
let opcao = 0;

const armaduraPadrao: Armadura = new Armadura("Armadura de Teste", "leve", 10)
const armaPadrao: Arma = new Arma("Arma de Teste", "corpo-corpo-leve", 20);
const heroiTeste: Heroi = new Heroi("Herói de Teste", 10, 10, 10, 10, 10, 10, 10, 0, 10, armaPadrao, armaduraPadrao);
const vilaoTeste: Vilao = new Vilao("Vilao de Teste", 10, 20, 10);

while (opcao !== 4 && heroiTeste.estaMorto() !== true && vilaoTeste.estaMorto() !== true) {
    console.log("1-testar ataque heroi\n2-testar ataque vilao\n3-status\n4-sair");
    opcao = +teclado("Escolha: ");
    switch (opcao) {
        case 1:
            const danoHeroi = heroiTeste.atacar();
            vilaoTeste.sofrerAtaque(danoHeroi);
            console.log(danoHeroi);

            break;
        case 2:
            const danoVilao = vilaoTeste.atacar();
            heroiTeste.sofrerAtaque(danoVilao);
            console.log(danoVilao);
            break;
        case 3:
            console.log("heroi :>> ", heroiTeste);
            console.log("vilao :>> ", vilaoTeste);
            break;
    };
};