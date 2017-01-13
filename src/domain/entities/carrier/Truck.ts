import { Pack } from "../pack/Pack";
import { AbstractCarrier } from "./AbstractCarrier";

export class Truck extends AbstractCarrier {
    private packs: Pack[];

    constructor(name: string) {
        super(name);
        this.packs = [];
    }

    public load(packs: Pack[]) {
        this.packs = packs;
    }

    public unload() {
        const packs = this.packs;
        this.packs = [];

        return packs;
    }

    public showLoad() {
        return this.packs;
    }
}
