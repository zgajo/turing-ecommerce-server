const { GraphQLScalarType } = require('graphql');
const { formatDate } = require('../../utils/globals');

// TODO: use Dataloader for batching
module.exports = {
	Attribute: {
		attribute_values: ({ attribute_id }, _, { batchFunctions }) =>
			batchFunctions.attributeValuesBatch.load(attribute_id),
	},
	AttributeValue: {
		attribute: async ({ attribute_id }, _, { models }) => await models.Attribute.findOne({ where: { attribute_id } }),
		product_attribute_values: ({ attribute_value_id }, _, { batchFunctions }) =>
			batchFunctions.attributeValuesOfProduct.load(attribute_value_id),
	},
	Audit: {
		order: async ({ order_id }, _, { models }) => await models.Orders.findOne({ where: { order_id } }),
	},
	// Need to add __resolveType for interface to remove warning
	AuthPayload: {
		__resolveType() {},
	},
	Category: {
		department: async ({ department_id }, _, { models }) =>
			await models.Department.findOne({ where: { department_id } }),
		products: ({ category_id }, __, { batchFunctions }) => batchFunctions.categoryProducts.load(category_id),
	},
	Customer: {
		orders: async ({ customer_id }, __, { models }) =>
			await models.Orders.findAll({
				where: { customer_id },
			}),
		reviews: async ({ customer_id }, __, { models }) =>
			await models.Review.findAll({
				where: { customer_id },
			}),
		shipping_region: async ({ shipping_region_id }, __, { models }) =>
			await models.ShippingRegion.findAll({
				where: { shipping_region_id },
			}),
	},
	DateTime: new GraphQLScalarType({
		description: 'Date custom scalar type',
		name: 'DateTime',
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
		categories: ({ department_id }, _, { batchFunctions }) => batchFunctions.departmentCategories.load(department_id),
	},
	Order: {
		audits: async ({ order_id }, _, { models }) => await models.Audit.findAll({ where: { order_id } }),
		order_details: async ({ order_id }, _, { models }) => await models.OrderDetail.findAll({ where: { order_id } }),
	},
	OrderDetail: {
		order: async ({ order_id }, _, { models }) => await models.Audit.findOne({ where: { order_id } }),
		product: async ({ product_id }, _, { models }) => await models.OrderDetail.findOne({ where: { product_id } }),
	},
	Product: {
		categories: ({ product_id }, __, { batchFunctions }) => batchFunctions.productCategories.load(product_id),
		order_details: ({ product_id }, __, { batchFunctions }) => batchFunctions.productOrderDetails.load(product_id),
		product_attribute_values: ({ product_id }, __, { batchFunctions }) =>
			batchFunctions.productAttributeValues.load(product_id),
		reviews: ({ product_id }, __, { batchFunctions }) => batchFunctions.productReviews.load(product_id),
	},
	Review: {
		customer: async ({ customer_id }, __, { models }) => await models.Customer.findOne({ where: { customer_id } }),
		product: async ({ product_id }, __, { models }) => await models.Product.findOne({ where: { product_id } }),
	},
	Shipping: {
		shipping_region: async ({ shipping_region_id }, __, { models }) =>
			await models.ShippingRegion.findAll({
				where: { shipping_region_id },
			}),
	},
	ShippingRegion: {
		customers: async ({ shipping_region_id }, _, { models }) =>
			await models.Customer.findAll({ where: { shipping_region_id } }),
		shippings: async ({ shipping_region_id }, _, { models }) =>
			await models.Shipping.findAll({ where: { shipping_region_id } }),
	},
};
