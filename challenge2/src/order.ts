import { Coupon } from './coupon';
import { Cpf } from './cpf';
import { Item } from './item';
import { OrderItem } from './orderItem';

export class Order {
    private cpf: Cpf;
    private items: OrderItem[] = [];
    private coupon?: Coupon;

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
    }

    addItem(item: Item, quantity: number) {
        this.items.push(new OrderItem(item.id, item.price, quantity));
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }

    getTotal() {
        const total = this.items
            .map(item => item.getTotal())
            .reduce((acc, price) => acc + price, 0);
        return this.coupon ? total - this.coupon.getDiscount(total) : total;
    }
}