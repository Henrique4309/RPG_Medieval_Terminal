export class Armadura {
    constructor(
        private _nome: string,
        private _tipo: string,
        private _protecao: number
    ){};
    public get nome(): string {
        return this._nome;
    };
    public get tipo(): string {
        return this._tipo;
    };
    public get protecao(): number {
        return this._protecao;
    };
    private set protecao (novaProtecao: number) {
        this._protecao = novaProtecao;
    };
    public aprimorarArmadura(novaProtecao: number): void {
        this.protecao = novaProtecao;
    };
};