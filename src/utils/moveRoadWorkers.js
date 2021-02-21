import workerParams from "../config/workerParams";

export default function moveRoadWorkers (workers) {
    return workers.forEach(worker => {
        let newWorkerIndex = worker.index + 1;
        if (worker.isDirToPlant) {
            newWorkerIndex = worker.index - 1;
        }
        if (newWorkerIndex < 0 ) {
            worker.setInPlant();
            return worker;
        }
        if (newWorkerIndex > workerParams.houseOnRoadIndex ) {
            worker.setInHouse();
            return worker;
        }
        worker.index = newWorkerIndex;
        return worker;
    });
};
