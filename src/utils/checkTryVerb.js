import config from "../config/config";
import * as _ from 'lodash'

export default function checkTryVerb (randomizer, countTries) {
   if (randomizer.randomChance(config.verbWorkerChance)) {
       return true;
   }
    return _.range(0, countTries).some(() => checkTryVerb(randomizer, 0));
};
