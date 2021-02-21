import checkTryVerb from "../utils/checkTryVerb";
import {Randomizer} from "../utils/Randomizer/Randomizer";

export class WorkerModel {

    constructor({id, index}) {
        this.isProf = false;
        this.inProcessAgitate = false;

        this.inHouse = true;
        this.inPlant = false;

        this._countTries = 0;
        this.id = id;
        this.index = index;
        this._workerRandomizer = new Randomizer();
    }

    update(data) {
        this.isProf = data.isProf;
        this.inHouse = data.inHouse;
        this.inPlant = data.inPlant;
        this.index = data.index;
    }

    setInHouse()
    {
        this.inHouse = true;
        this.inPlant = false;
    }

    setInRoad()
    {
        this.inHouse = false;
        this.inPlant = false;
    }

    setInProcessAgitate(status)
    {
        this.inProcessAgitate = status;
    }

    setInPlant()
    {
        this.inHouse = false;
        this.inPlant = true;
    }

    runTryVerb() {
        if (this.isProf) {
            return true;
        }

        if (checkTryVerb(this._workerRandomizer, this._countTries)) {
            this.isProf = true;
        }
        this._countTries++;
    }
}
