import { UpdateEvent } from "../entities/common/UpdateEvent";

export interface IObserver {
    onUpdate(event: UpdateEvent): void;
}
