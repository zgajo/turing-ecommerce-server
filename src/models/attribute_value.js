module.exports = (sequelize, DataTypes) => {
	const AttributeValue = sequelize.define('attribute_value', {
		attribute_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		attribute_value_id: { allowNull: false, type: DataTypes.INTEGER },
		value: { allowNull: false, type: DataTypes.STRING(100) },
	});

	AttributeValue.associate = models => {
		AttributeValue.belongsTo(models.Attribute, { as: 'Attribute', foreignKey: 'attribute_id' });
		AttributeValue.hasMany(models.ProductAttribute, { as: 'ProductAttributes', foreignKey: 'attribute_value_id' });
	};

	return AttributeValue;
};
