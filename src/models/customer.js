module.exports = (sequelize, DataTypes) => {
	const Customer = sequelize.define('customer', {
		address_1: DataTypes.STRING(100),
		address_2: DataTypes.STRING(100),
		city: DataTypes.STRING(100),
		country: DataTypes.STRING(100),
		credit_card: DataTypes.TEXT,
		customer_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		day_phone: DataTypes.STRING(100),
		email: { allowNull: false, type: DataTypes.STRING(100), unique: true },
		eve_phone: DataTypes.STRING(100),
		facebook_id: DataTypes.STRING,
		google_id: DataTypes.STRING, // id from google services
		method: {
			enum: ['local', 'google', 'facebook'],
			required: true,
			type: DataTypes.STRING(20),
		},
		mob_phone: DataTypes.STRING(100),
		name: { allowNull: false, type: DataTypes.STRING(50) },
		password: { type: DataTypes.STRING(50) },
		postal_code: DataTypes.STRING(100),
		region: DataTypes.STRING(100),
		shipping_region_id: { allowNull: false, defaultValue: '1', type: DataTypes.INTEGER },
	});

	Customer.associate = models => {
		Customer.hasMany(models.Orders, { as: 'CustomerOrders', foreignKey: 'customer_id' });
		Customer.hasMany(models.Review, { as: 'CustomerReviews', foreignKey: 'customer_id' });
		Customer.belongsTo(models.ShippingRegion, { as: 'CustomerShippingRegion', foreignKey: 'shipping_region_id' });
	};

	return Customer;
};
