export class Magia {
    constructor(
        private _nome: string,
        private _tipo: string,
        private _eficiencia: number
    ) { };
    
    public eficienciaReal(habilidade: number): number {
        return (habilidade / 10) * this._eficiencia;
    };

    public get statusMagia(): string {
        return `${this._nome} >> Magia de ${this._tipo} => Eficiência maxima: ${this._eficiencia}.`;
    };

    public get tipo(): string {
        return this._tipo;
    };

    public get magica(): boolean { return true };
};