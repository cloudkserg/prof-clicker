import checkTryVerb from "../utils/checkTryVerb";
import {Randomizer} from "../utils/Randomizer/Randomizer";

export class WorkerModel {

    constructor({id, index, sex, age, fio, profession, agitProbability, denyThreshold}) {
        this.isProf = false;
        this.inProcessAgitate = false;

        this.inHouse = true;
        this.inPlant = false;
        this.isDirToPlant = true;

        this.sex = sex;
        this.age = age;
        this.fio = fio;
        this.profession = profession;
        this.agitProbability = agitProbability;
        this.denyThreshold = denyThreshold;

        this._countTries = 0;
        this.id = id;
        this.index = index;
        this._agitateRandomizer = new Randomizer();
        this._roadRandomizer = new Randomizer();

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

    setInRoad(fromHouse = true)
    {
        this.inHouse = false;
        this.inPlant = false;
        this._roadRandomizer = new Randomizer();
    }

    roadChance(chance)
    {
        return this._roadRandomizer.randomChance(chance);
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

        if (this._countTries > this.denyThreshold) {
            return false;
        }

        if (checkTryVerb(this._agitateRandomizer, this.agitProbability, this._countTries)) {
            this.isProf = true;
        }
        this._countTries++;
    }
}
