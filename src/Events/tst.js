import eventManager from './EventManager';

let m;

for (let i = 1; i <= 60; i++) {
    console.log(i);
    console.log(eventManager.tryEvent());
}