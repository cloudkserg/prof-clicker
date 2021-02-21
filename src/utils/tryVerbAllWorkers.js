export default function tryVerbAllWorkers (workers) {
    const oldWorkers = workers.map(worker => Object.assign(Object.create(Object.getPrototypeOf(worker)), worker));
    workers.forEach(worker => worker.runTryVerb());
    return oldWorkers.filter(oldWorker => workers.some(worker => worker.id === oldWorker.id && worker.isProf !== oldWorker.isProf));
}
