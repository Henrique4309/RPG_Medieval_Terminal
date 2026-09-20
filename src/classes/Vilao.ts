import { Utilidade } from "./Utilidade.ts";

export class Vilao {
    constructor(
        private _nome: string,
        private _vida: number,
        private _ataque: number,
        private _defesa: number,
    ) { };
    public atacar(): number {
        return Utilidade.randomizar(this._ataque);
    };
    public sofrerAtaque(danoRecebido: number): void {
        if (danoRecebido > this._defesa) {
            this._vida -= danoRecebido - this._defesa;
        };
    };
    public estaMorto(): boolean {
        if (this._vida <= 0) {
            return true;
        } else {
            return false;
        };
    };
};