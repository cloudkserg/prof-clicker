import { useState } from "react";
import Event from './Event';
import Plant from "./Path/Plant";
import House from "./Path/House";
import Road from "./Path/Road";
import AgitateProfMember from "./Prof/AgitateProfMember";

export default function GameArea(props) {
    const workerStorage = props.workerStorage;
    const [event, setEvent] = useState(null);


    const handleEventChouiceSelect = (e) => {
        setEvent(null);
    }

    const handleEventPopup = (event) => {
        setEvent(event);
    }

    return (
        <div className="factory-area">
            <div className="factory-container">
                <Plant workers={workerStorage.getPlantWorkers()}/>
                <Road workers={workerStorage.getRoadWorkers()} />
                <House workers={workerStorage.getHouseWorkers()} />
            </div>
            <AgitateProfMember workerStorage={workerStorage} onEventPopup={handleEventPopup} />
            {/*{event && <Event event={event} onChoiceSelect={handleEventChouiceSelect} />}*/}
        </div>
    );
}
