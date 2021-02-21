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
                    <>
                        <p>
                            {selectedChoice.description}
                        </p>
                        <p>
                            {selectedChoice.result.description}
                        </p>

                        <button type="button" onClick={onChoiceSelect}>OK</button>
                    </>
                )}
            </div>
        </div>
    )
}