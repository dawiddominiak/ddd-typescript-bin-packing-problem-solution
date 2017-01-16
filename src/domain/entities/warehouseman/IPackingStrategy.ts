import { Courier } from "../carrier/Courier";
import { Pack } from "../pack/Pack";

export interface IPackingStrategy {
    /**
     * pack
     * @param packs {Pack[]} packs to be packed into Courier's cars
     * @param courierGenerator {any} generator of next Courier object's
     */
    pack(packs: Pack[], courierGenerator: any): void;
}
