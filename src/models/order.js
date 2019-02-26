module.exports = (sequelize, DataTypes) => {
	const Orders = sequelize.define('orders', {
		auth_code: DataTypes.STRING(50),
		comments: DataTypes.STRING(255),
		created_on: { allowNull: false, type: DataTypes.DATE },
		customer_id: DataTypes.INTEGER,
		order_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		reference: DataTypes.STRING(50),
		shipped_on: DataTypes.DATE,
		shipping_id: DataTypes.INTEGER,
		status: { allowNull: false, defaultValue: '0', type: DataTypes.INTEGER },
		tax_id: DataTypes.INTEGER,
		total_amount: { allowNull: false, defaultValue: '0.00', type: DataTypes.DECIMAL(10, 2) },
	});

	Orders.associate = models => {
		Orders.belongsTo(models.Customer, { as: 'CustomerOrder', foreignKey: 'customer_id' });
		Orders.belongsTo(models.Shipping, { as: 'ShippingOrder', foreignKey: 'shipping_id' });
		Orders.belongsTo(models.Tax, { as: 'ShippingTax', foreignKey: 'tax_id' });
		Orders.hasMany(models.OrderDetail, { as: 'OrderDetails', foreignKey: 'order_id' });
		Orders.hasMany(models.Audit, { as: 'OrderAudits', foreignKey: 'audit_id' });
	};

	return Orders;
};
