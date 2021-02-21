import * as _ from 'lodash'

export default function checkTryVerb (randomizer, agitProbability, countTries) {
   if (randomizer.randomChance(agitProbability)) {
       return true;
   }
   return false;
};
