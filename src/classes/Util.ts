export class Util {

    public static randomizar(minimo: number, maximo: number): number {
        return minimo + Math.round(Math.random() * (maximo - minimo));
    };
    
};