import config from "../config/config";
import deleteNeededWorkers from "../utils/deleteNeededWorkers";
import changeWorkers from "../utils/changeWorkers";
import createNewWorkers from "../utils/createNewWorkers";

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

const updateWorkers = () => {
    console.log('UP');
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


export default class WorkerStorage {
    constructor(onChangeFunction) {
        onChangeWorkerCallback = onChangeFunction;
    }

    init() {
        state.workerInterval = setInterval(() => updateWorkers(), config.workerAnimateTimeout);
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

    updateWorkers(workers) {
        workers.each(worker => {
           const findedWorker = workers.find(oldWorker => oldWorker.id === worker.id);
           findedWorker.update(worker);
        });
        afterChangeWorkers();
    }


}
