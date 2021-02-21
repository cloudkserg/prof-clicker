import * as _ from 'lodash';

export default class MemberStorage {
    constructor() {
        this.members = [];
    }


    pushMember(worker) {
        this.members.push(worker);
    }

    popRandomMember() {
        return _.shuffle(this.members).pop();
    }
}
