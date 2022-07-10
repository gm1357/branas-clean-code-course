import { Dimensions } from '../src/dimensions';
import { Item } from '../src/item';

const M3_CONVERTER = 1_000_000;

describe('Item', () => {
    it('should create a normal item', () => {
        const dimensions: Dimensions = {
            height: 1,
            length: 1,
            width: 1
        };
        const item = new Item(1, 'Keyboard', 9.99, 1, dimensions);
        expect(item).toBeDefined();
    });

    it('should not create item with any negative dimensions', () => {
        let dimensions: Dimensions = {
            height: -1,
            length: 1,
            width: 1
        };
        expect(() => new Item(1, 'Mouse', 3, 1, dimensions)).toThrow();
        dimensions.height = 1;
        dimensions.length = -1;
        expect(() => new Item(1, 'Mouse', 3, 1, dimensions)).toThrow();
        dimensions.length = 1;
        dimensions.width = -1;
        expect(() => new Item(1, 'Mouse', 3, 1, dimensions)).toThrow();
    });

    it('should not create item with weight equal or less than zero', () => {
        const dimensions: Dimensions = {
            height: 1,
            length: 1,
            width: 1
        };
        expect(() => new Item(1, 'Table', 0.99, 0, dimensions)).toThrow();
        expect(() => new Item(1, 'Table', 0.99, -1, dimensions)).toThrow();
    });

    it('should get the volume of an item', () => {
        const dimensions: Dimensions = {
            height: 20,
            length: 15,
            width: 10
        };
        const item = new Item(1, 'Box', 3, 1, dimensions);
        const expectedVolume = (dimensions.height * dimensions.length * dimensions.width) / M3_CONVERTER;

        expect(item.getM3Volume()).toBe(expectedVolume);
    });

    it('should get the density of an item', () => {
        const dimensions: Dimensions = {
            height: 20,
            length: 15,
            width: 10
        };
        const weight = 5;
        const item = new Item(1, 'Box', 3, weight, dimensions);
        const volume = (dimensions.height * dimensions.length * dimensions.width) / M3_CONVERTER;
        const expectedDensity = weight / volume;

        expect(item.getDensity()).toBe(expectedDensity);
    });

    it('should get the shipping fee of an item', () => {
        const distance = 1000;
        const dimensions: Dimensions = {
            height: 20,
            length: 15,
            width: 10
        };
        const weight = 5;
        const item = new Item(1, 'Box', 3, weight, dimensions);
        const volume = (dimensions.height * dimensions.length * dimensions.width) / M3_CONVERTER;
        const density = weight / volume;
        const expectedShipping = distance * volume * density;

        expect(item.calculateShipping(distance)).toBe(expectedShipping);
    });
});