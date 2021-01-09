import ProfMember from './ProfMember';
import Man from './Man';


export default function Factory(props) {
    return (
        <div class="factory-area">
            <div className="factory-container">
                <div className="factory"></div>
                <div className="road">
                    <Man />
                </div>
                <div className="bus"></div>
            </div>
            <ProfMember />
        </div>
    );
}