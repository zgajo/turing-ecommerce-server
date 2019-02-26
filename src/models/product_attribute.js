module.exports = (sequelize, DataTypes) => {
	const ProductAttribute = sequelize.define('product_attribute', {
		attribute_value_id: { allowNull: false, primaryKey: true, type: DataTypes.INTEGER },
		product_id: { allowNull: false, primaryKey: true, type: DataTypes.INTEGER },
	});

	return ProductAttribute;
};
