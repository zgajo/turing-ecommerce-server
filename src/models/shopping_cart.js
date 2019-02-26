module.exports = (sequelize, DataTypes) => {
	const ShoppingCart = sequelize.define('shopping_cart', {
		Attributes: { allowNull: false, field: 'attributes', type: DataTypes.STRING(1000) }, // attributes is reserved keyword in sequelize
		added_on: { allowNull: false, type: DataTypes.DATE },
		buy_now: { allowNull: false, defaultValue: true, type: DataTypes.BOOLEAN },
		cart_id: { allowNull: false, type: DataTypes.CHAR(32) },
		item_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		product_id: { allowNull: false, type: DataTypes.INTEGER },
		quantity: { allowNull: false, type: DataTypes.INTEGER },
	});

	ShoppingCart.associate = models => {
		ShoppingCart.belongsTo(models.ShoppingCart, { as: 'ShoppingCartCart', foreignKey: 'cart_id' });
	};

	return ShoppingCart;
};
