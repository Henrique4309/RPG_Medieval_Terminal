import { TipoCriatura } from "../../tipos/TipoCriatura.ts";
import { GerenciadorAtributos } from "../GerenciadorAtributos.ts";

export class Personagem {

    protected _vida: number;
    protected _atributos: GerenciadorAtributos;

    constructor(
        protected _nome: string,
        protected _tipoCriatura: TipoCriatura,
    ) {
        this._atributos = new GerenciadorAtributos({
            forca: 10,
            resistencia: 10,
            agilidade: 10,
            inteligencia: 10,
            oratoria: 10,
            fe: 10
        });
        this._vida = this._atributos.vidaMaxima();
    };

    public curar(qtd: number) {
        this._vida = Math.min(this._vida + qtd, this._atributos.vidaMaxima());
    };

    public receberDano(qtd: number) {
        this._vida = Math.max(this._vida - qtd, 0);
    };

    public passarTurno() {
        this._atributos.passarTurno();
        this._vida = Math.min(this._vida, this._atributos.vidaMaxima());
    };

    public get nome(): string {
        return this._nome;
    };

    public get tipoCriatura(): string {
        return this._tipoCriatura;
    };
};