import { UpdateEvent } from "../entities/common/UpdateEvent";
import { IObserver } from "./IObserver";

export interface IObservable {
    addObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
    informObservers(event: UpdateEvent): void;
}
