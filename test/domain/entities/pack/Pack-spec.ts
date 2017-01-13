import * as chai from "chai";
import * as spies from "chai-spies";
import * as Uuid from "uuid";
import { Courier } from "../../../../src/domain/entities/carrier/Courier";
import { Action } from "../../../../src/domain/entities/common/Action";
import { Pack } from "../../../../src/domain/entities/pack/Pack";
import { Warehouseman } from "../../../../src/domain/entities/warehouseman/Warehouseman";

chai.use(spies);
const expect = chai.expect;

describe("Pack", () => {
    it("should add observer to pack", () => {
        const pack = new Pack(Uuid.v4(), 10);
        const courier = new Courier("test courier");
        const warehouseman = new Warehouseman("test warehouseman");

        const observerOnUpdateSpy = chai.spy.on(warehouseman, "onUpdate");

        pack.addObserver(warehouseman);
        pack.updateState(Action.Packed, courier);

        expect(observerOnUpdateSpy).to.have.been.called();
    });
    it("should remove observer from pack", () => {
        const pack = new Pack(Uuid.v4(), 10);
        const courier = new Courier("test courier");
        const warehouseman = new Warehouseman("test warehouseman");

        const observerOnUpdateSpy = chai.spy.on(warehouseman, "onUpdate");

        pack.addObserver(warehouseman);
        pack.removeObserver(warehouseman);
        pack.updateState(Action.Packed, courier);

        expect(observerOnUpdateSpy).to.not.have.been.called();
    });
});
