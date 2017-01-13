import * as chai from "chai";
import * as spies from "chai-spies";
import * as Uuid from "uuid";
import { Courier } from "../../../../src/domain/entities/carrier/Courier";
import { Truck } from "../../../../src/domain/entities/carrier/Truck";
import { Action } from "../../../../src/domain/entities/common/Action";
import { UpdateEvent } from "../../../../src/domain/entities/common/UpdateEvent";
import { Pack } from "../../../../src/domain/entities/pack/Pack";
import { IPackingStrategy } from "../../../../src/domain/entities/warehouseman/IPackingStrategy";
import { Warehouseman } from "../../../../src/domain/entities/warehouseman/Warehouseman";

chai.use(spies);
const expect = chai.expect;

describe("Warehouseman", () => {
    it("should add event to warehouseman log", () => {
        const warehouseman = new Warehouseman("test warehouseman");
        const carrier = new Courier("test carrier");
        const pack = new Pack(Uuid.v4(), 10);
        const event = new UpdateEvent(Uuid.v4(), Action.Packed, carrier, pack);

        warehouseman.onUpdate(event);

        expect(warehouseman.getObservedEvents().pop()).to.equal(event);
    });
    it("should run pack method from packing strategy", () => {
        class SamplePackingStrategy implements IPackingStrategy {
            // tslint:disable-next-line:no-empty
            public pack(packs: Pack[], courierGenerator: any) {

            }
        }

        function* generatorFunction() {
            yield new Courier("courrier 1");
        }

        const courierGenerator = generatorFunction();

        const warehouseman = new Warehouseman("test warehouseman");
        const packingStrategy = new SamplePackingStrategy();
        const packingStrategyPackSpy = chai.spy.on(packingStrategy, "pack");

        warehouseman.setPackingStrategy(packingStrategy);
        warehouseman.pack([new Pack(Uuid.v4(), 10)], courierGenerator);

        expect(packingStrategyPackSpy).to.have.been.called();
    });
    it("should run truck.unload method, add observer to pack and update state of pack", () => {
        const warehouseman = new Warehouseman("test warehouseman");
        const truck = new Truck("test truck");
        const packs = [new Pack(Uuid.v4(), 10)];
        truck.load(packs);

        const packAddObserverSpy = chai.spy.on(packs[0], "addObserver");
        const packUpdateStateSpy = chai.spy.on(packs[0], "updateState");

        warehouseman.unload(truck);

        expect(packAddObserverSpy).to.have.been.called();
        expect(packUpdateStateSpy).to.have.been.called();
    });
});
