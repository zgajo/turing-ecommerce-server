module.exports = {
	attribute_values: async (_, __, { models }) => await models.AttributeValue.findAll(),
	attributes: async (_, __, { models }) => await models.Attribute.findAll(),
	categories: async (_, __, { models }) => await models.Category.findAll(),
	departments: async (_, __, { models }) => await models.Department.findAll(),
	products: async (_, __, { models }) => await models.Product.findAll(),
	shopping_carts: async (_, __, { models }) => await models.ShoppingCart.findAll(),
};
