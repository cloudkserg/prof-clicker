import react from 'react';

export default function Event(props) {
    const { event, onChoiceSelect } = props;
    const [selectedChoice, setSelectedChoice] = react.useState(null);

    const handleChoiceClick = (e) => {
        const choice = event.choices[e.target.name];
        console.log(e.target.name);
        setSelectedChoice(choice);
    }
    /*
        const handleChoiceSelection = (e) => {
            onChoiceSelect();
            setSelectedChoice(null);
        }
    */
    return (
        <div className={`popup ${event ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__header">{event.name}</h2>
                <p className="popup__description">{event.description}</p>
                {!selectedChoice && (
                    <ul className="popup__choice-list">
                        {event.choices.map((choice, index) => (
                            <li key={index} ><button type="button" name={index} className="popup__choice-btn" onClick={handleChoiceClick}>{choice.description}</button></li>
                        ))}
                    </ul>
                )}
                {selectedChoice && (
                    <ul className="popup__choice-list">
                        <li><button type="button" className="popup__choice-btn popup__choice-btn_state_selected">{selectedChoice.description}</button></li>
                        <li><p>{selectedChoice.result.description}</p></li>
                        <li > <button type="button" className="popup__choice-btn popup__choice-btn_state_ready" onClick={onChoiceSelect}>OK</button></li>
                    </ul>
                )}
            </div>
        </div>
    )
}