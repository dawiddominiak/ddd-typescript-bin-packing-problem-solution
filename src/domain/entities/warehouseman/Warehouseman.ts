import { IEntity } from "../../shared/IEntity";
import { IObserver } from "../../shared/IObserver";
import { Truck } from "../carrier/Truck";
import { Action } from "../common/Action";
import { UpdateEvent } from "../common/UpdateEvent";
import { Pack } from "../pack/Pack";
import { IPackingStrategy } from "./IPackingStrategy";

export class Warehouseman implements IObserver, IEntity {
    private name: string;
    private events: UpdateEvent[];
    private packingStrategy: IPackingStrategy;

    constructor(name: string) {
        this.name = name;
        this.events = [];
    }

    public onUpdate(event: UpdateEvent) {
        this.events.push(event);
    }

    public setPackingStrategy(packingStrategy: IPackingStrategy) {
        this.packingStrategy = packingStrategy;
    }

    public pack(packs: Pack[], courierGenerator: any) {
        // TODO: custom error is case of lack packingStrategy.
        this.packingStrategy.pack(packs, courierGenerator);
    }

    public unload(truck: Truck) {
        const packs = truck.unload();

        packs.forEach((pack) => {
            pack.addObserver(this);
            pack.updateState(Action.Unloaded, truck);
        });

        return packs;
    }

    public getObservedEvents() {
        return this.events;
    }

    public sameIdentityAs(other: Warehouseman) {
        return this.name === other.name;
    }
}
