export class Coupon {
    constructor(
        readonly code: string,
        readonly percentage: number,
        readonly expiryDate: Date,
    ) {}

    getDiscount(total: number) {
        return (total * this.percentage) / 100;
    }
}