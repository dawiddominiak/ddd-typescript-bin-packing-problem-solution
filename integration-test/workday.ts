import * as chai from "chai";
import * as Uuid from "uuid";
import { Courier } from "../src/domain/entities/carrier/Courier";
import { Truck } from "../src/domain/entities/carrier/Truck";
import { Pack } from "../src/domain/entities/pack/Pack";
import { Warehouseman } from "../src/domain/entities/warehouseman/Warehouseman";
import { GreedyPackingStrategy } from "../src/infrastructure/GreedyPackingStrategy";
import { WorkdayService } from "../src/infrastructure/WorkdayService";

const expect = chai.expect;

describe("WorkdayService", () => {
    it("should process the whole workday, packs should be loaded correctly to Courier's cars.", () => {
        const workdayService = new WorkdayService();
        const warehouseman = new Warehouseman("test warehouseman");
        warehouseman.setPackingStrategy(new GreedyPackingStrategy());
        const truck = new Truck("test truck");
        const packs = [
            new Pack(Uuid.v4(), 100),
            new Pack(Uuid.v4(), 150),
            new Pack(Uuid.v4(), 110),
            new Pack(Uuid.v4(), 70),
            new Pack(Uuid.v4(), 40),
        ];
        truck.load(packs);

        const courier1 = new Courier("1st courier");
        const courier2 = new Courier("2nd courier");
        const courier3 = new Courier("3rd courier");

        function* generator() {
            yield courier1;
            yield courier2;
            yield courier3;
        }

        workdayService.begin(truck, warehouseman, generator());

        expect(courier1.getLoadWeight()).to.equal(190);
        expect(courier2.getLoadWeight()).to.equal(180);
        expect(courier3.getLoadWeight()).to.equal(100);
    });
});
