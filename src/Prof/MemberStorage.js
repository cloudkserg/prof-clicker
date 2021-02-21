import * as _ from 'lodash';
import {MemberModel} from "./MemberModel";
import config from "../config/config";

export default class MemberStorage {
    constructor() {
        this._setMembersState = null;
        this.members = [];
        this.decreaseInterval = null;

        this.allAgitated = 0;
        this.allLeft = 0;
        this._onDecreaseMember = null;
    }

    init() {
        this.decreaseInterval = setInterval(() => this.popRandomMember(),
            config.profItemDecreaseInterval);
    }

    onUpdateMembers(func) {
        this._setMembersState = func;
    }

    onDecreaseMember(func) {
        this._onDecreaseMember = func;
    }

    stop() {
        clearInterval(this.decreaseInterval);
    }

    getCount() {
        return this.members.length;
    }

    addMember(worker) {
        const member = new MemberModel({worker});
        this.members = [...this.members, member];
        this.allAgitated++;

        this._setMembersState(this.members);
    }

    addMembers(workers) {
        workers.map(worker => this.addMember(worker));
    }

    popRandomMember() {
        const member = _.sample(this.members);
        if (member) {
            this.members = this.members.filter(oldMember => member.worker.id !== oldMember.worker.id);
            this.allLeft++;

            this._setMembersState(this.members);
            this._onDecreaseMember(member);
        }

        return member;
    }

}
