import * as SprintfJs from "sprintf-js";
import { Action } from "../common/Action";
import { Pack } from "../pack/Pack";
import { AbstractCarrier } from "./AbstractCarrier";
import { CourierOverloadedError } from "./errors/CourierOverloadedError";

export class Courier extends AbstractCarrier {
    private maxLoad: number = 200;
    private packs: Pack[];

    constructor(name: string) {
        super(name);
        this.packs = [];
    }

    public loadPack(pack: Pack) {
        const packWeight = pack.getWeight();
        const currentLoadWeight = this.getLoadWeight();

        if (this.maxLoad - currentLoadWeight < packWeight) {
            throw new CourierOverloadedError (SprintfJs.sprintf(
                "Courier could not carry additional %d kg, because current load is %d and max load is %d",
                packWeight,
                currentLoadWeight,
                // tslint:disable-next-line:trailing-comma
                this.maxLoad
            ));
        }

        this.packs.push(pack);
        pack.updateState(Action.Packed, this);
    }

    public getLoadWeight() {
        return this.packs.reduce((total, currentPack) => {
            return total + currentPack.getWeight();
        }, 0);
    }

    public showLoad() {
        return this.packs;
    }
}
