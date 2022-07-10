import { Coupon } from './coupon';
import { Cpf } from './cpf';
import { Item } from './item';
import { OrderItem } from './orderItem';

export const MINIMUM_SHIPPING_FEE = 10;

export class Order {
    private cpf: Cpf;
    private items: OrderItem[] = [];
    private coupon?: Coupon;

    constructor(cpf: string, private distance = 1000) {
        this.cpf = new Cpf(cpf);
    }

    addItem(item: Item, quantity: number) {
        if (this.items.some(itemInOrder => itemInOrder.item.id === item.id)) {
            throw new Error('Can\'t add item more than once!');
        }

        this.items.push(new OrderItem(item, item.price, quantity));
    }

    addCoupon(coupon: Coupon) {
        if (coupon.expiryDate < new Date()) {
            throw new Error('Can\'t apply expired coupon!');
        }
        this.coupon = coupon;
    }

    getTotal() {
        const total = this.items
            .map(item => item.getTotal())
            .reduce((acc, price) => acc + price, 0);
        return this.coupon ? total - this.coupon.getDiscount(total) : total;
    }

    calculateShipping() {
        const shipping = this.items
            .map(item => item.calculateShipping(this.distance))
            .reduce((acc, shipping) => acc + shipping, 0);
        return shipping < MINIMUM_SHIPPING_FEE ? MINIMUM_SHIPPING_FEE : shipping;
    }
}