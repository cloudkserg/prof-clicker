export default function deleteNeededWorkers(workers) {
    return workers.filter(man => man.index !== 0);
}
