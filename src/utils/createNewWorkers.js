import {WorkerModel} from "../Worker/WorkerModel";
import config from "../config/config";
import {Randomizer} from "./Randomizer/Randomizer";

const generateId = (workers) => {
    const randomId = Math.floor(Math.random() * (1000 - 1) + 1);
    const isExistsWorker = workers.filter(worker => worker.id === randomId).length > 0;
    if (isExistsWorker) return generateId(workers)
    return randomId;
};

const randomizer = new Randomizer();
export default function createNewWorker (workers) {
    if (randomizer.randomChance(config.generateNewWorkerChance)) {
        const randomId = generateId(workers);
        const worker = new WorkerModel({id: randomId, index: config.maxWorkers - 1});
        workers.push(worker);
    }
    return workers;
};
