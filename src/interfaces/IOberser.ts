export interface IObserver {
    handle(payload: { nome: string }): void;
}