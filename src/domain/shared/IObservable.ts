import { UpdateEvent } from "../entities/common/UpdateEvent";
import { IObserver } from "./IObserver";

export interface IObservable {
    /**
     * Adds new observer of an IObservable.
     * @param observer {IObserver}
     */
    addObserver(observer: IObserver): void;

    /**
     * Removes observer from list of observables.
     * @param observer {IObserver} observer to be removed.
     */
    removeObserver(observer: IObserver): void;

    /**
     * Inform observers about changes.
     * @param event {UpdateEvent}
     */
    informObservers(event: UpdateEvent): void;
}
