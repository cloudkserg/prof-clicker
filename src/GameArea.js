import Plant from "./Path/Plant";
import House from "./Path/House";
import Road from "./Path/Road";
import AgitateProfMember from "./Prof/AgitateProfMember";

export default function GameArea(props) {
    const workerStorage = props.workerStorage;
    const memberStorage = props.memberStorage;


    return (
        <div className="factory-area">
            <div className="factory-container">
                <Plant workers={workerStorage.getPlantWorkers()} />
                <Road workers={workerStorage.getRoadWorkers()} />
                <House workers={workerStorage.getHouseWorkers()} />
            </div>

            <AgitateProfMember workerStorage={workerStorage}  memberStorage={memberStorage} onEventPopup={props.onEventPopup} />
        </div>
    );
}
