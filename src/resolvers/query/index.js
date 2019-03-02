const { asyncAction } = require('../../utils/globals');

module.exports = {
	attribute_values: async (_, __, { models }) => await models.AttributeValue.findAll(),
	attributes: async (_, __, { models }) => await models.Attribute.findAll(),
	categories: async (_, __, { models }) => await models.Category.findAll(),
	category_products: async (_, { where: { category_id, attribute_value_ids }, limit, offset }, { models }) => {
		const include = [
			{ as: 'ProductCategories', model: models.ProductCategory, required: true, where: { category_id } },
		];

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
			throw new Error('Error: Fetching category products');
		}

		return products;
	},
	customers: async (_, __, { models }) => await models.Customer.findAll(),
	departments: async (_, __, { models }) => await models.Department.findAll(),
	orders: async (_, __, { models }) => await models.Orders.findAll(),
	products: async (_, args, { models }) => await models.Product.findAll({ ...args }),
	shipping_regions: async (_, __, { models }) => await models.ShippingRegion.findAll(),
	shopping_carts: async (_, __, { models }) => await models.ShoppingCart.findAll(),
};
