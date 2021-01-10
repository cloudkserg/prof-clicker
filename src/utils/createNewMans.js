import {ManModel} from "../models/ManModel";
import config from "../config/config";
import {Randomizer} from "./Randomizer/Randomizer";

const generateId = (mans) => {
    const randomId = Math.floor(Math.random() * (1000 - 1) + 1);
    const isExistsMan = mans.filter(man => man.id === randomId).length > 0;
    if (isExistsMan) return generateId(mans)
    return randomId;
};

const randomizer = new Randomizer();
export default function createNewMan (mans) {
    if (randomizer.randomChance(config.generateNewWorkerChance)) {
        const randomId = generateId(mans);
        const man = new ManModel({id: randomId, index: config.maxWorkers - 1});
        mans.push(man);
    }
    return mans;
};
