import checkTryVerb from "../utils/checkTryVerb";
import {Randomizer} from "../utils/Randomizer/Randomizer";

export class ManModel {

    constructor({id, index}) {
        this.isProf = false;
        this._countTries = 0;
        this.id = id;
        this.index = index;
        this._manRandomizer = new Randomizer();
    }

    runTryVerb() {
        if (this.isProf) {
            return true;
        }

        if (checkTryVerb(this._manRandomizer, this._countTries)) {
            this.isProf = true;
        }
        this._countTries++;
    }
}
