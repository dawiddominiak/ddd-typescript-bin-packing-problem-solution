import * as SprintfJs from "sprintf-js";
import { IEntity } from "../../shared/IEntity";
import { AbstractCarrier } from "../carrier/AbstractCarrier";
import { Pack } from "../pack/Pack";
import { Action } from "./Action";

export class UpdateEvent implements IEntity {
    private uuid: string;
    private action: Action;
    private carrier: AbstractCarrier;
    private pack: Pack;

    constructor(uuid: string, action: Action, carrier: AbstractCarrier, pack: Pack) {
        this.uuid = uuid;
        this.action = action;
        this.carrier = carrier;
        this.pack = pack;
    }

    /**
     * Returns human readable report from event.
     * @returns string
     */
    public report() {
        return SprintfJs.sprintf(
            "%s: Action: %s, Carrier: %s, pack: %s.",
            this.uuid,
            Action[this.action],
            this.carrier.getName(),
            this.pack.getId(),
        );
    }

    public sameIdentityAs(other: UpdateEvent) {
        return other.uuid === this.uuid;
    }
}
