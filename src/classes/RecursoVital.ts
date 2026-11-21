export class RecursoVital {
    
    private _valorAtual: number;

    constructor(
        private _maximo: number,
        readonly nome: string = "Vida"
    ){
        this._valorAtual = this._maximo;
    };

    public aumentar(qtd: number) {
        this._valorAtual = Math.min(this._valorAtual + qtd, this._maximo);
    };

    public diminuir(qtd: number) {
        this._valorAtual = Math.max(this._valorAtual - qtd, 0);
    };

    public get valorAtual(): number {
        return this._valorAtual
    };

    public set setMaximo(qtd: number) {
        this._maximo = qtd;
        this._valorAtual = Math.min(this._valorAtual, this._maximo);
    };

};