import config from "../config/config";
import {Motion, spring} from 'react-motion';

export default function WorkerView({worker}) {
    const randomNumber = Math.floor(Math.random() * (config.generateNewWorkerRandomShift - 1) + 1);
    const xPosition = (worker.index * config.workerStep) +(worker.index < 0 ? 0 : randomNumber);
    const workerClass = !worker.isProf ? 'worker road__worker' : 'prof-worker road__worker';
    return (
        <div>
            <Motion style={{x: spring(xPosition)}}>
                {({x}) =>
                    <div className={workerClass} style={{
                        borderBottom: (worker.inProcessAgitate) ? `20px solid red` : ``,
                        WebkitTransform: `translate3d(${x}px, 0, 0)`,
                        transform: `translate3d(${x}px, 0, 0)`,
                    }}>{worker.id}</div>}
            </Motion>

        </div>
    );
};

