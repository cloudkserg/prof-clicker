import Man from './Man';
import ProfMember from "./ProfMember";
import {useEffect, useState} from "react";
import deleteNeededMans from "./utils/deleteNeededMans";
import changeMans from "./utils/changeMans";
import createNewMans from "./utils/createNewMans";
import config from "./config/config";
import tryVerbAllMans from "./utils/tryVerbAllMans";

const updateMans = (mans) => {
    if (mans) {
        let newMans = deleteNeededMans(mans);
        newMans = changeMans(newMans);
        newMans = createNewMans(newMans);
        return newMans;
    }
    return mans;
};

const runTryVerb = (mans, setMans, increaseProfMans) => {
    const {newMans, onlyChangedMans} = tryVerbAllMans(mans);
    setMans(newMans);
    increaseProfMans(onlyChangedMans.length);
}

export default function GameArea(props) {
    const [mans, setMans] = useState([]);
    const [tryVerb, setTryVerb] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setMans(updateMans(mans)), config.workerAnimateTimeout);
        return () => clearInterval(interval);
    }, [mans]);

    useEffect(() => {
        if (tryVerb) {
            runTryVerb(mans, setMans, props.increaseProfMans);
            setTimeout(() => setTryVerb(false), config.workerAnimateTryVerbTimeout);
        }
    }, [tryVerb]);
    return (
        <div className="factory-area">
            <div className="factory-container">
                <div className="factory"></div>
                <div className="road">
                    {mans.map(man =><Man key={man.id} man={man} tryVerb={tryVerb} ></Man>)}
                </div>
                <div className="bus"></div>
            </div>
            <ProfMember onVerb={() => setTryVerb(true)} />
        </div>
    );
}
