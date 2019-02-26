const { GraphQLScalarType } = require('graphql');
const { formatDate } = require('../../utils/globals');

module.exports = {
	Attribute: {
		attribute_values: async ({ attribute_id }, _, { models }) =>
			await models.AttributeValue.findAll({ where: { attribute_id } }),
	},
	AttributeValue: {
		attribute: async ({ attribute_id }, _, { models }) => await models.Attribute.findOne({ where: { attribute_id } }),
	},
	Category: {
		department: async category => await category.getDepartment(),
		products: async ({ category_id }, __, { models }) => {
			return await models.Product.findAll({
				include: [{ as: 'ProductCategories', model: models.ProductCategory, where: { category_id } }],
				required: true,
			});
		},
	},
	DateTime: new GraphQLScalarType({
		description: 'Date custom scalar type',
		name: 'Date',
		parseLiteral(ast) {
			return formatDate(ast.value);
		},
		parseValue(value) {
			return formatDate(value); // value from the client
		},
		serialize(value) {
			return formatDate(value); // value sent to the client
		},
	}),
	Department: {
		categories: async department => {
			return await department.getCategories();
		},
	},
	Product: {
		categories: async ({ product_id }, __, { models }) => {
			return await models.Category.findAll({
				include: [{ as: 'CategoryProducts', model: models.ProductCategory, where: { product_id } }],
				required: true,
			});
		},
		product_attribute_values: async ({ product_id }, __, { models }) => {
			return await models.AttributeValue.findAll({
				include: [{ as: 'ProductAttributes', model: models.ProductAttribute, where: { product_id } }],
				required: true,
			});
		},
	},
};
