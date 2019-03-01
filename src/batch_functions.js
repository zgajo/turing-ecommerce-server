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
	return attribute_ids.map(id => att_values_by_ids[id]);
};

const productAttributeValues = async (attribute_value_ids, models) => {
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
		throw new Error('Error fetching ProductAttributeValues');
	}

	const products_by_av_ids = groupBy(products, 'ProductAttributes.attribute_value_id');
	return attribute_value_ids.map(id => products_by_av_ids[id]);
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
	return category_ids.map(id => products_by_category_ids[id]);
};

module.exports = models => ({
	attributeValuesBatch: new Dataloader(attribute_ids => attributeValuesBatch(attribute_ids, models)),
	categoryProducts: new Dataloader(ids => categoryProducts(ids, models)),
	productAttributeValues: new Dataloader(attribute_value_ids => productAttributeValues(attribute_value_ids, models)),
});
