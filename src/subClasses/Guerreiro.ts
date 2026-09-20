import { Arma } from "../classes/Arma.ts";
import { Armadura } from "../classes/Armadura.ts";
import { Heroi } from "../classes/Heroi.ts";
import { Utilidade } from "../classes/Utilidade.ts";


export class Guerreiro extends Heroi {
    constructor(
        nome: string,
        experiencia: number,
        vida: number,
        energia: number,
        resistencia: number,
        private _forca: number,
        private _arma: Arma,
        private _armadura: Armadura,
    ) {
        super(nome, experiencia, vida, energia, resistencia);
    };


    public atacar(): number {
        this._energia -= 3;
        return Utilidade.randomizar(this._arma.dano) * (this._forca / 10);
    };
    public sofrerAtaque(danoRecebido: number): void {
        if (danoRecebido > this._armadura.protecao) {
            this._vida -= danoRecebido - this._armadura.protecao;
        };
    };
    public aprimorarAtributos(requisicao: string): void {
        if (this._experiencia > 0) {
            switch (requisicao) {
                case "forca":
                    this._forca += 1;
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
    public get energia(): number {
        return this._energia
    };
    public set setEnergia(valor: number) {
        this._energia += valor;
    };
};