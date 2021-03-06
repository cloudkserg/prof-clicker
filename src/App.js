import GameArea from './GameArea';
import ProfArea from './Prof/ProfArea';
import React, { useEffect, useState } from 'react';
import config from "./config/config";
import WinGame from "./WinGame";
import WorkerStorage from "./Worker/WorkerStorage";
import MemberStorage from "./Prof/MemberStorage";
import Event from './Event';
import eventManager from './Events/EventManager';
import EventChoiceResolver from './Events/EventChoiceResolver';

//start WorkerStorage
const workerStorage = new WorkerStorage();
workerStorage.init();
const memberStorage = new MemberStorage();
memberStorage.init();

function App() {
    const [isStop, setStop] = useState(false);
    const [event, setEvent] = useState(null);

    const [workers, setWorkersState] = useState([]);
    workerStorage.onUpdateWorkers(setWorkersState);

    //startMemberStorage
    const [members, setMembersState] = useState([]);
    memberStorage.onUpdateMembers(setMembersState);
    memberStorage.onDecreaseMember(member => workerStorage.changeWorkerToNonMember(member.worker));
    const increaseMember = () => {
        const worker = workerStorage.getRandomNonMember();
        if (worker) {
            memberStorage.addMember(worker);
        }
    }
    const decreaseMember = () => {
        memberStorage.popRandomMember();
    }


    const eventChoiseResolver = new EventChoiceResolver(decreaseMember, increaseMember);

    useEffect(() => {
        if (memberStorage.getCount() > config.winProfItemCount) {
            workerStorage.stop();
            memberStorage.stop();
            setStop(true);
        }
    }, []);

    const handleEventChoiceSelect = (choice) => {
        setEvent(null);
        eventChoiseResolver.resolve(choice);
    }

    const handleEventPopup = () => {
        const event = eventManager.tryEvent();

        if (event) {
            setEvent(event);
        }

    }

    return (
        <div className="App">
            {!isStop && <span>
                <ProfArea members={members} increasedProfItemCount={memberStorage.allAgitated} decreasedProfItemCount={memberStorage.allLeft}/>
                <GameArea
                    workerStorage={workerStorage}
                    memberStorage={memberStorage}
                    workers={workers}
                    onEventPopup={handleEventPopup}
                />
            </span >}

            { isStop && <WinGame ></WinGame>}
            { event && <Event event={event} onChoiceSelect={handleEventChoiceSelect} />}
        </div >
    );
}

export default App;
