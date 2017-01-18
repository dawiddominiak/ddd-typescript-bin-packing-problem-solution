import * as SprintfJs from "sprintf-js";
import { Action } from "../common/Action";
import { Pack } from "../pack/Pack";
import { AbstractCarrier } from "./AbstractCarrier";
import { CourierOverloadedError } from "./errors/CourierOverloadedError";

/**
 * Courier can load only 200 kg to his mode of transportation.
 */
export class Courier extends AbstractCarrier {
    private maxLoad: number = 200;
    private packs: Pack[];

    /**
     * @inheritdoc
     */
    constructor(name: string) {
        super(name);
        this.packs = [];
    }

    /**
     * Loads single pack to courier.
     * @param pack {Pack} pack to be loaded.
     * @throws CourierOverloadedError
     */
    public loadPack(pack: Pack) {
        const packWeight = pack.getWeight();
        const currentLoadWeight = this.getLoadWeight();

        if (this.maxLoad - currentLoadWeight < packWeight) {
            throw new CourierOverloadedError (SprintfJs.sprintf(
                "Courier could not carry additional %d kg, because current load is %d and max load is %d",
                packWeight,
                currentLoadWeight,
                this.maxLoad,
            ));
        }

        this.packs.push(pack);
        pack.updateState(Action.Packed, this);
    }

    /**
     * Counts current load weight of courier.
     * @returns number
     */
    public getLoadWeight() {
        return this.packs.reduce((total, currentPack) => {
            return total + currentPack.getWeight();
        }, 0);
    }

    /**
     * @returns Pack[] preview of loaded packs.
     */
    public showLoad() {
        return this.packs;
    }
}
