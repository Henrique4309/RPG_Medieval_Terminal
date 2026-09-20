export class Arma {
    constructor(
        private _nome: string,
        private _tipo: string,
        private _dano: number
    ){};
    public get nome(): string {
        return this._nome;
    };
    public get tipo(): string {
        return this._tipo;
    };
    public get dano(): number {
        return this._dano;
    };
    private set dano (novoDano: number) {
        this._dano = novoDano;
    };
    public aprimorarArma(novoDano: number): void {
        this.dano = novoDano;
    };
};