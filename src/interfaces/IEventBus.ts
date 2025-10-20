export interface IEventBus {
    emit(event: string, payload: {nome: string}): void;
    on(event: string, callback: (payload: {nome: string}) => void): void;
    off(event: string, callback: (payload: {nome: string}) => void): void;
}