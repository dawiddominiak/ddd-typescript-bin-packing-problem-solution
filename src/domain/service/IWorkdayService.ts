import { Truck } from "../entities/carrier/Truck";
import { Warehouseman } from "../entities/warehouseman/Warehouseman";

export interface IWorkdayService {
    begin(truck: Truck, warehouseman: Warehouseman, courierGenerator: any): void;
}
