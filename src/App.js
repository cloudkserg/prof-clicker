import GameArea from './GameArea';
import ProfArea from './Prof/ProfArea';
import React, {useEffect, useState} from 'react';
import config from "./config/config";
import WinGame from "./WinGame";
import WorkerStorage from "./Worker/WorkerStorage";
import MemberStorage from "./Prof/MemberStorage";

//start WorkerStorage
const workerStorage = new WorkerStorage();
workerStorage.init();
const memberStorage = new MemberStorage();
memberStorage.init();

function App() {
    const [isStop, setStop] = useState(false);

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


    //if we win?
    useEffect(() => {
        if (memberStorage.getCount() > config.winProfItemCount) {
            workerStorage.stop();
            memberStorage.stop();
            setStop(true);
        }
    }, [members]);

    if (!workerStorage) {
        return (<div></div>);
    }

    return (
        <div className="App">
            {!isStop && <span>
                <ProfArea members={members} increasedProfItemCount={memberStorage.allAgitated} decreasedProfItemCount={memberStorage.allLeft}/>
                <GameArea
                    workerStorage={workerStorage}
                    memberStorage={memberStorage}
                    workers={workers}
                />
                {/*<HistoryArea onPause={onPause} onRun={onRun} />*/}

            </span>}
            {isStop && <WinGame ></WinGame> }
        </div>
    );
}

export default App;
