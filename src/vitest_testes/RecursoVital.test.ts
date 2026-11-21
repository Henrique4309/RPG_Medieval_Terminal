import { describe, it, expect, beforeEach } from 'vitest';
import { RecursoVital } from '../classes/RecursoVital.ts';

describe('Classe RecursoVital', () => {

    let recurso: RecursoVital;

    beforeEach(() => {
        recurso = new RecursoVital(100);
    });

    describe('Construtor', () => {
        it('Deve iniciar com o valor atual igual ao máximo', () => {
            expect(recurso.valorAtual).toBe(100);
        });

        it('Deve usar "Vida" como nome padrão', () => {
            expect(recurso.nome).toBe('Vida');
        });

        it('Deve aceitar um nome personalizado', () => {
            const mana = new RecursoVital(50, 'Mana');
            expect(mana.nome).toBe('Mana');
            expect(mana.valorAtual).toBe(50);
        });
    });

    describe('Método diminuir', () => {
        it('Deve diminuir o valor atual', () => {
            recurso.diminuir(30);
            expect(recurso.valorAtual).toBe(70);
        });

        it('Deve acumular várias diminuições', () => {
            recurso.diminuir(10);
            recurso.diminuir(15);
            expect(recurso.valorAtual).toBe(75);
        });

        it('Não deve deixar o valor ficar abaixo de 0', () => {
            recurso.diminuir(150);
            expect(recurso.valorAtual).toBe(0);
        });

        it('Deve chegar exatamente a 0 quando a diminuição é igual ao valor atual', () => {
            recurso.diminuir(100);
            expect(recurso.valorAtual).toBe(0);
        });

        it('Não deve alterar o valor ao diminuir 0', () => {
            recurso.diminuir(0);
            expect(recurso.valorAtual).toBe(100);
        });
    });

    describe('Método aumentar', () => {
        it('Deve aumentar o valor atual', () => {
            recurso.diminuir(50);
            recurso.aumentar(20);
            expect(recurso.valorAtual).toBe(70);
        });

        it('Não deve ultrapassar o máximo', () => {
            recurso.diminuir(10);
            recurso.aumentar(50);
            expect(recurso.valorAtual).toBe(100);
        });

        it('Não deve alterar o valor quando já está no máximo', () => {
            recurso.aumentar(10);
            expect(recurso.valorAtual).toBe(100);
        });

        it('Deve recuperar a partir de 0', () => {
            recurso.diminuir(200);
            recurso.aumentar(25);
            expect(recurso.valorAtual).toBe(25);
        });
    });

    describe('Setter setMaximo', () => {
        it('Deve permitir aumentar acima do máximo antigo após elevar o máximo', () => {
            recurso.setMaximo = 150;
            recurso.aumentar(100);
            expect(recurso.valorAtual).toBe(150);
        });

        it('Não deve alterar o valor atual ao elevar o máximo', () => {
            recurso.setMaximo = 150;
            expect(recurso.valorAtual).toBe(100);
        });

        it('Deve limitar a cura ao novo máximo quando o máximo é reduzido', () => {
            recurso.diminuir(80);
            recurso.setMaximo = 50;
            recurso.aumentar(100);
            expect(recurso.valorAtual).toBe(50);
        });

        it('Não deve alterar o valor atual quando o novo máximo ainda é maior que ele', () => {
            recurso.diminuir(70);
            recurso.setMaximo = 60;
            expect(recurso.valorAtual).toBe(30);
        });

        it('Deve reduzir o valor atual quando o novo máximo for menor que ele', () => {
            recurso.setMaximo = 60;
            expect(recurso.valorAtual).toBe(60);
        });
    });

});
