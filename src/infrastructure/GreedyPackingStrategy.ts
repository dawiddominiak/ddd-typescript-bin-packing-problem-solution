import { Courier } from "../domain/entities/carrier/Courier";
import { CourierOverloadedError } from "../domain/entities/carrier/errors/CourierOverloadedError";
import { Pack } from "../domain/entities/pack/Pack";
import { IPackingStrategy } from "../domain/service/IPackingStrategy";

export class GreedyPackingStrategy implements IPackingStrategy {
    /**
     * @inheritdoc
     */
    public pack(packs: Pack[], courierGenerator: any) {
        this.sortPacksByWeightDesc(packs);

        const neededCouriers: Courier[] = [
            courierGenerator.next().value,
        ];

        packs.forEach((pack) => {
            let loaded = false;
            this.sortCouriersByLoadDesc(neededCouriers);

            for (const courier of neededCouriers) {
                if (this.tryLoadPack(courier, pack)) {
                    loaded = true;
                    break;
                }
            }

            if (!loaded) {
                const newCourier: Courier = courierGenerator.next().value;
                neededCouriers.push(newCourier);
                this.tryLoadPack(newCourier, pack);
            }
        });
    }

    private tryLoadPack(courier: Courier, pack: Pack) {
        try {
            courier.loadPack(pack);
            return true;
        } catch (error) {
            if (!(error instanceof CourierOverloadedError)) {
                throw error;
            }

            return false;
        }
    }

    private sortCouriersByLoadDesc(couriers: Courier[]) {
        couriers.sort((courierA, courierB) => {
            return courierB.getLoadWeight() - courierA.getLoadWeight();
        });
    }

    private sortPacksByWeightDesc(packs: Pack[]) {
        packs.sort((packA, packB) => {
            return packB.getWeight() - packA.getWeight();
        });
    }
}
