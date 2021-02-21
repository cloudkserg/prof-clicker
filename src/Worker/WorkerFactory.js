import workerParams from "../config/workerParams";
import {WorkerModel} from "./WorkerModel";
import * as _ from "lodash";
import * as faker from "faker";


faker.locale = 'ru';


const getNewWorker = (workers) => {

    return new WorkerModel({
        id: workers.length,
        index: 0,
        fio: faker.name.findName(),
        sex: _.sample(workerParams.sex),
        age: _.sample(_.range(...workerParams.age)),
        profession: _.sample(workerParams.professions),
        agitProbability: Math.random(),
        denyThreshold: Math.floor(Math.random() * (workerParams.maxDenyThreshold - workerParams.minDenyThreshold) + 1)
    });
}

export class WorkerFactory {
    static createAllWorkers() {
        const workers = [];
        for (let i=0; i< workerParams.workersCount; i++) {
            workers.push(WorkerFactory.createWorker(workers));
        }
        return _.shuffle(workers);
    }

    static createWorker(workers) {
        return getNewWorker(workers);
    }
}
