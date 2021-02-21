import config from "../config/config";
import deleteNeededWorkers from "../utils/deleteNeededWorkers";
import changeWorkers from "../utils/changeWorkers";
import createNewWorkers from "../utils/createNewWorkers";

const [roadWorkers, setRoadWorkers] = useState([]);
const [plantWorkers, setPlantWorkers] = useState([]);
const [houseWorkers, setHouseWorkers] = useState([]);

const updateRoadWorkers = (state, dispatch) => {
    roadWorkers = state.roadWorkers;
    let newWorkers = deleteNeededWorkers(roadWorkers);
    newWorkers = changeWorkers(newWorkers);
    newWorkers = createNewWorkers(newWorkers);
    dispatch({type: })
};

let workerInterval = null;
let reducer = null;

export default class WorkerStorage {
    constructor() {
        workerInterval = setInterval(() => updateWorkers(), config.workerAnimateTimeout);

    }

    getReducer() {
        return reducer;
    }

}
