export default function deleteNeededWorkers(workers) {
    return workers.filter(worker => worker.index !== 0);
}
