export class Util {
    public static randomico(minimo: number, maximo: number): number {
        return minimo + Math.round(Math.random() * (maximo - minimo));
    };
};