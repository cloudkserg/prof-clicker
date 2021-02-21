import * as d3 from "d3-random";

export class Randomizer {
    constructor() {
        this._core = d3.randomUniform(0, 100000);
    }

    randomChance(chance) {
        const randomChance =  this._core();
        return (randomChance < (chance*100000));
    }
}
