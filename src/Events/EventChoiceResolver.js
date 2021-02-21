export default class EventChoiceResolver {

    constructor(decreaseMember, increaseMemeber) {
        this._decreaseMember = decreaseMember;
        this._increaseMemeber = increaseMemeber;
        this._actionTypeMap = new Map();
        this._initMap();
    }

    resolve(choice) {
        choice.result.actions.map(action => {
            for (let actionCount = 0; actionCount <= action.value; actionCount++) {
                const actionFunction = this._actionTypeMap.get(action.type);
                actionFunction();
            }
        });
    }

    _initMap() {
        this._actionTypeMap.set("decreaseMember", this._decreaseMember);
        this._actionTypeMap.set("increaseMember", this._increaseMemeber);
    }
}