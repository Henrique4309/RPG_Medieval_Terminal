import { Item } from "../superClasses/Item.ts";

export class Arma extends Item {
    private _condicao: number = 100;
    private _danoMagico: boolean = false;

    constructor(
        nome: string,
        tipo: string,
        private _danoMaximo: number
    ) {
        super(nome, tipo);
    };

    public danoReal(habilidade: number): number {
        return ((habilidade / 10) * this._danoMaximo * (this._condicao / 100));
    };
    
    public aprimorar(fator: number): void {
        if (fator > 0) {
            this._danoMaximo += Math.round(this._danoMaximo * (fator / 100));
        };
    };

    public danificar(valor: number): void {
        this._condicao -= valor;
        if (this._condicao < 0) {
            this._condicao = 0;
        };
    };

    public reparar(fator: number): void {
        if (fator > 0) {
            this._condicao += Math.round(this._condicao * (fator / 100));
            if (this._condicao > 100) {
                this._condicao = 100;
            };
        };
    };

    public get magica(): boolean {
        return this._danoMagico;
    };
};