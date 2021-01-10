import GameArea from './GameArea';
import Prof from './Prof';
import React, {useEffect, useState} from 'react';
import config from "./config/config";
import getDecreasedItemCountInTime from "./utils/getDecreasedItemCountInTime";
import WinGame from "./WinGame";

function App() {
    const [profItemCount, setProfItemCount] = useState(0);
    const [decreasedProfItemCount, setDecreasedProfItemCount] = useState(0);
    const [isStop, setStop] = useState(false);

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
                <Prof increasedProfItemCount={profItemCount} decreasedProfItemCount={decreasedProfItemCount}/>
                <GameArea setProfItemCount={setProfItemCount} increaseProfMans={increaseProfItemCount}/>
            </span>}
            {isStop && <WinGame ></WinGame> }
        </div>
    );
}

export default App;
