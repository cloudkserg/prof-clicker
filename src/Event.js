export default function Event(props) {
    const { event, onChoiceSelect } = props;

    return (
        <div className={`popup ${event ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__header">{event.name}</h2>
                <p className="popup__description">{event.description}</p>
                <ul className="popup__choice-list">
                    {event.choices.map((choice, index) => (
                        <li><button type="button" className="popup__choice-btn" key={index} onClick={onChoiceSelect}>{choice.description}</button></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}