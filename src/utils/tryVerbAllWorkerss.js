import * as _ from "lodash";

export default function tryVerbAllWorkers (workers, increaseCountProfMembers) {
    const oldWorkers = workers.map(man => ({...man}));
    workers.forEach(man => man.runTryVerb());
    const onlyChangedWorkers = oldWorkers.filter(oldMan => workers.some(man => man.id == oldMan.id && man.isProf != oldMan.isProf));
    return {onlyChangedWorkers, newWorkers: workers};
}
