import events from './events.json';

class EventRepository {
    getEvents() {
        return events;
    }
}

const eventRepository = new EventRepository();

export default eventRepository;