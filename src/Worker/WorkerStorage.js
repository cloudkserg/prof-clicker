import config from "../config/config";
import * as _ from "lodash";
import tryVerbAllWorkers from "../utils/tryVerbAllWorkers";
import moveHouseWorkersToRoad from "../utils/moveHouseWorkersToRoad";
import movePlantWorkersToRoad from "../utils/movePlantWorkersToRoad";
import moveRoadWorkers from "../utils/moveRoadWorkers";
import {WorkerFactory} from "./WorkerFactory";


let onUpdateWorkers = null;

const state = {
    workers: [],
    onPause: false,
    workerInterval: null,
}

const afterChangeWorkers = () => {
    if (onUpdateWorkers) {
        const newWorkers = state.workers.map(worker => Object.assign(Object.create(Object.getPrototypeOf(worker)), worker));
        onUpdateWorkers(newWorkers);
    }
}

const updateWorkers = (workers) => {
    workers.forEach(worker => {
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


export default class WorkerStorage  {
    constructor() {
        state.workers = WorkerFactory.createAllWorkers();
    }

    init() {
        state.workerInterval = setInterval(() => this._workerStep(), config.workerAnimateTimeout);
    }

    onUpdateWorkers(func) {
        onUpdateWorkers = func;
    }


    stop() {
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

    _workerStep = () => {
        if (state.onPause) {
            return;
        }

        //change to road
        const houseWorkers = this.getHouseWorkers();
        moveHouseWorkersToRoad(houseWorkers);

        const plantWorkers = this.getPlantWorkers();
        movePlantWorkersToRoad(plantWorkers);

        moveRoadWorkers(this.getRoadWorkers());
        afterChangeWorkers();
    };

     getRoadWorkers() {
         return state.workers.filter(worker => !worker.inHouse && !worker.inPlant);
     }

     getPlantWorkers() {
         return state.workers.filter(worker => worker.inPlant);
     }

     getHouseWorkers() {
        return state.workers.filter(worker => worker.inHouse);
     }

    getRandomNonMember() {
        return _.sample(state.workers.filter(worker => !worker.inProf));
    }

    changeWorkerToNonMember(worker) {
        worker.isProf = false;
        afterChangeWorkers();
    }

    agitateRoadWorkers() {
        const roadWorkers = this.getRoadWorkers();
        startAgitateWorkers(roadWorkers);

        const successAgitateWorkers = tryVerbAllWorkers(roadWorkers);
        updateWorkers(successAgitateWorkers);

        stopAgitateWorkers(roadWorkers);

        return successAgitateWorkers;
    }

}
