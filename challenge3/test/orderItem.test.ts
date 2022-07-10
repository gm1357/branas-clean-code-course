import { Item } from '../src/item';
import { OrderItem } from '../src/orderItem';

describe('Order Item', () => {
    const item = new Item(1, 'test', 1, 2, {height: 1, length: 2, width: 3});

    it('should get the correct total value of the items ordered', () => {
        const price = 35.75;
        const quantity = 7;
        const orderItem = new OrderItem(item, price, quantity);

        expect(orderItem.getTotal()).toBe(price * quantity);
    });

    it('should not be able to create order item with quantity equal or less than zero', () => {
        expect(() => new OrderItem(item, 2, 0)).toThrow();
        expect(() => new OrderItem(item, 2, -1)).toThrow();
    });

    it('should calculate shipping fee of an order item with quantity bigger than 1', () => {
        const quantity = 3;
        const distance = 1000;
        const orderItem = new OrderItem(item, 10, quantity);
        const expectedShipping = quantity * item.calculateShipping(distance);

        expect(orderItem.calculateShipping(distance)).toBe(expectedShipping);
    });
});