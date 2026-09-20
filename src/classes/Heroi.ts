export abstract class Heroi {
    constructor(
        protected _nome: string,
        protected _experiencia: number,
        protected _vida: number,
        protected _energia: number,
        protected _resistencia: number,
    ) { };


    public abstract atacar(): number;
    public abstract sofrerAtaque(danoRecebido: number): void;
    public abstract aprimorarAtributos(requisicao: string): void;
    public abstract estaMorto(): boolean;

    public get energia(): number {
        return this._energia
    };
    public set setEnergia(valor: number) {
        this._energia += valor;
    };
};