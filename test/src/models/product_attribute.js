module.exports = (sequelize, DataTypes) => {
	const ProductAttribute = sequelize.define('product_attribute', {
		attribute_value_id: { allowNull: false, primaryKey: true, type: DataTypes.INTEGER },
		product_id: { allowNull: false, primaryKey: true, type: DataTypes.INTEGER },
	});

	ProductAttribute.associate = models => {
		ProductAttribute.belongsTo(models.Product, { as: 'ProductAttributeProducut', foreignKey: 'product_id' });
	};

	return ProductAttribute;
};
