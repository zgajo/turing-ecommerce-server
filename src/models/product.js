module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('product', {
		description: { allowNull: false, type: DataTypes.STRING(1000) },
		discounted_price: { allowNull: false, defaultValue: '0.00', type: DataTypes.DECIMAL(10, 2) },
		display: { allowNull: false, defaultValue: '0', type: DataTypes.SMALLINT(6) },
		image: DataTypes.STRING(150),
		image_2: DataTypes.STRING(150),
		name: { allowNull: false, type: DataTypes.STRING(100) },
		price: { allowNull: false, type: DataTypes.DECIMAL(10, 2) },
		product_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		thumbnail: DataTypes.STRING(150),
	});

	Product.associate = models => {
		Product.hasMany(models.ProductCategory, { as: 'ProductCategories', foreignKey: 'product_id' });
	};

	return Product;
};
