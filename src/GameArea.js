import ProfMember from "./ProfMember";
import { useEffect, useState } from "react";
import config from "./config/config";
import Event from './Event';
import Plant from "./Path/Plant";
import House from "./Path/House";
import WorkerStorage from "./Worker/WorkerStorage";

inActive = true
export default function GameArea(props) {
    const [workers, setWorkers] = useState([]);

    const workerStorage = new WorkerStorage(props.inActive);



    const [event, setEvent] = useState(null);



    useEffect(() => {
        const interval = setInterval(() => setWorkers(updateWorkers(workers)), config.workerAnimateTimeout);
        return () => clearInterval(interval);
    }, [workers]);



    const handleEventChouiceSelect = (e) => {
        setEvent(null);
    }

    const handleEventPopup = (event) => {
        setEvent(event);
    }

    return (
        <div className="factory-area">
            <div className="factory-container">
                <Plant workers={state.plantWorkers}/>
                <Road workers={state.roadWorkers} />
                <House workers={state.houseWorkers} />
            </div>
            <ProfMember workerStorage={workerStorage} onEventPopup={handleEventPopup} />
            {event && <Event event={event} onChoiceSelect={handleEventChouiceSelect} />}
        </div>
    );
}
