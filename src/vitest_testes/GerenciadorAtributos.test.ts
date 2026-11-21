import { describe, it, expect, beforeEach } from 'vitest';
import { GerenciadorAtributos } from '../classes/GerenciadorAtributos.ts';
import { Atributos } from '../tipos/Atributos.ts';

const atributosPadrao = (): Atributos => ({
    Forca: 10,
    Resistencia: 12,
    Agilidade: 8,
    Inteligencia: 6,
    Oratoria: 4,
    Fe: 2
});

describe('Classe GerenciadorAtributos', () => {

    let gerenciador: GerenciadorAtributos;

    beforeEach(() => {
        gerenciador = new GerenciadorAtributos(atributosPadrao());
    });

    describe('Construtor', () => {
        it('Deve guardar os atributos iniciais como base', () => {
            const iniciais = atributosPadrao();
            for (const nome of Object.keys(iniciais) as (keyof Atributos)[]) {
                expect(gerenciador.valorBase(nome)).toBe(iniciais[nome]);
            }
        });

        it('Deve copiar os atributos iniciais (alterar o objeto original não afeta o gerenciador)', () => {
            const iniciais = atributosPadrao();
            const gerenciador = new GerenciadorAtributos(iniciais);
            iniciais.Forca = 99;
            expect(gerenciador.valorBase('Forca')).toBe(10);
        });

        it('Deve limitar ao máximo os atributos iniciais acima dele', () => {
            const gerenciador = new GerenciadorAtributos({ ...atributosPadrao(), Forca: 100 });
            expect(gerenciador.valorBase('Forca')).toBe(60);
        });

        it('Deve limitar ao mínimo os atributos iniciais abaixo dele', () => {
            const gerenciador = new GerenciadorAtributos({ ...atributosPadrao(), Fe: -10 });
            expect(gerenciador.valorBase('Fe')).toBe(0);
        });

        it('Deve aplicar limites personalizados aos atributos iniciais', () => {
            const gerenciador = new GerenciadorAtributos(atributosPadrao(), 9, 5);
            expect(gerenciador.valorBase('Forca')).toBe(9);
            expect(gerenciador.valorBase('Agilidade')).toBe(8);
            expect(gerenciador.valorBase('Fe')).toBe(5);
        });
    });

    describe('Método valorReal', () => {
        it('Deve ser igual ao valor base quando não há bônus', () => {
            expect(gerenciador.valorReal('Forca')).toBe(10);
        });

        it('Deve somar os bônus do atributo correspondente', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Espada' });
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 3, fonte: 'Anel' });
            expect(gerenciador.valorReal('Forca')).toBe(18);
        });

        it('Não deve somar bônus de outros atributos', () => {
            gerenciador.adicionarBonus({ atributo: 'Agilidade', valor: 5, fonte: 'Botas' });
            expect(gerenciador.valorReal('Forca')).toBe(10);
            expect(gerenciador.valorReal('Agilidade')).toBe(13);
        });

        it('Deve aceitar bônus negativos (penalidades)', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: -4, fonte: 'Veneno' });
            expect(gerenciador.valorReal('Forca')).toBe(6);
        });

        it('Não deve ficar abaixo do mínimo', () => {
            gerenciador.adicionarBonus({ atributo: 'Fe', valor: -50, fonte: 'Maldição' });
            expect(gerenciador.valorReal('Fe')).toBe(0);
        });

        it('Não deve passar do máximo', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 100, fonte: 'Poção' });
            expect(gerenciador.valorReal('Forca')).toBe(60);
        });

        it('Deve respeitar mínimo e máximo personalizados', () => {
            const gerenciador = new GerenciadorAtributos(atributosPadrao(), 20, 5);
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 50, fonte: 'Poção' });
            gerenciador.adicionarBonus({ atributo: 'Fe', valor: -50, fonte: 'Maldição' });
            expect(gerenciador.valorReal('Forca')).toBe(20);
            expect(gerenciador.valorReal('Fe')).toBe(5);
        });

        it('Não deve alterar o valor base', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Espada' });
            expect(gerenciador.valorBase('Forca')).toBe(10);
        });
    });

    describe('Método aprimorarBase', () => {
        it('Deve aumentar o valor base', () => {
            gerenciador.aprimorarBase('Forca', 3);
            expect(gerenciador.valorBase('Forca')).toBe(13);
            expect(gerenciador.valorReal('Forca')).toBe(13);
        });

        it('Deve diminuir o valor base com quantidade negativa', () => {
            gerenciador.aprimorarBase('Forca', -3);
            expect(gerenciador.valorBase('Forca')).toBe(7);
        });

        it('Não deve passar do máximo', () => {
            gerenciador.aprimorarBase('Forca', 100);
            expect(gerenciador.valorBase('Forca')).toBe(60);
        });

        it('Não deve ficar abaixo do mínimo', () => {
            gerenciador.aprimorarBase('Fe', -100);
            expect(gerenciador.valorBase('Fe')).toBe(0);
        });

        it('Deve afetar apenas o atributo informado', () => {
            gerenciador.aprimorarBase('Forca', 5);
            expect(gerenciador.valorBase('Agilidade')).toBe(8);
        });
    });

    describe('Método adicionarBonus', () => {
        it('Deve copiar o bônus (alterar o objeto original não afeta o gerenciador)', () => {
            const bonus = { atributo: 'Forca' as const, valor: 5, fonte: 'Espada' };
            gerenciador.adicionarBonus(bonus);
            bonus.valor = 50;
            expect(gerenciador.valorReal('Forca')).toBe(15);
        });
    });

    describe('Método removerBonus', () => {
        it('Deve remover o bônus da fonte informada', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Espada' });
            gerenciador.removerBonus('Espada');
            expect(gerenciador.valorReal('Forca')).toBe(10);
        });

        it('Deve remover todos os bônus da mesma fonte, em qualquer atributo', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Armadura' });
            gerenciador.adicionarBonus({ atributo: 'Resistencia', valor: 4, fonte: 'Armadura' });
            gerenciador.removerBonus('Armadura');
            expect(gerenciador.valorReal('Forca')).toBe(10);
            expect(gerenciador.valorReal('Resistencia')).toBe(12);
        });

        it('Deve manter os bônus de outras fontes', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Espada' });
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 3, fonte: 'Anel' });
            gerenciador.removerBonus('Espada');
            expect(gerenciador.valorReal('Forca')).toBe(13);
        });

        it('Não deve fazer nada quando a fonte não existe', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Espada' });
            gerenciador.removerBonus('Inexistente');
            expect(gerenciador.valorReal('Forca')).toBe(15);
        });
    });

    describe('Método passarTurno', () => {
        it('Deve manter bônus permanentes (sem turnos)', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Espada' });
            for (let i = 0; i < 10; i++) gerenciador.passarTurno();
            expect(gerenciador.valorReal('Forca')).toBe(15);
        });

        it('Deve remover um bônus de 1 turno após passar um turno', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Grito', turnos: 1 });
            gerenciador.passarTurno();
            expect(gerenciador.valorReal('Forca')).toBe(10);
        });

        it('Deve manter um bônus temporário até seus turnos acabarem', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Grito', turnos: 3 });
            gerenciador.passarTurno();
            expect(gerenciador.valorReal('Forca')).toBe(15);
            gerenciador.passarTurno();
            expect(gerenciador.valorReal('Forca')).toBe(15);
            gerenciador.passarTurno();
            expect(gerenciador.valorReal('Forca')).toBe(10);
        });

        it('Deve tratar cada bônus temporário de forma independente', () => {
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 5, fonte: 'Curto', turnos: 1 });
            gerenciador.adicionarBonus({ atributo: 'Forca', valor: 3, fonte: 'Longo', turnos: 2 });
            gerenciador.passarTurno();
            expect(gerenciador.valorReal('Forca')).toBe(13);
            gerenciador.passarTurno();
            expect(gerenciador.valorReal('Forca')).toBe(10);
        });

        it('Não deve alterar o objeto de bônus original passado', () => {
            const bonus = { atributo: 'Forca' as const, valor: 5, fonte: 'Grito', turnos: 2 };
            gerenciador.adicionarBonus(bonus);
            gerenciador.passarTurno();
            expect(bonus.turnos).toBe(2);
        });
    });

    describe('Método recursoVitalMaximo', () => {
        it('Deve ser 3 vezes a Resistência', () => {
            expect(gerenciador.recursoVitalMaximo()).toBe(36);
        });

        it('Deve considerar os bônus de Resistência', () => {
            gerenciador.adicionarBonus({ atributo: 'Resistencia', valor: 3, fonte: 'Escudo' });
            expect(gerenciador.recursoVitalMaximo()).toBe(45);
        });

        it('Deve respeitar o limite máximo do atributo', () => {
            gerenciador.adicionarBonus({ atributo: 'Resistencia', valor: 100, fonte: 'Poção' });
            expect(gerenciador.recursoVitalMaximo()).toBe(180);
        });
    });

});
