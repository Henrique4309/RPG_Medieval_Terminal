export abstract class Personagem {
    protected _vidaAtual: number = 0;
    protected _pontosAcao: number = 9;
    protected _inflexivel: boolean = false;

    protected _forca: number = 10;
    protected _resistencia: number = 10;
    protected _agilidade: number = 10;
    protected _inteligencia: number = 10;
    protected _eloquencia: number = 10;
    protected _fe: number = 10;

    constructor(
        protected _nome: string,
        protected _raca: string,
        protected _classe: string,
        protected _vidaMaxima: number
    ) {
        this._vidaAtual = this._vidaMaxima;
    };

    public abstract atacar(oponente: Personagem): void;
    public abstract contraAtacar(oponente: Personagem): void;
    public abstract sofrerAtaque(valor: number, danoMagico: boolean): void;

    public roubarPontosAcao(oponente: Personagem): void { };

    public recuperarAcao(): void {
        this._pontosAcao = 9;
    };

    public perderAcao(valor: number): void {
        this._pontosAcao -= valor;
    };

    public estaVivo(): boolean {
        if (this._vidaAtual >= 1) {
            return true;
        } else {
            return false;
        };
    };

    public get agilidade(): number {
        return this._agilidade;
    };

    public get pontosAcao(): number {
        return this._pontosAcao;
    };
};