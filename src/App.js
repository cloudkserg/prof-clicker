import GameArea from './GameArea';
import ProfArea from './Prof/ProfArea';
import React, {useEffect, useState} from 'react';
import config from "./config/config";
import getDecreasedItemCountInTime from "./utils/getDecreasedItemCountInTime";
import WinGame from "./WinGame";
import WorkerStorage from "./Worker/WorkerStorage";


function App() {
    const [profItemCount, setProfItemCount] = useState(0);
    const [decreasedProfItemCount, setDecreasedProfItemCount] = useState(0);
    const [isStop, setStop] = useState(false);

    //start
    const [workers, setWorkerState] = useState([]);
    const workerStorage = new WorkerStorage(setWorkerState);
    useEffect(() => {
        workerStorage.init();
        return () => workerStorage.stopStorage();
    }, []);




    const increaseProfItemCount = (value) => setProfItemCount(profItemCount + value);
    useEffect(() => {
        if (isStop) {
            return;
        }
        const interval = setInterval(
            () => setDecreasedProfItemCount(getDecreasedItemCountInTime(profItemCount, decreasedProfItemCount)),
            config.profItemDecreaseInterval);
        return () => clearInterval(interval);
    }, [profItemCount, decreasedProfItemCount]);

    useEffect(() => {
        const isWinGame = profItemCount - decreasedProfItemCount > config.winProfItemCount;
        if (isWinGame) {
            setStop(true);
        }
    }, [profItemCount, decreasedProfItemCount]);



    return (
        <div className="App">
            {!isStop && <span>
                <ProfArea increasedProfItemCount={profItemCount} decreasedProfItemCount={decreasedProfItemCount}/>
                <GameArea
                    workerStorage={workerStorage}
                    workers={workers}
                    setProfItemCount={setProfItemCount}
                    increaseProfWorkers={increaseProfItemCount}
                />
                {/*<HistoryArea onPause={onPause} onRun={onRun} />*/}

            </span>}
            {isStop && <WinGame ></WinGame> }
        </div>
    );
}

export default App;
