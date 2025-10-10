import { TimeInfo } from "../models/TimeInfo";

export class TimeService {

    getCurrentTime(): TimeInfo {
        const now = new Date();
        return new TimeInfo(now.getHours(), now.getMinutes(), now.getSeconds());
    }

}

