import { Item } from "../superClasses/Item.ts";
import { Personagem } from "../superClasses/Personagem.ts";
import { Util } from "../Util.ts";
import { Arma } from "./Arma.ts";
import { Armadura } from "./Armadura.ts";

export class Ladino extends Personagem {

    private _arma: Item = new Arma("Adaga", "Arma Leve", 4);
    private _armadura: Item = new Armadura("Armadura de Couro", "Armadura Leve", 8);

    constructor(
        nome: string,
        raca: string,
        classe: string,
        vidaMaxima: number
    ) {
        super(nome, raca, classe, Math.round(vidaMaxima * 0.8));
        this._forca = 8;
        this._resistencia = 8;
        this._agilidade = 16;
        this._inteligencia = 8;
        this._eloquencia = 12;
        this._fe = 8;
    };

    public atacar(oponente: Personagem): void {
        if (this._pontosAcao >= 3) {
            this._pontosAcao -= 3;

            const acerto: boolean = (Util.randomico(1, 20) * this._agilidade / 10) >= (Util.randomico(1, 20) * oponente.agilidade / 10);

            if (acerto) {
                let danoInicial: number = 0;

                switch (this._arma.tipo) {
                    case "Arma Leve":
                        danoInicial = this._arma.danoReal(this._agilidade);
                        break;
                    case "Arma Pesada":
                        danoInicial = this._arma.danoReal(this._forca);
                        break;
                };

                this._arma.danificar(Util.randomico(1, 5));

                const critico: boolean = Util.randomico(1, 20) == 20;

                const danoTotal: number = critico ? danoInicial * 3 : danoInicial;

                oponente.sofrerAtaque(Math.round(danoTotal), this._arma.magica);

                if (oponente.estaVivo()) {
                    oponente.contraAtacar(this);
                } else {
                    throw new Error("Oponente derrotado.")
                };
            };
        };
    };

    public contraAtacar(oponente: Personagem): void {
        if (this._pontosAcao >= 3) {
            this._pontosAcao -= 3;

            const acerto: boolean = (Util.randomico(1, 20) * this._agilidade / 10) >= (Util.randomico(1, 20) * oponente.agilidade / 10);

            if (acerto) {
                let danoInicial: number = 0;

                switch (this._arma.tipo) {
                    case "Arma Leve":
                        danoInicial = this._arma.danoReal(this._agilidade);
                        break;
                    case "Arma Pesada":
                        danoInicial = this._arma.danoReal(this._forca);
                        break;
                };

                this._arma.danificar(Util.randomico(0, 5));

                const critico: boolean = Util.randomico(1, 20) == 20;

                const danoTotal: number = critico ? danoInicial * 3 : danoInicial;

                oponente.sofrerAtaque(Math.round(danoTotal), this._arma.magica);

                if (!oponente.estaVivo()) {
                    throw new Error("Oponente derrotado.");
                };
            };
        };
    };

    public sofrerAtaque(valor: number, danoMagico: boolean): void {
        let dano = 0;

        if (danoMagico && !this._armadura.magica) {
            dano = valor - this._resistencia / 4;
        } else {
            switch (this._armadura.tipo) {
                case "Armadura Leve":
                    dano = valor - (this._armadura.protecaoReal(this._agilidade) + this._resistencia / 4);
                    break;
                case "Armadura Pesada":
                    dano = valor - (this._armadura.protecaoReal(this._forca) + this._resistencia / 4);
                    break;
            };

            this._armadura.danificar(valor);
        };


        if (dano > 0) {
            this._vidaAtual -= dano;
        };
    };

    public roubarPontosAcao(oponente: Personagem): void {
        if (oponente.pontosAcao >= 3) {
            const acerto: boolean = (Util.randomico(1, 20) * this._agilidade / 10) >= (Util.randomico(1, 20) * oponente.agilidade / 10);
            if (acerto) {
                oponente.perderAcao(3);
                this._pontosAcao += 3;
            };
        };
    };
};