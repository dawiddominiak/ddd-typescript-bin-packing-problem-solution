import { Truck } from "../entities/carrier/Truck";
import { Warehouseman } from "../entities/warehouseman/Warehouseman";

export class WorkdayService {
    public begin(truck: Truck, warehouseman: Warehouseman, courierGenerator: any) {
        const packs = warehouseman.unload(truck);
        warehouseman.pack(packs, courierGenerator);
    }
}
