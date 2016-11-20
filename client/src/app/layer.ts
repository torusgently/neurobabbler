export class Layer {
    public W: number[];
    public bias: number[];
    public id: string;
    constructor(theW: number[], theBias: number[], id: string) {
        this.W = theW;
        this.bias = theBias;
        this.id = id;
    }
}
