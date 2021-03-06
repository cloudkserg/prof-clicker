import { useState } from "react";
import config from "../config/config";


const runWorkerAgitate = (workerStorage, memberStorage) => {
    const successAgitateWorkers = workerStorage.agitateRoadWorkers();
    memberStorage.addMembers(successAgitateWorkers);
}

export default function AgitateProfMember(props) {
    const workerStorage = props.workerStorage;
    const memberStorage = props.memberStorage;
    const [isClicked, setClicked] = useState(false);


    const performClick = () => {
        if (isClicked) {
            return false;
        }
        setClicked(true);
        setTimeout(() => setClicked(false), config.profMemberInActiveTimeout);
        runWorkerAgitate(workerStorage, memberStorage);
        props.onEventPopup({
            name: 'Разговор с работником',
            description: 'Мы оборонное предприятие! Столп российской безопастиности! Ты что тут лодшку шатаешь? Пятая колонна?',
            choices: [{
                description: 'Я твоя дом труба шатал!'
            }, {
                description: 'Терпильный ватник греби отсюдова'
            }, {
                description: 'То что предприятие оборонное - не повод получить зарплату ниже средней'
            }, {
                description: 'Ты прав! Пятая колонна окопалось в начальстве. Режет ЗП, повышает нормы - душит русского человека. Время показать пендосне кто на заводе хозяин!'
            },],
        });
    };
    return (
        <div className={!isClicked ? 'prof-member' : 'prof-member clicked'} onClick={performClick}>
        </div>
    );
}
