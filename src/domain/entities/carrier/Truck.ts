import { Pack } from "../pack/Pack";
import { AbstractCarrier } from "./AbstractCarrier";

/**
 * There are new packs every day in the truck.
 * The truck can come with unlimited number and weight of packs.
 */
export class Truck extends AbstractCarrier {
    private packs: Pack[];

    /**
     * @inheritdoc
     */
    constructor(name: string) {
        super(name);
        this.packs = [];
    }

    /**
     * Binds new packs to the truck.
     * @param packs {Pack[]} packs to be loaded into the truck.
     */
    public load(packs: Pack[]) {
        this.packs = packs;
    }

    /**
     * The truck becomes empty.
     * @returns Pack[]
     */
    public unload() {
        const packs = this.packs;
        this.packs = [];

        return packs;
    }

    /**
     * Preview of current load.
     * @returns Pack[]
     */
    public showLoad() {
        return this.packs;
    }
}
