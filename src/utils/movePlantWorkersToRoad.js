import config from "../config/config";

export default function movePlantWorkersToRoad(workers) {
    workers.forEach(worker => {
       if (worker.roadChance(config.toRoadWorkerChance)) {
           worker.index = 0;
           worker.isDirToPlant = false;
           worker.setInRoad(true);
       }
    })
}
