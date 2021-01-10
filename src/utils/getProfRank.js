import * as _ from 'lodash'
const ranks = {
    0: 1,
    10: 2,
    20: 3
};
export default function getProfRank (profItemCount) {
    return _.chain(ranks).reverse().some(rank => profItemCount >= rank).value();
}
