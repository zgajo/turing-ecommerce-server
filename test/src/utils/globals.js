const moment = require('moment');

const formatDate = date => {
	return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const capitalize = s => {
	if (typeof s !== 'string') return '';
	if (s.includes('_')) {
		const word = s.split('');
		s = '';
		// making model names: product_category to ProductCategory
		for (let i = 0; i < word.length; i++) {
			if (word[i] === '_') {
				s;
			} else if (word[i - 1] === '_') {
				s += word[i].toUpperCase();
			} else if (i === s.length - 1) {
				s;
			} else {
				s += word[i];
			}
		}
	}
	return s.charAt(0).toUpperCase() + s.slice(1);
};

// Async function to remove try catch in functions
const asyncAction = promise => {
	return promise.then(data => [null, data]).catch(error => [error]);
};

module.exports = {
	asyncAction,
	capitalize,
	formatDate,
};
