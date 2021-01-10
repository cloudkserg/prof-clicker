import {useState} from "react";
import config from "./config/config";

export default function ProfMember(props) {
    const [isClicked, setClicked] = useState(false);

    const performClick = () => {
        if (isClicked) {
            return false;
        }
        setClicked(true);
        setTimeout(() => setClicked(false), config.profMemberInActiveTimeout);
        props.onVerb();
    };
    return (
        <div className={!isClicked ? 'prof-member' : 'prof-member clicked'} onClick={performClick}>
        </div>
    );
}
