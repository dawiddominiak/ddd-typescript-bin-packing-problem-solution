import { Truck } from "../domain/entities/carrier/Truck";
import { Warehouseman } from "../domain/entities/warehouseman/Warehouseman";
import { IWorkdayService } from "../domain/service/IWorkdayService";

export class WorkdayService implements IWorkdayService {
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
