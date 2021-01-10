import ProfMember from "./ProfMember";
import getProfRank from "./utils/getProfRank";
import config from "./config/config";


export default function Prof(props) {

    const profItemCount = props.increasedProfItemCount - props.decreasedProfItemCount;
    return (
        <div className="prof-area">
            Для победы набери {config.winProfItemCount} членов.
            <div className="prof-container">
                <div className="prof-item">
                    <ProfMember />
                    <p className="prof-item-count">{getProfRank(profItemCount)}</p>
                </div>
                <div className="prof-item">
                    Сегодня <div className="prof-man" />
                    <p className="prof-item-count">{profItemCount}</p>
                </div>
                <div className="prof-item">
                    Найдено  <div className="prof-man" />
                    <p className="prof-item-count">{props.increasedProfItemCount}</p>
                </div>
                <div className="prof-item">
                     Ушли  <div className="prof-man" />
                    <p className="prof-item-count">{props.decreasedProfItemCount}</p>
                </div>
            </div>
        </div>
    );
}
