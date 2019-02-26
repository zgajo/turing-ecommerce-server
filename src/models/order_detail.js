module.exports = (sequelize, DataTypes) => {
	const OrderDetail = sequelize.define('order_detail', {
		Attributes: { allowNull: false, field: 'attributes', type: DataTypes.STRING(1000) }, // attributes is reserved keyword in sequelize
		item_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		order_id: { allowNull: false, type: DataTypes.INTEGER },
		product_id: { allowNull: false, type: DataTypes.INTEGER },
		product_name: { allowNull: false, type: DataTypes.STRING(1000) }, // attributes is reserved keyword in sequelize
		quantity: { allowNull: false, type: DataTypes.INTEGER },
		unit_cost: { allowNull: false, type: DataTypes.DECIMAL(10, 2) },
	});

	OrderDetail.associate = models => {
		OrderDetail.belongsTo(models.Orders, { as: 'OrderDetailOrder', foreignKey: 'order_id' });
	};

	return OrderDetail;
};
