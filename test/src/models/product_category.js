module.exports = (sequelize, DataTypes) => {
	const ProductCategory = sequelize.define('product_category', {
		category_id: { allowNull: false, primaryKey: true, type: DataTypes.INTEGER },
		product_id: { allowNull: false, primaryKey: true, type: DataTypes.INTEGER },
	});

	ProductCategory.associate = models => {
		ProductCategory.hasMany(models.Category, { as: 'ProductCategories', foreignKey: 'category_id' });
	};

	return ProductCategory;
};
