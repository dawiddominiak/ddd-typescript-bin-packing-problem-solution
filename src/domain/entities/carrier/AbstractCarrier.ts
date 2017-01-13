import { IEntity } from "../../shared/IEntity";

export abstract class AbstractCarrier implements IEntity {
    protected name: string;

    /**
     * AbstractCarrier constructor.
     * @param name {string} name of carrier.
     */
    constructor(name: string) {
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public sameIdentityAs(other: AbstractCarrier) {
        return other.getName() === this.getName();
    }
}
