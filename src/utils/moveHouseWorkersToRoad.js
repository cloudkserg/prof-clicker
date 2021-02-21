import config from "../config/config";
import workerParams from "../config/workerParams";

export default function moveHouseWorkersToRoad(workers) {
    workers.forEach(worker => {
       if (worker.roadChance(config.toRoadWorkerChance)) {
           worker.index = workerParams.houseOnRoadIndex - 1;
           worker.isDirToPlant = true;
           worker.setInRoad(true);
       }
    })
}
