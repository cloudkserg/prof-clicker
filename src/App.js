import GameArea from './GameArea';
import ProfArea from './Prof';
import React, {useEffect, useState} from 'react';
import config from "./config/config";
import getDecreasedItemCountInTime from "./utils/getDecreasedItemCountInTime";
import WinGame from "./WinGame";
import WorkerStorage from "./Worker/WorkerStorage";

function App() {
    const [profItemCount, setProfItemCount] = useState(0);
    const [decreasedProfItemCount, setDecreasedProfItemCount] = useState(0);
    const [isStop, setStop] = useState(false);
    const workerStorage = new WorkerStorage();

    const onPause = () => workerStorage.onPause();
    const onRun = () => workerStorage.onRun();

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
    }, [profItemCount, decreasedProfItemCount])

    return (
        <div className="App">
            {!isStop && <span>
                <ProfArea increasedProfItemCount={profItemCount} decreasedProfItemCount={decreasedProfItemCount}/>
                <GameArea
                    workerStorage={workerStorage}
                    setProfItemCount={setProfItemCount}
                    increaseProfWorkers={increaseProfItemCount}
                />
                <HistoryArea onPause={onPause} onRun={onRun} />

            </span>}
            {isStop && <WinGame ></WinGame> }
        </div>
    );
}

export default App;
