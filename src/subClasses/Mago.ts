import { Feitico } from "../classes/Feitico.ts";
import { Heroi } from "../classes/Heroi.ts";
import { Utilidade } from "../classes/Utilidade.ts";


export class Mago extends Heroi {
    constructor(
        nome: string,
        experiencia: number,
        vida: number,
        energia: number,
        resistencia: number,
        private _inteligencia: number,
        private _feiticoAtaque: Feitico,
        private _feiticoDefesa: Feitico,
    ) {
        super(nome, experiencia, vida, energia, resistencia);
    };


    public atacar(): number {
        this._energia -= 3;
        return Utilidade.randomizar(this._feiticoAtaque.efeito) * (this._inteligencia / 10);
    };
    public sofrerAtaque(danoRecebido: number): void {
        if (danoRecebido > this._feiticoDefesa.efeito) {
            this._vida -= danoRecebido - this._feiticoDefesa.efeito;
        };
    };
    public aprimorarAtributos(requisicao: string): void {
        if (this._experiencia > 0) {
            switch (requisicao) {
                case "inteligencia":
                    this._inteligencia += 1;
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