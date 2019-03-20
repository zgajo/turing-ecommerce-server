module.exports = (sequelize, DataTypes) => {
	const Shipping = sequelize.define('shipping', {
		shipping_cost: { allowNull: false, type: DataTypes.DECIMAL(10, 2) },
		shipping_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		shipping_region_id: { allowNull: false, type: DataTypes.INTEGER },
		shipping_type: { allowNull: false, type: DataTypes.STRING(100) },
	});

	Shipping.associate = models => {
		Shipping.hasMany(models.Orders, { as: 'ShippingOrders', foreignKey: 'shipping_id' });
		Shipping.belongsTo(models.ShippingRegion, { as: 'ShippingShippingRegion', foreignKey: 'shipping_region_id' });
	};

	return Shipping;
};
