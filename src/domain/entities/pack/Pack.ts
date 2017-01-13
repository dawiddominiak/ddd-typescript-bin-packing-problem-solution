import * as _ from "lodash";
import * as Uuid from "uuid";
import { IEntity } from "../../shared/IEntity";
import { IObservable } from "../../shared/IObservable";
import { IObserver } from "../../shared/IObserver";
import { AbstractCarrier } from "../carrier/AbstractCarrier";
import { Action } from "../common/Action";
import { UpdateEvent } from "../common/UpdateEvent";

export class Pack implements IObservable, IEntity {
    private packId: string;
    private weight: number;
    private observers: IObserver[];

    /**
     * Pack constructor.
     * @param packId {string} identity of pack.
     * @param weight {number} weight of pack in kg.
     */
    constructor(packId: string, weight: number) {
        this.packId = packId;
        this.weight = weight;
        this.observers = [];
    }

    /**
     * @inheritdoc
     */
    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    /**
     * @inheritdoc
     */
    public removeObserver(observer: IObserver) {
        _.pull(this.observers, observer);
    }

    /**
     * Updates state of pack. Informs observers about change.
     * @param action {Action}
     * @param carrier {AbstractCarrier}
     */
    public updateState(action: Action, carrier: AbstractCarrier) {
        const event = new UpdateEvent(Uuid.v4(), action, carrier, this);
        this.informObservers(event);
    }

    /**
     * @inheritdoc
     */
    public informObservers(event: UpdateEvent) {
        this.observers.forEach((observer) => {
            observer.onUpdate(event);
        });
    }

    public getId() {
        return this.packId;
    }

    public getWeight() {
        return this.weight;
    }

    public sameIdentityAs(other: Pack) {
        return other.packId === this.packId;
    }
}
