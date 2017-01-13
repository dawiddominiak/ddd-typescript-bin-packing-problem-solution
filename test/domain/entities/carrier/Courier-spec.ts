import * as chai from "chai";
import * as spies from "chai-spies";
import * as Uuid from "uuid";
import { Courier } from "../../../../src/domain/entities/carrier/Courier";
import { Pack } from "../../../../src/domain/entities/pack/Pack";
import { Warehouseman } from "../../../../src/domain/entities/warehouseman/Warehouseman";

chai.use(spies);
const expect = chai.expect;

describe("Courier", () => {
    it("should load pack to courier's car and log action to warehouseman", () => {
        const courier = new Courier("test courier");
        const pack = new Pack("94d4501f-2090-479f-8a5e-8c1494a648b8", 10);
        const updateStateSpy = chai.spy.on(pack, "updateState");
        courier.loadPack(pack);

        expect(courier.showLoad().pop()).to.equal(pack);
        expect(updateStateSpy).to.have.been.called();
    });
    it("should count the load weight", () => {
        const courier = new Courier("test courier");
        const packs = [
            new Pack(Uuid.v4(), 10),
            new Pack(Uuid.v4(), 15),
        ];

        packs.forEach((pack) => {
            courier.loadPack(pack);
        });

        expect(courier.getLoadWeight()).to.equal(25);
    });
});
