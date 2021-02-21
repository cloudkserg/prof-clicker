import config from "../config/config";
import deleteNeededWorkers from "../utils/deleteNeededWorkers";
import changeWorkers from "../utils/changeWorkers";
import createNewWorkers from "../utils/createNewWorkers";

const state = {
    workers: [],
    onPause: false,
    workerInterval: null,
}



const updateRoadWorkers = () => {
    if (state.onPause) {
        return;
    }

    const roadWorkers = state.workers;

    let newRoadWorkers = deleteNeededWorkers(roadWorkers);
    newRoadWorkers = changeWorkers(newRoadWorkers);
    newRoadWorkers = createNewWorkers(newRoadWorkers);
    newRoadWorkers.map(worker => worker.setInRoad());

    state.workers = newRoadWorkers;
};

export default class WorkerStorage {
    constructor() {
        state.workerInterval = setInterval(() => updateRoadWorkers(), config.workerAnimateTimeout);
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
           const findedWorker = state.workers.find(oldWorker => oldWorker.id === worker.id);
           findedWorker.update(worker);
        });
    }


}
