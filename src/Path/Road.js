import Man from "../Man";
import config from "../config/config";
import { useEffect, useState } from "react";
import tryVerbAllWorkers from "../utils/tryVerbAllWorkers";


const runTryVerb = (workers, setWorkers, increaseProfWorkers) => {
    const { newWorkers, onlyChangedWorkers } = tryVerbAllWorkers(workers);
    setWorkers(newWorkers);
    increaseProfWorkers(onlyChangedWorkers.length);
}

export default function Road(props) {
    const [tryVerb, setTryVerb] = useState(false);

    useEffect(() => {
        if (tryVerb) {
            runTryVerb(props.workers, setWorkers, props.increaseProfWorkers);
            setTimeout(() => setTryVerb(false), config.workerAnimateTryVerbTimeout);
        }
    }, [tryVerb]);

    return (
        <div className="road">
            {props.workers.map(man => <Man key={man.id} man={man} tryVerb={tryVerb} ></Man>)}
        </div>
    );
}
