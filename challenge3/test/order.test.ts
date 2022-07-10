import { Coupon } from '../src/coupon';
import { Dimensions } from '../src/dimensions';
import { Item } from '../src/item';
import { MINIMUM_SHIPPING_FEE, Order } from '../src/order';

describe('Order', () => {
    const validCpf = '89936276060';
    const invalidCpf = '89936276061';
    const quantities = [1, 2, 3];
    const dimensions: Dimensions = {
        height: 1,
        length: 1,
        width: 1
    };
    const items = [
        new Item(1, 'Fridge', 2000, 1, dimensions),
        new Item(2, 'Computer', 3000, 1, dimensions),
        new Item(3, 'Ball', 10, 1, dimensions),
    ];

    it('should not allow to create order with invalid cpf', () => {
        expect(() => new Order(invalidCpf)).toThrow();
    });

    it('should create an empty order', () => {
        const order = new Order(validCpf); 
        expect(order.getTotal()).toBe(0);
    });

    it('should create order with 3 items', () => {
        const order = new Order(validCpf);
        items.forEach((item, index) => {
            order.addItem(item, quantities[index]);
        });

        const total = items
            .map(item => item.price)
            .reduce((acc, price, index) => acc + price * quantities[index], 0);

        expect(order.getTotal()).toBe(total);
    });

    it('should not let add item with negative quantity', () => {
        const order = new Order(validCpf);

        expect(() => order.addItem(items[0], -1)).toThrow();
    });

    it('should not let add item more than once', () => {
        const order = new Order(validCpf);
        order.addItem(items[0], 1);

        expect(() => order.addItem(items[0], 1)).toThrow();
    });
    
    it('should create order with discount coupon', () => {
        const order = new Order(validCpf);
        items.forEach((item, index) => {
            order.addItem(item, quantities[index]);
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const coupon = new Coupon('20OFF', 20, tomorrow);

        order.addCoupon(coupon);
        const total = items
            .map(item => item.price)
            .reduce((acc, price, index) => acc + price * quantities[index], 0);
        const discountedTotal = total - (total * coupon.percentage) / 100;

        expect(order.getTotal()).toBe(discountedTotal);
    });
    
    it('should not let add expired coupon', () => {
        const order = new Order(validCpf);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const coupon = new Coupon('20OFF', 20, yesterday);

        expect(() => order.addCoupon(coupon)).toThrow();
    });

    it('should calculate the shipping fee of an order', () => {
        const distance = 1000;
        const order = new Order(validCpf, distance);

        items.forEach((item, index) => {
            order.addItem(item, quantities[index]);
        });

        const expectedShipping = items
            .map((item, index) => {
                return item.calculateShipping(distance) * quantities[index]
            })
            .reduce((acc, shipping) => acc + shipping, 0);

        expect(order.calculateShipping()).toBe(expectedShipping);
    });

    it('should return the minimum shipping fee when the calculated fee is smaller than it', () => {
        const distance = 9;
        const dimensions: Dimensions = {
            height: 1,
            length: 1,
            width: 1
        };
        const item = new Item(1, 'TV', 2000, 1, dimensions);
        const order = new Order(validCpf, distance);

        order.addItem(item, 1);

        expect(order.calculateShipping()).toBe(MINIMUM_SHIPPING_FEE);
    })
});