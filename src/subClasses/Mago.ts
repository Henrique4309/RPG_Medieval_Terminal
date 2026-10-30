import { Magia } from "../Magia.ts";
import { Personagem } from "../superClasses/Personagem.ts";
import { Util } from "../Util.ts";

export class Mago extends Personagem {

    private _magiaAtaque: Magia = new Magia("Chama", "Ataque", 8);
    private _magiaDefesa: Magia = new Magia("Pele de Arvore", "Defesa", 10);
    private _energia: number = 100;

    constructor(
        nome: string,
        raca: string,
        classe: string,
        vidaMaxima: number
    ) {
        super(nome, raca, classe, Math.round(vidaMaxima * 0.8));
        this._forca = 8;
        this._resistencia = 8;
        this._agilidade = 8;
        this._inteligencia = 16;
        this._eloquencia = 12;
        this._fe = 8;
    };

    public atacar(oponente: Personagem): void {
        if (this._pontosAcao >= 3) {
            this._pontosAcao -= 3;

            const acerto: boolean = (Util.randomico(1, 20) * this._inteligencia / 10) >= (Util.randomico(1, 20) * oponente.agilidade / 10);

            if (acerto) {
                const danoInicial: number = this._magiaAtaque.eficienciaReal(this._inteligencia) * this._energia / 100;

                this._energia -= 10;

                const critico: boolean = Util.randomico(1, 20) == 20;

                const danoTotal: number = critico ? danoInicial * 3 : danoInicial;

                oponente.sofrerAtaque(Math.round(danoTotal), this._magiaAtaque.magica);

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

            const acerto: boolean = (Util.randomico(1, 20) * this._inteligencia / 10) >= (Util.randomico(1, 20) * oponente.agilidade / 10);

            if (acerto) {
                const danoInicial: number = this._magiaAtaque.eficienciaReal(this._inteligencia) * this._energia / 100;

                this._energia -= 10;

                const critico: boolean = Util.randomico(1, 20) == 20;

                const danoTotal: number = critico ? danoInicial * 3 : danoInicial;

                oponente.sofrerAtaque(Math.round(danoTotal), this._magiaAtaque.magica);

                if (!oponente.estaVivo()) {
                    throw new Error("Oponente derrotado.");
                };
            };
        };
    };

    public sofrerAtaque(valor: number, danoMagico: boolean): void {
        
        const dano = valor - (this._magiaDefesa.eficienciaReal(this._inteligencia) * (this._energia / 100) + this._resistencia / 4);

        this._energia -= 10;

        if (dano > 0) {
            this._vidaAtual -= dano;
        };
    };
};