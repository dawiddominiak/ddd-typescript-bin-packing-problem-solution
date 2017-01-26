import { Courier } from "../../domain/entities/carrier/Courier";
import { Pack } from "../../domain/entities/pack/Pack";

export interface IPackingStrategy {
    /**
     * pack
     * @param packs {Pack[]} packs to be packed into Courier's cars
     * @param courierGenerator {any} generator of next Courier object's
     */
    pack(packs: Pack[], courierGenerator: any): void;
}
