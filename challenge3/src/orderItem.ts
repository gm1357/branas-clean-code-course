import { Item } from './item';

export class OrderItem {
    constructor(
        readonly item: Item,
        readonly price: number,
        readonly quantity: number,
    ) {
        if (quantity <= 0) {
            throw new Error('Order item must have quantity greater than zero!');
        }
    }

    getTotal() {
        return this.price * this.quantity;
    }

    calculateShipping(distance: number) {
        return this.item.calculateShipping(distance) * this.quantity;
    }
}