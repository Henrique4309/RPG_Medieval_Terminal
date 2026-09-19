import { Arma } from "./Arma.ts";
import { Armadura } from "./Armadura.ts";

export class Heroi {
    vida: number;
    constructor(
        public nome: string,
        public forca: number,
        public agilidade: number,
        public resistencia: number,
        public inteligencia: number,
        public percepcao: number,
        public carisma: number,
        public sorte: number,
        public experiencia: number,
        public pontosAcao: number,
        public arma: Arma,
        public armadura: Armadura,
    ) {
        this.vida = this.resistencia * 3;
    };
};