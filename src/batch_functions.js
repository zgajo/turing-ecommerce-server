const Dataloader = require('dataloader');
const { groupBy } = require('lodash');
const { asyncAction } = require('./utils/globals');

const attributeValuesBatch = models =>
	new Dataloader(async attribute_ids => {
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
	});

module.exports = models => ({
	attributeValuesBatch: attributeValuesBatch(models),
});
