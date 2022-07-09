import { Coupon } from '../src/coupon';
import { Item } from '../src/item';
import { Order } from '../src/order';

describe('Order', () => {
    const validCpf = '89936276060';
    const invalidCpf = '89936276061';
    const items = [
        new Item(1, 'Fridge', 2000),
        new Item(2, 'Computer', 3000),
        new Item(3, 'Ball', 10),
    ];

    it('should not allow to create order with invalid cpf', () => {
        expect(() => new Order(invalidCpf)).toThrow();
    });

    it('should create an empty order', () => {
        const order = new Order(validCpf); 
        expect(order.getTotal()).toBe(0);
    });

    it('should let create order with 3 items', () => {
        const quantities = [1, 2, 3];
        const order = new Order(validCpf);
        order.addItem(items[0], 1);
        order.addItem(items[1], 2);
        order.addItem(items[2], 3);

        const total = items
            .map(item => item.price)
            .reduce((acc, price, index) => acc + price * quantities[index], 0);

        expect(order.getTotal()).toBe(total);
    });
    
    it('should let create order with discount coupon', () => {
        const quantities = [1, 2, 3];
        const order = new Order(validCpf);
        order.addItem(items[0], 1);
        order.addItem(items[1], 2);
        order.addItem(items[2], 3);

        const coupon = new Coupon('20OFF', 20)
        order.addCoupon(coupon);
        const total = items
            .map(item => item.price)
            .reduce((acc, price, index) => acc + price * quantities[index], 0);
        const discountedTotal = total - (total * coupon.percentage) / 100;

        expect(order.getTotal()).toBe(discountedTotal);
    });
});