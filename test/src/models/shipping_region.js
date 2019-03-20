module.exports = (sequelize, DataTypes) => {
	const ShippingRegion = sequelize.define('shipping_region', {
		shipping_region: { allowNull: false, type: DataTypes.STRING(100) },
		shipping_region_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
	});

	ShippingRegion.associate = models => {
		ShippingRegion.hasMany(models.Customer, { as: 'ShippingRegionCustomers', foreignKey: 'shipping_region_id' });
		ShippingRegion.hasMany(models.Shipping, { as: 'ShippingRegionShipments', foreignKey: 'shipping_region_id' });
	};

	return ShippingRegion;
};
