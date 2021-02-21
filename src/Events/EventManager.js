import config from '../config/config';
import eventRepository from './EventRepository';

class EventManager {
    constructor(maxTryCount, eventRepository) {
        this._eventTryCount = 0;
        this._maxTryCount = maxTryCount;
        this._event = null;
        this._eventRepository = eventRepository;
        this._usedEvents = new Set();
    }

    tryEvent() {
        let newEvent = null;

        this._increastTryCount();

        if (!this._event && this._tryChance()) {
            this._event = this._generateEvent();
            newEvent = this._event;
        }

        if (this._isMaxTryHit()) {
            this._reset();
        }

        return newEvent;
    }

    _increastTryCount() {
        this._eventTryCount++;
    }

    _isMaxTryHit() {
        return this._eventTryCount === this._maxTryCount;
    }

    _resetTryCount() {
        this._eventTryCount = 0;
    }

    _resetEvent() {
        this._event = null;
    }

    _reset() {
        this._resetTryCount();
        this._resetEvent();
    }

    _tryChance() {
        const probability = this._getEventProbability();
        const chance = this._getEventChance();

        return chance <= probability ? true : false;
    }

    _getEventProbability() {
        return Math.floor(this._eventTryCount / this._maxTryCount * 100);
    }

    _getEventChance() {
        return Math.floor(Math.random() * 100);
    }

    _generateEvent() {
        const events = this._eventRepository.getEvents();

        const notUsedEvents = this._excludeUsedEvents(events);

        return this._getRandonEvent(notUsedEvents);
    }

    _excludeUsedEvents(events) {
        return events.filter(e => !this._usedEvents.has(events.id));
    }

    _getRandonEvent(events) {
        const eventRandomNum = Math.floor(Math.random() * events.length);

        return events[eventRandomNum];
    }
}

const eventManager = new EventManager(config.eventMaxTryCount, eventRepository);

export default eventManager;