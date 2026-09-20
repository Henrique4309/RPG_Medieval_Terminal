export class Feitico {
    constructor(
        private _nome: string,
        private _tipo: string,
        private _efeito: number
    ){};
    public get nome(): string {
        return this._nome;
    };
    public get tipo(): string {
        return this._tipo;
    };
    public get efeito(): number {
        return this._efeito;
    };
    private set efeito (novoEfeito: number) {
        this._efeito = novoEfeito;
    };
    public aprimorarFeitico (novoEfeito: number): void {
        this.efeito = novoEfeito;
    };
};