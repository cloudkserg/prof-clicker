import config from "./config/config";
import {Motion, spring} from 'react-motion';

export default function Man({man, tryVerb}) {
    const randomNumber = Math.floor(Math.random() * (config.generateNewWorkerRandomShift - 1) + 1);
    const xPosition = (man.index * config.workerStep) +(man.index == 0 ? 0 : randomNumber);

    const manClass = !man.isProf ? 'man road__man' : 'prof-man road__man';
    return (
        <div>
            <Motion style={{x: spring(xPosition)}}>
                {({x}) =>
                    <div className={manClass} style={{
                        borderBottom: (tryVerb && !man.isProf) ? `20px solid red` : ``,
                        WebkitTransform: `translate3d(${x}px, 0, 0)`,
                        transform: `translate3d(${x}px, 0, 0)`,
                    }}></div>}
            </Motion>

        </div>
    );
};

