let io = require('../io/io');
let Drone = require('./classes/drone');

if ( ! process.argv[2]) throw ('No file to check');

let caseName = process.argv[2];
let data = io.read('./cases/' + caseName + '.in').map((str) => { return str.map(Number)});

let [rowCount, columnCount, droneCount, turnDeadline, maxWeight] = data[0];
let [productCount] = data[1];
let productWeight = data[2];

let [warehouseCount] = data[3];
let warehouses = [];
for (let i = 0; i < warehouseCount; i++) {
	let [x, y] = data[4 + i*2];

	warehouses.push({
		x: x,
		y: y,
		inventory: data[4 + i*2 + 1]
	});
}

let orderRow = 4 + warehouseCount * 2;
let [orderCount] = data[orderRow];
let orders = [];
for (let i = 0; i < orderCount; i++) {
	let [x, y] = data[orderRow + 1 + i*3];
	let [orderAmount] = data[orderRow + 1 + i*3 + 1];
	let orderProducts = {};
	data[orderRow + 1 + i*3 + 2].forEach((productCode) => {
		orderProducts[productCode] = (orderProducts[productCode] || 0) + 1;
	});

	orders.push({
		x: x,
		y: y,
		products: orderProducts
	});
}

let drones = [];
for (let i = 0; i < droneCount; i++) {
	drones.push(new Drone(maxWeight, warehouses[0].x, warehouses[0].y));
}

let result = io.read(caseName + '.out');
let [commandCount] = result[0];
let commands = result.slice(1);

console.log(commands);