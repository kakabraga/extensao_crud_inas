import { IEventBus } from "../interfaces/IEventBus";

type Callback = (payload: { nome: string }) => void;

export class EventBus implements IEventBus {

    private listeners: { [event: string]: Callback[] } = {};

    on(event: string, callback: Callback): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event: string, callback: Callback): void {
        if (!this.listeners[event]) {return;}
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
    emit(event: string, payload: { nome: string }): void {
        if (!this.listeners[event]) {return;}
        this.listeners[event].forEach(callback => callback(payload));
    }
}