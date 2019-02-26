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
			} else {
				s += word[i];
			}
		}
	}
	return s.charAt(0).toUpperCase() + s.slice(1);
};

module.exports = {
	capitalize,
};
