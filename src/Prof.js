import ProfMember from "./ProfMember";
import Man from "./Man";

export default function Prof(props) {
    return (
        <div className="prof-area">
            <div className="prof-container">
                <div className="prof-item">
                    <ProfMember />
                    <p className="prof-item-count">1</p>
                </div>
                <div className="prof-item">
                    <div className="man" />
                    <p className="prof-item-count">2</p>
                </div>
            </div>
        </div>
    );
}