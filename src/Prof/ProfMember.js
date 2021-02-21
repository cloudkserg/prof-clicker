import { useState } from "react";
import config from "../config/config";


export default function ProfMember() {
    const [isClicked, setClicked] = useState(false);


    const performClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), config.profMemberInActiveTimeout);
    };
    return (
        <div className={!isClicked ? 'prof-member' : 'prof-member clicked'} onClick={performClick}>
        </div>
    );
}
