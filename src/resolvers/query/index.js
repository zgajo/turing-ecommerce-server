const { asyncAction } = require('../../utils/globals');
const { fetchCategoryProducts } = require('../../utils/product');

module.exports = {
	attribute_values: async (_, __, { models }) => await models.AttributeValue.findAll(),
	attributes: async (_, __, { models }) => await models.Attribute.findAll(),
	categories: async (_, __, { models }) => await models.Category.findAll(),
	category_products: async (_, { where: { category_id, attribute_value_ids }, limit, offset }, { client, models }) => {
		const [err, data] = await asyncAction(client.getAsync(`category_${category_id}_products`));

		if (err) {
			throw new Error('Redis error');
		}

		if (data) {
			const products = JSON.parse(data);

			return products;
		} else {
			const [err, products] = await fetchCategoryProducts({
				attribute_value_ids,
				category_id,
				limit,
				models,
				offset,
			});

			if (err) {
				throw new Error('Redis error');
			}

			client.set(`category_${category_id}_products`, JSON.stringify(products));

			return products;
		}
	},
	customers: async (_, __, { models }) => await models.Customer.findAll(),
	departments: async (_, __, { models }) => await models.Department.findAll(),
	orders: async (_, __, { models }) => await models.Orders.findAll(),
	products: async (_, args, { models }) => await models.Product.findAll({ ...args }),
	shipping_regions: async (_, __, { models }) => await models.ShippingRegion.findAll(),
	shopping_carts: async (_, __, { models }) => await models.ShoppingCart.findAll(),
};
