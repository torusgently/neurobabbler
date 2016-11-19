export class Layer {
    W: number[];
    bias: number[];

    constructor(theW: number[], theBias: number[]) {
        this.W = theW;
        this.bias = theBias;
    }
}
