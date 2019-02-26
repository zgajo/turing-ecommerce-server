module.exports = (sequelize, DataTypes) => {
	const Tax = sequelize.define('tax', {
		tax_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		tax_percentage: { allowNull: false, type: DataTypes.DECIMAL(10, 2) },
		tax_type: { allowNull: false, type: DataTypes.STRING(100) },
	});

	Tax.associate = models => {
		Tax.hasMany(models.Orders, { as: 'TaxOrders', foreignKey: 'tax_id' });
	};

	return Tax;
};
