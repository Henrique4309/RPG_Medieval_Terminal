import prompt from 'prompt-sync'
import { Arma } from './src/classes/Arma.ts';
import { Armadura } from './src/classes/Armadura.ts';
import { Feitico } from './src/classes/Feitico.ts';
import { Heroi } from './src/classes/Heroi.ts';
import { Mago } from './src/subClasses/Mago.ts';
import { Guerreiro } from './src/subClasses/Guerreiro.ts';
import { Ladino } from './src/subClasses/Ladino.ts';


const armaLeve: Arma = new Arma("Adaga", "Arma Leve", 6);
const armaPesada: Arma = new Arma("Montante", "Arma Pesada", 18);
const armaduraLeve: Armadura = new Armadura("Armadura de Couro", "Armadura Leve", 6);
const armaduraPesada: Armadura = new Armadura("Armadura de Placas de Aço", "Armadura Pesada", 12);
const feiticoAtaque: Feitico = new Feitico("Chamas", "Ataque", 18);
const feiticoDefesa: Feitico = new Feitico("Armadura de Mago", "Defesa", 12);


const guerreiro: Heroi = new Guerreiro("Guerreiro", 100, 30, 0, 14, 16, armaPesada, armaduraPesada);
const ladino: Heroi = new Ladino("Ladino", 100, 25, 0, 12, 16, armaLeve, armaduraLeve);
const mago: Heroi = new Mago("Mago", 100, 20, 0, 10, 16, feiticoAtaque, feiticoDefesa);


const teclado = prompt();
let escolha = "";


function testeCombate() {
    escolha = "";
    while (escolha !== "sair") {
        guerreiro.setEnergia = 9;
        ladino.setEnergia = 9;
        mago.setEnergia = 9;
        while (guerreiro.estaMorto() !== true && guerreiro.energia > 0 && escolha !== "sair") {
            console.log("\nladino", "\nmago\n");
            escolha = teclado("Quem atacar: ");
            switch (escolha) {
                case ("ladino"):
                    ladino.sofrerAtaque(guerreiro.atacar());
                    break
                case ("mago"):
                    mago.sofrerAtaque(guerreiro.atacar());
                    break
            };
        };
        while (ladino.estaMorto() !== true && ladino.energia > 0 && escolha !== "sair") {
            console.log("\nguerreiro", "\nmago\n");
            escolha = teclado("Quem atacar: ");
            switch (escolha) {
                case ("guerreiro"):
                    guerreiro.sofrerAtaque(ladino.atacar());
                    break
                case ("mago"):
                    mago.sofrerAtaque(ladino.atacar());
                    break
            };
        };
        while (mago.estaMorto() !== true && mago.energia > 0 && escolha !== "sair") {
            console.log("\nguerreiro", "\nladino\n");
            escolha = teclado("Quem atacar: ")
            switch (escolha) {
                case ("ladino"):
                    ladino.sofrerAtaque(mago.atacar());
                    break
                case ("guerreiro"):
                    guerreiro.sofrerAtaque(mago.atacar());
                    break
            };
        };
        console.log("Guerreiro :>>", guerreiro);
        console.log("Ladino :>>", ladino);
        console.log("Mago :>>", mago);
    };
};
function testeAprimorar() {
    escolha = "";
    console.log("\nguerreiro", "\nladino", "\nmago\n");
    escolha = teclado("Quem: ")
    switch (escolha) {
        case ("guerreiro"):
            console.log("\nforca", "\nresistencia");
            escolha = teclado("O que aprimorar: ");
            guerreiro.aprimorarAtributos(escolha);
            break
        case ("ladino"):
            console.log("\nagilidade", "\nresistencia");
            escolha = teclado("O que aprimorar: ");
            ladino.aprimorarAtributos(escolha);
            break
        case ("mago"):
            console.log("\ninteligencia", "\nresistencia");
            escolha = teclado("O que aprimorar: ");
            mago.aprimorarAtributos(escolha);
            break
    };
};
function teste() {
    escolha = "";
    while (escolha !== "sair") {
        console.log("\ncombate", "\naprimorar", "\nsair", "\nstatus\n");
        escolha = teclado("Escolha: ");
        switch (escolha) {
            case ("combate"):
                testeCombate();
                break
            case ("aprimorar"):
                testeAprimorar();
                break
            case ("status"):
                console.log("Guerreiro :>>", guerreiro);
                console.log("Ladino :>>", ladino);
                console.log("Mago :>>", mago);
                break
        };
    };
};
teste();