import {ManModel} from "../models/ManModel";
import config from "../config/config";
import {Randomizer} from "./Randomizer/Randomizer";

const generateId = (workers) => {
    const randomId = Math.floor(Math.random() * (1000 - 1) + 1);
    const isExistsMan = workers.filter(man => man.id === randomId).length > 0;
    if (isExistsMan) return generateId(workers)
    return randomId;
};

const randomizer = new Randomizer();
export default function createNewMan (workers) {
    if (randomizer.randomChance(config.generateNewWorkerChance)) {
        const randomId = generateId(workers);
        const man = new ManModel({id: randomId, index: config.maxWorkers - 1});
        workers.push(man);
    }
    return workers;
};
