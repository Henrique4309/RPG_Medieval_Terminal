import { Guerreiro } from "./subClasses/Guerreiro.ts";
import { Ladino } from "./subClasses/Ladino.ts";
import { Mago } from "./subClasses/Mago.ts";
import { Personagem } from "./superClasses/Personagem.ts";
import { Util } from "./Util.ts";

const primeiro: Personagem = new Guerreiro("Henrique", "Humano", "Guerreiro", 12);
const segundo: Personagem = new Guerreiro("Rafael", "Humano", "Guerreiro", 12);
const terceiro: Personagem = new Guerreiro("Cristhofer", "Humano", "Guerreiro", 12);
const quarto: Personagem = new Ladino("Bilbo Bolseiro", "Hobbit", "Ladino", 12)
const quinto: Personagem = new Mago("Edécio", "Humano", "Mago", 12)

const combatentes: Personagem[] = [primeiro, segundo, terceiro, quarto, quinto];
let ciclos: number = 0;

while (true) {
    ciclos += 1;
    const atacante = Util.randomico(0, combatentes.length - 1);
    const atacado = Util.randomico(0, combatentes.length - 1);
    if (atacante != atacado) {
        try {
            const quemAtaca = combatentes[atacante];
            const quemEatacado = combatentes[atacado];
            if (quemAtaca && quemEatacado) {
                quemAtaca.atacar(quemEatacado);
                quemAtaca.recuperarAcao();
                quemEatacado.recuperarAcao();
            };
        } catch {
            const index = combatentes.findIndex(combatente => combatente.estaVivo() === false);
            if (index != -1) {
                combatentes.splice(index, 1);
            };
        };
    };
    if (combatentes.length == 1) {
        break;
    };
};

console.log("Vencedor:\n");
console.log(combatentes);
console.log("\nNumero de ciclos >>" + ciclos);