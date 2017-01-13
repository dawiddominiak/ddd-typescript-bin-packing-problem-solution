import { DomainError } from "../../errors/DomainError";

export class CourierOverloadedError extends DomainError {
    constructor(message: string) {
        super(message);

        (Object as any).setPrototypeOf(this, CourierOverloadedError.prototype);
    }
}
