import { Item } from "../superClasses/Item.ts";

export class Armadura extends Item {
    private _protecaoAtual: number = 0;
    private _protecaoMagica: boolean = false;

    constructor(
        nome: string,
        tipo: string,
        private _protecaoMaxima: number
    ) {
        super(nome, tipo);
        this._protecaoAtual = this._protecaoMaxima;
    };

    public protecaoReal(habilidade: number): number {
        return Number(((habilidade / 10) * this._protecaoMaxima * (this._protecaoAtual / 100)).toFixed(2));
    };
    public aprimorar(fator: number): void {
        if (fator > 0) {
            this._protecaoMaxima += Math.round(this._protecaoMaxima * (fator / 100));
        };
    };
    
    public danificar(valor: number): void {
        this._protecaoAtual -= valor;
        if (this._protecaoAtual < 0) {
            this._protecaoAtual = 0;
        };
    };

    public reparar(fator: number): void {
        if (fator > 0) {
            this._protecaoAtual += Math.round(this._protecaoAtual * (fator / 100));
            if (this._protecaoAtual > this._protecaoMaxima) {
                this._protecaoAtual = this._protecaoMaxima;
            };
        };
    };

    public get magica(): boolean {
        return this._protecaoMagica;
    };
};