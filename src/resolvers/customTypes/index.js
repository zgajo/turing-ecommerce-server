module.exports = {
	Category: {
		department: async category => await category.getDepartment(),
		products: async ({ category_id }, __, { models }) => {
			return await models.Product.findAll({
				include: [{ as: 'ProductCategories', model: models.ProductCategory, where: { category_id } }],
				required: true,
			});
		},
	},
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
	},
};
