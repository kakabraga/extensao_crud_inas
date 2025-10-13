import { TimeInfo } from "../models/TimeInfo";

export class TimeService {

    getCurrentTime(): TimeInfo {
        const now = new Date();
        return new TimeInfo(now.getHours(), now.getMinutes(), now.getSeconds());
    }

    getHoraDeterminada(): number {
        const horaDeterm = new Date();
        return horaDeterm.setHours(17, 0, 0, 0);
    }

    getHoraAtual(): Date {
        return new Date();
    }

    getCalculaDiferencaHoras(): number {
        const horaDeterm = this.getHoraDeterminada();
        const horaAtual = this.getHoraAtual().getTime();
        const diffMs = horaDeterm - horaAtual;
        return diffMs;
    }

    getCalculaDiferencaHorasFormatada(diferencaHoras: number): { hours: number, minutes: number } {
        const diffMinutosTotais = Math.floor(diferencaHoras / 1000 / 60);
        const hours = Math.floor(diffMinutosTotais / 60);
        const minutes  = diffMinutosTotais % 60;
        return { hours, minutes };
    }
}

