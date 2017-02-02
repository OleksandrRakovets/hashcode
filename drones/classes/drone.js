module.exports = class Drone {

	constructor (maxWeight, startX, startY) {
		Object.assign(this,
		{
			maxWeight: maxWeight,
			x: startX,
			y: startY,
			carriedWeight: 0,
			inventory: {},
			turn: 0
		});
	}

	load (items, productCode, productWeight) {
		if (this.carriedWeight + items * productWeight > this.maxWeight) {
			throw [items, 'of ', productCode, '(', productWeight, ' units) are too heavy'].join();
		}

		// find the desired Warehouse

		let currentProductAmount = this.inventory.hasOwnProperty(productCode) ? this.inventory[productCode] : 0;

		this.inventory[productCode] = currentProductAmount + items;
		this.carriedWeight += items * productWeight;
	}

	deliver (items, productCode, productWeight) {
		if ( ! this.inventory[productCode] || this.inventory[productCode] < items) {
			throw ['Short of', items, 'of', productCode, 'have just', (this.inventory[productCode] || 0)].join();
		}

		this.inventory[productCode] -=  items;
		this.carriedWeight -= items * productWeight;
	}

	// unload () {}
	// wait () {}

	flyTo (x, y) {
		var distance = Math.ceil(Math.sqrt(Math.abs(this.x - x) + Math.abs(this.y - y)));

		this.x = x;
		this.y = y;

		return distance;
	}

};
