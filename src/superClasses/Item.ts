export abstract class Item {

    constructor(
        protected _nome: string,
        protected _tipo: string
    ) { };

    public danoReal(habilidade: number): number { return 0 };
    public protecaoReal(habilidade: number): number { return 0 };
    public aprimorar(fator: number): void { };

    public danificar(valor: number): void { };

    public reparar(fator: number): void { };

    public get tipo(): string {
        return this._tipo;
    };

    public get magica(): boolean { return false };
};