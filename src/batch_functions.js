const Dataloader = require('dataloader');
const { groupBy } = require('lodash');
const { asyncAction } = require('./utils/globals');

const attributeValuesBatch = async (attribute_ids, models) => {
	const [err, avs] = await asyncAction(
		models.AttributeValue.findAll({
			where: {
				attribute_id: {
					[models.op.in]: attribute_ids,
				},
			},
		}),
	);

	if (err) {
		throw new Error('Error fetching AttributeValue');
	}

	const att_values_by_ids = groupBy(avs, 'attribute_id');
	return attribute_ids.map(id => att_values_by_ids[id] || []);
};

const attributeValuesOfProduct = async (attribute_value_ids, models) => {
	const [err, products] = await asyncAction(
		models.Product.findAll({
			include: [
				{
					as: 'ProductAttributes',
					model: models.ProductAttribute,
					where: {
						attribute_value_id: {
							[models.op.in]: attribute_value_ids,
						},
					},
				},
			],
			raw: true,
			required: true,
		}),
	);

	if (err) {
		throw new Error('Error fetching attributeValuesOfProduct');
	}

	const products_by_av_ids = groupBy(products, 'ProductAttributes.attribute_value_id');
	return attribute_value_ids.map(id => products_by_av_ids[id] || []);
};

const categoryProducts = async (category_ids, models) => {
	const [err, products] = await asyncAction(
		models.Product.findAll({
			include: [
				{
					as: 'ProductCategories',
					model: models.ProductCategory,
					where: { category_id: { [models.op.in]: category_ids } },
				},
			],
			raw: true,
			required: true,
		}),
	);

	if (err) {
		throw new Error('Error fetching categoryProducts');
	}

	const products_by_category_ids = groupBy(products, 'ProductCategories.category_id');
	return category_ids.map(id => products_by_category_ids[id] || []);
};

const departmentCategories = async (department_ids, models) => {
	const [err, categpries] = await asyncAction(
		models.Category.findAll({
			where: {
				department_id: {
					[models.op.in]: department_ids,
				},
			},
		}),
	);

	if (err) {
		throw new Error('Error fetching departmentCategories');
	}

	const department_categories_by_ids = groupBy(categpries, 'department_id');
	return department_ids.map(id => department_categories_by_ids[id] || []);
};

const productCategories = async (product_ids, models) => {
	const [err, categories] = await asyncAction(
		models.Category.findAll({
			include: [
				{
					as: 'CategoryProducts',
					model: models.ProductCategory,
					where: { product_id: { [models.op.in]: product_ids } },
				},
			],

			raw: true,
			required: true,
		}),
	);

	if (err) {
		throw new Error('Error fetching productCategories');
	}

	const categories_by_product_ids = groupBy(categories, 'CategoryProducts.product_id');
	return product_ids.map(id => categories_by_product_ids[id] || []);
};

const productOrderDetails = async (product_ids, models) => {
	const [err, order_details] = await asyncAction(
		models.OrderDetail.findAll({ where: { product_id: { [models.op.in]: product_ids } } }),
	);

	if (err) {
		throw new Error('Error fetching productOrderDetails');
	}

	const order_details_by_product_ids = groupBy(order_details, 'product_id');
	return product_ids.map(id => order_details_by_product_ids[id] || []);
};

const productAttributeValues = async (product_ids, models) => {
	const [err, attribute_values] = await asyncAction(
		models.AttributeValue.findAll({
			include: [
				{
					as: 'AttributeValueProductAttributes',
					attributes: [],
					model: models.ProductAttribute,
					where: { product_id: { [models.op.in]: product_ids } },
				},
			],
			raw: true,
			required: true,
		}),
	);

	if (err) {
		throw new Error('Error fetching productAttributeValues');
	}

	const attribute_values_by_product_ids = groupBy(attribute_values, 'AttributeValueProductAttributes.product_id');
	return product_ids.map(id => attribute_values_by_product_ids[id] || []);
};

const productReviews = async (product_ids, models) => {
	const [err, reviews] = await asyncAction(
		models.Review.findAll({ where: { product_id: { [models.op.in]: product_ids } } }),
	);

	if (err) {
		throw new Error('Error fetching productReviews');
	}

	const reviews_by_product_ids = groupBy(reviews, 'product_id');
	return product_ids.map(id => reviews_by_product_ids[id] || []);
};

module.exports = models => ({
	attributeValuesBatch: new Dataloader(ids => attributeValuesBatch(ids, models)),
	attributeValuesOfProduct: new Dataloader(ids => attributeValuesOfProduct(ids, models)),
	categoryProducts: new Dataloader(ids => categoryProducts(ids, models)),
	departmentCategories: new Dataloader(ids => departmentCategories(ids, models)),
	productAttributeValues: new Dataloader(ids => productAttributeValues(ids, models)),
	productCategories: new Dataloader(ids => productCategories(ids, models)),
	productOrderDetails: new Dataloader(ids => productOrderDetails(ids, models)),
	productReviews: new Dataloader(ids => productReviews(ids, models)),
});
