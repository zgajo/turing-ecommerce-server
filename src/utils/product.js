const { asyncAction } = require('./globals');

const fetchCategoryProducts = async ({ category_id, attribute_value_ids, offset, limit, models }) => {
	const include = [{ as: 'ProductCategories', model: models.ProductCategory, required: true, where: { category_id } }];

	if (attribute_value_ids && attribute_value_ids.length) {
		include.push({
			as: 'ProductAttributes',
			model: models.ProductAttribute,
			required: true,
			where: {
				attribute_value_id: {
					[models.op.in]: attribute_value_ids,
				},
			},
		});
	}

	const [error, products] = await asyncAction(
		models.Product.findAll({
			include,
			limit,
			offset,
			required: true,
		}),
	);

	if (error) {
		return [error];
	}

	return [null, products];
};

module.exports = {
	fetchCategoryProducts,
};
