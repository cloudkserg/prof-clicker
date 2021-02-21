export default function changeWorkers (workers) {
    return workers.map(man => {
        man.index--;
        return man;
    });
};
