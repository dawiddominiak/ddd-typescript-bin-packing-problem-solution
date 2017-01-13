import * as chai from "chai";
import * as Uuid from "uuid";
import { Truck } from "../../../../src/domain/entities/carrier/Truck";
import { Pack } from "../../../../src/domain/entities/pack/Pack";

const expect = chai.expect;

describe("Truck", () => {
    it("should pack the truck with packages", () => {
        const truck = new Truck("test truck");
        const packs = [new Pack(Uuid.v4(), 10)];
        truck.load(packs);
        expect(truck.showLoad()).to.equal(packs);
    });
    it("should unload the truck", () => {
        const truck = new Truck("test truck");
        const packs = [new Pack(Uuid.v4(), 10)];
        truck.load(packs);
        const unloadedPacks = truck.unload();
        expect(truck.showLoad()).to.deep.equal([]);
        expect(unloadedPacks).to.equal(packs);
    });
});;
