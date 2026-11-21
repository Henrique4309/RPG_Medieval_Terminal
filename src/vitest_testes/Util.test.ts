import { describe, it, expect, afterEach, vi } from 'vitest';
import { Util } from '../classes/Util.ts';

describe('Classe Util', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Método randomizar', () => {
        it('deve retornar um número aleatório entre o mínimo e o máximo', () => {
            for (let i = 0; i < 100; i++) {
            const minimo = 1;
            const maximo = 10;
            const resultado = Util.randomizar(minimo, maximo);
            expect(resultado).toBeGreaterThanOrEqual(minimo);
            expect(resultado).toBeLessThanOrEqual(maximo);
            };
        });

        it('Deve retornar sempre um numero inteiro', () => {
            for (let i = 0; i < 100; i++) {
                const minimo = 1;
                const maximo = 10;
                const resultado = Util.randomizar(minimo, maximo);
                expect(Number.isInteger(resultado)).toBe(true);
            }
        });

        it('Deve retornar o valor mínimo quando Math.random() retorna 0', () => {
            const minimo = 1;
            const maximo = 10;
            vi.spyOn(Math, 'random').mockReturnValue(0);
            const resultado = Util.randomizar(minimo, maximo);
            expect(resultado).toBe(minimo);
        });

        it('Deve retornar o valor máximo quando Math.random() retorna quase 1', () => {
            const minimo = 1;
            const maximo = 10;
            vi.spyOn(Math, 'random').mockReturnValue(0.999999);
            const resultado = Util.randomizar(minimo, maximo);
            expect(resultado).toBe(maximo);
        });

        it('Deve arredondar para o número inteiro mais próximo', () => {
            const minimo = 1;
            const maximo = 10;
            vi.spyOn(Math, 'random').mockReturnValue(0.5);
            const resultado = Util.randomizar(minimo, maximo);
            expect(resultado).toBe(6);
        });

        it('Deve retornar o próprio valor quando o mínimo e o máximo são iguais', () => {
            const minimo = 5;
            const maximo = 5;
            const resultado = Util.randomizar(minimo, maximo);
            expect(resultado).toBe(5);
        });
    });

});