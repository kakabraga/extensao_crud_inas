export class TimeInfo {
    constructor(
        public hours: number,
        public minutes: number,
        public seconds: number,
    ) { }

    toString(): string {
        return `${this.hours}:${this.minutes.toString().padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
    }

    toStringHoras(HoraFormatada: string): string {
        return `Faltam ${HoraFormatada} para o fim do turno`;
    }




}