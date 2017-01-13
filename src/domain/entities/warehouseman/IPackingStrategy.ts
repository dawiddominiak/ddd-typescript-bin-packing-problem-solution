import { Courier } from "../carrier/Courier";
import { Pack } from "../pack/Pack";

export interface IPackingStrategy {
    pack(packs: Pack[], availableCouriers: Courier[]): void;
}
