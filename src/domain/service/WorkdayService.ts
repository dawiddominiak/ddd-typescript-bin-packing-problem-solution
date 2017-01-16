import { Truck } from "../entities/carrier/Truck";
import { Warehouseman } from "../entities/warehouseman/Warehouseman";

export class WorkdayService {
    /**
     * begin
     * @param truck {Truck} - a truck arriving in the morning.
     * @param warehouseman {Warehouseman} a warehouseman to repack the Truck and store events.
     * @param courierGenerator {any} generator of next Courier object's
     */
    public begin(truck: Truck, warehouseman: Warehouseman, courierGenerator: any) {
        const packs = warehouseman.unload(truck);
        warehouseman.pack(packs, courierGenerator);
    }
}
