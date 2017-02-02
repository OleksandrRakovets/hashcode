let fs = require('fs');

module.exports = {

	read: function (fileName, callback) {
		let data = fs.readFileSync(fileName, 'utf8');

		return data.split('\n').map((str) => {
			return str.split(' ');
		});
	},

	write: function (fileName, data) {
		let formattedResult = data.map((str) => {
				return str.join(' ');
			}).join('\n');

		fs.writeFile(fileName, formattedResult, (err) => {
			if (err) throw err;

			console.log('Printed output to', fileName);
		});
	}
};

