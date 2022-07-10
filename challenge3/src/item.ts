import { Dimensions } from './dimensions';

const M3_CONVERTER = 1_000_000;

export class Item {
    constructor(
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly weight: number,
        readonly dimensions: Dimensions,
    ) {
        if (dimensions.height <= 0 ||
            dimensions.length <= 0 ||
            dimensions.width <= 0
        ) {
            throw new Error('Can\'t create item with negative dimensions!');
        }
        
        if (weight <= 0) {
            throw new Error('Can\'t create item with negative weight!');
        }
    }

    getM3Volume() {
        return (this.dimensions.height * this.dimensions.length * this.dimensions.width) / M3_CONVERTER;
    }

    getDensity() {
        return this.weight / this.getM3Volume();
    }

    calculateShipping(distance: number) {
        return distance * this.getM3Volume() * this.getDensity();
    }
}