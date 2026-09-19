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
    aprimorarAtributos(requisicao: number): void {
        if (requisicao == 1) {
            this.forca += Math.floor(5 + Math.random() * 5);
        } else if (requisicao == 2) {
            this.agilidade += Math.floor(5 + Math.random() * 5);
        } else if (requisicao == 3) {
            this.resistencia += Math.floor(5 + Math.random() * 5);
        } else if (requisicao == 4) {
            this.inteligencia += Math.floor(5 + Math.random() * 5);
        } else if (requisicao == 5) {
            this.percepcao += Math.floor(5 + Math.random() * 5);
        } else if (requisicao == 6) {
            this.carisma += Math.floor(5 + Math.random() * 5);
        } else if (requisicao == 7) {
            this.sorte += Math.floor(5 + Math.random() * 5);
        };
    };
    atacar(): number {
        let danoInfligido: number = 0;
        if (this.arma.tipo == "corpo-corpo-leve") {
            danoInfligido =
                Math.floor(Math.random() * this.arma.dano * (this.agilidade / 10)) +
                Math.floor(Math.random() * this.arma.dano * (this.agilidade / 10));
        } else if (this.arma.tipo == "corpo-corpo-pesada") {
            danoInfligido =
                Math.floor(Math.random() * this.arma.dano * (this.forca / 10)) +
                Math.floor(Math.random() * this.arma.dano * (this.forca / 10));
        } else if (this.arma.tipo == "longo-alcance") {
            danoInfligido =
                Math.floor(Math.random() * this.arma.dano * (this.percepcao / 10)) +
                Math.floor(Math.random() * this.arma.dano * (this.percepcao / 10));
        } else if (this.arma.tipo == "feitico") {
            danoInfligido =
                Math.floor(Math.random() * this.arma.dano * (this.inteligencia / 10)) +
                Math.floor(Math.random() * this.arma.dano * (this.inteligencia / 10));
        };
        return danoInfligido;
    };
    sofrerAtaque(danoRecebido: number): void {
        if (danoRecebido > this.armadura.protecao) {
            this.vida -= danoRecebido - this.armadura.protecao;
        };
    };
    estaMorto(): boolean {
        if (this.vida <= 0) {
            return true;
        } else {
            return false;
        };
    };
};