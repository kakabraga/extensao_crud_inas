import { HelloInfo } from "../models/HelloInfo";

export class HelloService {

    getHelloMsg(): String {
        const msg = new HelloInfo();
        return msg.hello();
    }
}