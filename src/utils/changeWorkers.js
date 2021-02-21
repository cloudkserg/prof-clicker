export default function changeWorkers (workers) {
    return workers.map(worker => {
        worker.index--;
        return worker;
    });
};
