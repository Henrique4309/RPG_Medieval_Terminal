import { Arma } from "../classes/Arma.ts";
import { Armadura } from "../classes/Armadura.ts";
import { Heroi } from "../classes/Heroi.ts";
import { Utilidade } from "../classes/Utilidade.ts";


export class Ladino extends Heroi {
    constructor(
        nome: string,
        experiencia: number,
        vida: number,
        energia: number,
        resistencia: number,
        private _agilidade: number,
        private _arma: Arma,
        private _armadura: Armadura,
    ) {
        super(nome, experiencia, vida, energia, resistencia);
    };


    public atacar(): number {
        this._energia -= 3;
        return Utilidade.randomizar(this._arma.dano) * (this._agilidade / 10) + Utilidade.randomizar(this._arma.dano) * (this._agilidade / 10) + Utilidade.randomizar(this._arma.dano) * (this._agilidade / 10);
    };
    public sofrerAtaque(danoRecebido: number): void {
        const foiEfetivo = Utilidade.randomizar(100);
        if (danoRecebido > this._armadura.protecao && foiEfetivo > this._agilidade) {
            this._vida -= danoRecebido - this._armadura.protecao;
        };
    };
    public aprimorarAtributos(requisicao: string): void {
        if (this._experiencia > 0) {
            switch (requisicao) {
                case "agilidade":
                    this._agilidade += 1;
                    this._experiencia -= 10;
                    break;
                case "resistencia":
                    this._resistencia += 1;
                    this._experiencia -= 10;
                    break;
            };
        };
    };
    public estaMorto(): boolean {
        if (this._vida <= 0) {
            return true;
        } else {
            return false;
        };
    };
};