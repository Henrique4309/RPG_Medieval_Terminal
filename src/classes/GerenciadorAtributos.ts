import { NomeAtributo, Atributos } from "../tipos/Atributos.ts";
import { Bonus } from "../tipos/Bonus.ts";

export class GerenciadorAtributos {

    private base: Atributos;
    private bonus: Bonus[] = [];

    constructor(
        atributosIniciais: Atributos,
        private maximo = 60,
        private minimo = 0
    ) {
        this.base = { ...atributosIniciais };
    };

    public valorBase(nome: NomeAtributo): number {
        return this.base[nome];
    };

    public valorReal(nome: NomeAtributo): number {
        const totalBonus = this.bonus
            .filter(bonus => bonus.atributo === nome)
            .reduce((soma, bonus) => soma + bonus.valor, 0);

        return Math.min(
            Math.max(
                this.base[nome] + totalBonus, this.minimo
            ), this.maximo
        );
    };

    public aprimorarBase(nome: NomeAtributo, qtd: number): void {
        this.base[nome] = Math.min(
            Math.max(
                this.base[nome] + qtd, this.minimo
            ), this.maximo
        );
    };

    public adicionarBonus(bonus: Bonus): void {
        this.bonus.push({ ...bonus });
    };

    public removerBonus(fonte: string): void {
        this.bonus = this.bonus.filter(bonus => bonus.fonte !== fonte);
    };

    public passarTurno(): void {
        this.bonus = this.bonus
            .map(bonus => (bonus.turnos !== undefined 
                ? { ...bonus, turnos: bonus.turnos - 1 } 
                : bonus
            ))
            .filter(bonus => bonus.turnos === undefined || bonus.turnos > 0);
    };

    public recursoVitalMaximo(): number {
        return this.valorReal("Resistencia") * 3;
    };

};