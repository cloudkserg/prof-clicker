import GameArea from './GameArea';
import Prof from './Prof';
import React, { useEffect, useState } from 'react';
import config from "./config/config";
import getDecreasedItemCountInTime from "./utils/getDecreasedItemCountInTime";
import WinGame from "./WinGame";
import Event from './Event';
import eventManager from './Events/EventManager';



function App() {
    const [profItemCount, setProfItemCount] = useState(0);
    const [decreasedProfItemCount, setDecreasedProfItemCount] = useState(0);
    const [isStop, setStop] = useState(false);
    const [event, setEvent] = useState(null);

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

    const handleEventChoiceSelect = (e) => {
        setEvent(null);
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
                <Prof increasedProfItemCount={profItemCount} decreasedProfItemCount={decreasedProfItemCount} />
                <GameArea setProfItemCount={setProfItemCount} increaseProfMans={increaseProfItemCount} onEventPopup={handleEventPopup} />
            </span>}
            {isStop && <WinGame ></WinGame>}
            {event && <Event event={event} onChoiceSelect={handleEventChoiceSelect} />}
        </div>
    );
}

export default App;
