import config from "../config/config";
import deleteNeededWorkers from "../utils/deleteNeededWorkers";
import changeWorkers from "../utils/changeWorkers";
import createNewWorkers from "../utils/createNewWorkers";
import * as _ from "lodash";

const state = {
    workers: [],
    onPause: false,
    workerInterval: null,
}
let onChangeWorkerCallback = null;

const afterChangeWorkers = () => {
    if (onChangeWorkerCallback) {
        onChangeWorkerCallback(state.workers);
    }
}

const generateWorkers = () => {
    if (state.onPause) {
        return;
    }

    const roadWorkers = state.workers;

    let newWorkers = deleteNeededWorkers(roadWorkers);
    newWorkers = changeWorkers(newWorkers);
    newWorkers = createNewWorkers(newWorkers);
    newWorkers.map(worker => worker.setInRoad());

    state.workers = newWorkers;
    afterChangeWorkers();
};

const updateWorkers = (workers) => {
    workers.map(worker => {
        const findedWorker = workers.find(oldWorker => oldWorker.id === worker.id);
        findedWorker.update(worker);
    });
    afterChangeWorkers();
}

const startAgitateWorkers = (workers) => {
    workers.map(worker => worker.setInProcessAgitate(true));
    afterChangeWorkers();
}

const stopAgitateWorkers = (workers) => {
    workers.map(worker => worker.setInProcessAgitate(false));
    afterChangeWorkers();
}


export default class WorkerStorage {
    constructor(onChangeFunction) {
        onChangeWorkerCallback = onChangeFunction;
    }

    init() {
        state.workerInterval = setInterval(() => generateWorkers(), config.workerAnimateTimeout);
    }

    stopStorage() {
        clearInterval(state.workerInterval);
    }

    onRun() {
        state.onPause = false;
    }

    onPause() {
        state.onPause = true;
    }

    getState() {
        return state;
    }

    getWorkers()
    {
        return state.workers;
    }

     getRoadWorkers() {
         return state.workers.filter(worker => !worker.inHouse && !worker.inPlant);
     }

     getPlantWorkers() {
         return state.workers.filter(worker => worker.inPlant);
     }

     getHouseWorkers() {
        return state.workers.filter(worker => worker.inHouse);
     }


    agitateRoadWorkers(tryAgitateRoadWorkers) {
        const roadWorkers = this.getRoadWorkers();
        startAgitateWorkers(roadWorkers);

        const agitateWorkers = tryAgitateRoadWorkers(roadWorkers);
        updateWorkers(agitateWorkers);

        stopAgitateWorkers(roadWorkers);
    }

    pushWorker(worker) {
        state.workers.push(worker);
    }

    popRandomWorker() {
        return _.shuffle(state.workers).pop();
    }


}
