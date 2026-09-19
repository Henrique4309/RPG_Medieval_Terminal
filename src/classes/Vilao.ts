export class Vilao {
    constructor(
        public nome: string,
        public vida: number,
        public ataque: number,
        public defesa: number,
    ) { };
     atacar(): number {
        const danoInfligido: number = Math.floor(Math.random() * this.ataque);
        return danoInfligido;
    };
    sofrerAtaque(danoRecebido: number): void {
        if (danoRecebido > this.defesa) {
            this.vida -= danoRecebido - this.defesa;
        };
    };
    estaMorto(): boolean {
        if (this.vida <= 0) {
            return true;
        } else {
            return false;
        };
    };
};