import * as chai from "chai";
import * as Uuid from "uuid";
import { Courier } from "../../../src/domain/entities/carrier/Courier";
import { Pack } from "../../../src/domain/entities/pack/Pack";
import { GreedyPackingStrategy } from "../../../src/domain/service/GreedyPackingStrategy";

const expect = chai.expect;

describe("GreedyPackingStrategy", () => {
    it("should pack packages to couriers following the greedy rules", () => {
        const courier1 = new Courier("1st courier");
        const courier2 = new Courier("2nd courier");

        function* generator() {
            yield courier1;
            yield courier2;
        }

        const packingStrategy = new GreedyPackingStrategy();
        const packs = [
            new Pack(Uuid.v4(), 150),
            new Pack(Uuid.v4(), 60),
            new Pack(Uuid.v4(), 40),
            new Pack(Uuid.v4(), 20),
            new Pack(Uuid.v4(), 10),
        ];

        const courierGenerator = generator();

        packingStrategy.pack(packs, courierGenerator);

        expect(courier1.showLoad()).deep.equal([
            packs[0],
            packs[2],
            packs[4],
        ]);
        expect(courier2.showLoad()).deep.equal([
            packs[1],
            packs[3],
        ]);
    });
});
