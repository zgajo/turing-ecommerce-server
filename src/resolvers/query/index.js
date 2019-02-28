module.exports = {
	attribute_values: async (_, __, { models }) => await models.AttributeValue.findAll(),
	attributes: async (_, __, { models }) => await models.Attribute.findAll(),
	categories: async (_, __, { models }) => await models.Category.findAll(),
	category_products: async (_, { where, limit, offset }, { models }) => {
		return await models.Product.findAll({
			include: [{ as: 'ProductCategories', model: models.ProductCategory, where }],
			limit,
			offset,
			required: true,
		});
	},
	customers: async (_, __, { models }) => await models.Customer.findAll(),
	departments: async (_, __, { models }) => await models.Department.findAll(),
	orders: async (_, __, { models }) => await models.Orders.findAll(),
	products: async (_, args, { models }) => await models.Product.findAll({ ...args }),
	shipping_regions: async (_, __, { models }) => await models.ShippingRegion.findAll(),
	shopping_carts: async (_, __, { models }) => await models.ShoppingCart.findAll(),
};
