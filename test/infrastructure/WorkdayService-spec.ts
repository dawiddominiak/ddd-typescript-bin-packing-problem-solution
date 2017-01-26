import * as chai from "chai";
import * as spies from "chai-spies";
import * as Uuid from "uuid";
import { Courier } from "../../src/domain/entities/carrier/Courier";
import { Truck } from "../../src/domain/entities/carrier/Truck";
import { Warehouseman } from "../../src/domain/entities/warehouseman/Warehouseman";
import { GreedyPackingStrategy } from "../../src/infrastructure/GreedyPackingStrategy";
import { WorkdayService } from "../../src/infrastructure/WorkdayService";

chai.use(spies);
const expect = chai.expect;

describe("WorkdayService", () => {
    it ("should should run warehouseman.unload and warehouseman.pack methods", () => {
        function* generator() {
            yield new Courier("1st courier");
        }

        const workdayService = new WorkdayService();
        const truck = new Truck("test truck");
        const warehouseman = new Warehouseman("test warehouseman");
        warehouseman.setPackingStrategy(new GreedyPackingStrategy());

        const warehousemanUnloadSpy = chai.spy.on(warehouseman, "unload");
        const warehousemanPackSpy = chai.spy.on(warehouseman, "pack");

        workdayService.begin(truck, warehouseman, generator());

        expect(warehousemanUnloadSpy).to.have.been.called();
        expect(warehousemanPackSpy).to.have.been.called();
    });
});
