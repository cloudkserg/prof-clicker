import * as _ from "lodash";

export default function tryVerbAllMans (mans, increaseCountProfMembers) {
    const oldMans = mans.map(man => ({...man}));
    mans.forEach(man => man.runTryVerb());
    const onlyChangedMans = oldMans.filter(oldMan => mans.some(man => man.id == oldMan.id && man.isProf != oldMan.isProf));
    return {onlyChangedMans, newMans: mans};
}
