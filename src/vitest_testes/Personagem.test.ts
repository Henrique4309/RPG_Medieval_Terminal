import { describe, it, expect, beforeEach } from 'vitest';
import { Personagem } from '../classes/personagens/Personagem.ts';
import { Atributos } from '../tipos/Atributos.ts';

class PersonagemTeste extends Personagem {
    public atacar(oponente: Personagem): void {
        oponente.sofrerAtaque(5);
    };

    public contraAtacar(oponente: Personagem): void {
        oponente.sofrerAtaque(2);
    };

    public sofrerAtaque(dano: number): void {
        this._vida.diminuir(dano);
    };

    get vida() { return this._vida; }
    get atributos() { return this._atributos; }
    get pontosAcao() { return this._pontosAcao; }
    get mortoVivo() { return this._mortoVivo; }
};

const atributosPadrao = (): Atributos => ({
    Forca: 10,
    Resistencia: 10,
    Agilidade: 10,
    Inteligencia: 10,
    Oratoria: 10,
    Fe: 10
});

describe('Classe Personagem', () => {

    let personagem: PersonagemTeste;

    beforeEach(() => {
        personagem = new PersonagemTeste('Heroi', 'Humano', atributosPadrao());
    });

    describe('Construtor', () => {
        it('Deve guardar nome e tipo', () => {
            expect(personagem._nome).toBe('Heroi');
            expect(personagem._tipo).toBe('Humano');
        });

        it('Não deve ser morto-vivo por padrão', () => {
            expect(personagem.mortoVivo).toBe(false);
        });

        it('Deve aceitar ser morto-vivo', () => {
            const zumbi = new PersonagemTeste('Zumbi', 'Humanoide', atributosPadrao(), true);
            expect(zumbi.mortoVivo).toBe(true);
        });

        it('Deve iniciar com 10 pontos de ação', () => {
            expect(personagem.pontosAcao).toBe(10);
        });

        it('Deve criar o gerenciador com os atributos informados', () => {
            expect(personagem.atributos.valorBase('Forca')).toBe(10);
            expect(personagem.atributos.valorBase('Resistencia')).toBe(10);
        });

        it('Deve iniciar a vida cheia em 3x a Resistência', () => {
            expect(personagem.vida.valorAtual).toBe(30);
            expect(personagem.vida.nome).toBe('Vida');
        });

        it('Deve calcular a vida de acordo com a Resistência de cada personagem', () => {
            const tanque = new PersonagemTeste('Tanque', 'Constructo', { ...atributosPadrao(), Resistencia: 20 });
            expect(tanque.vida.valorAtual).toBe(60);
        });

        it('Não deve ser afetado por mudanças no objeto de atributos após a criação', () => {
            const attrs = atributosPadrao();
            const p = new PersonagemTeste('P', 'Humano', attrs);
            attrs.Resistencia = 50;
            expect(p.atributos.valorBase('Resistencia')).toBe(10);
        });
    });

    describe('Métodos de combate (via subclasse)', () => {
        it('atacar deve causar dano no oponente', () => {
            const oponente = new PersonagemTeste('Vilao', 'Fera', atributosPadrao());
            personagem.atacar(oponente);
            expect(oponente.vida.valorAtual).toBe(25);
            expect(personagem.vida.valorAtual).toBe(30);
        });

        it('contraAtacar deve causar dano no oponente', () => {
            const oponente = new PersonagemTeste('Vilao', 'Fera', atributosPadrao());
            oponente.contraAtacar(personagem);
            expect(personagem.vida.valorAtual).toBe(28);
        });
    });

    describe('Método passarTurno', () => {
        it('Deve somar 10 pontos de ação, até o limite de 15', () => {
            personagem.passarTurno();
            expect(personagem.pontosAcao).toBe(15);
        });

        it('Não deve passar de 15 pontos de ação', () => {
            personagem.passarTurno();
            personagem.passarTurno();
            personagem.passarTurno();
            expect(personagem.pontosAcao).toBe(15);
        });

        it('Deve passar o turno dos atributos (bônus temporários expiram)', () => {
            personagem.atributos.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Grito', turnos: 1 });
            expect(personagem.atributos.valorReal('Forca')).toBe(15);
            personagem.passarTurno();
            expect(personagem.atributos.valorReal('Forca')).toBe(10);
        });

        it('Não deve alterar a vida atual', () => {
            personagem.sofrerAtaque(12);
            personagem.passarTurno();
            expect(personagem.vida.valorAtual).toBe(18);
        });

        it('Deve limitar a cura ao novo máximo quando a Resistência cai', () => {
            personagem.atributos.adicionarBonus({ atributo: 'Resistencia', valor: -5, fonte: 'Veneno' });
            personagem.passarTurno();
            personagem.vida.aumentar(100);
            expect(personagem.vida.valorAtual).toBeLessThanOrEqual(15);
        });

        it('Deve reduzir a vida atual quando o novo máximo fica abaixo dela', () => {
            personagem.atributos.adicionarBonus({ atributo: 'Resistencia', valor: -5, fonte: 'Veneno' });
            personagem.passarTurno();
            expect(personagem.vida.valorAtual).toBe(15);
        });

        it('Deve aumentar o máximo da vida quando a Resistência sobe', () => {
            personagem.atributos.adicionarBonus({ atributo: 'Resistencia', valor: 5, fonte: 'Escudo' });
            personagem.passarTurno();
            personagem.vida.aumentar(100);
            expect(personagem.vida.valorAtual).toBe(45);
        });

        it('Deve permitir curar até o máximo depois de sofrer dano e passar o turno', () => {
            personagem.sofrerAtaque(10);
            personagem.passarTurno();
            personagem.vida.aumentar(100);
            expect(personagem.vida.valorAtual).toBe(30);
        });
    });

});
