import { Atributos } from "../../tipos/Atributos.ts";
import { TipoPersonagem } from "../../tipos/TipoPersonagem.ts";
import { GerenciadorAtributos } from "../GerenciadorAtributos.ts";
import { RecursoVital } from "../RecursoVital.ts";

export abstract class Personagem {

    protected _recursoVital: RecursoVital;
    protected _atributos: GerenciadorAtributos;
    protected _pontosAcao: number = 10;

    constructor(
        readonly _nome: string,
        readonly _tipo: TipoPersonagem,
        atributos: Atributos,
        protected _mortoVivo: boolean = false
    ) {
        this._atributos = new GerenciadorAtributos(atributos);
        this._recursoVital = new RecursoVital(this._atributos.recursoVitalMaximo());
    };

    public abstract atacar(oponente: Personagem): void;
    public abstract contraAtacar(oponente: Personagem): void;
    public abstract sofrerAtaque(dano: number): void;

    public passarTurno() {
        this._atributos.passarTurno();
        this._pontosAcao = Math.min(this._pontosAcao + 10, 15);
        this._recursoVital.setMaximo = Math.min(this._recursoVital.valorAtual, this._atributos.recursoVitalMaximo());
    };

};