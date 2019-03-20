module.exports = (sequelize, DataTypes) => {
	const Review = sequelize.define('review', {
		created_on: { allowNull: false, type: DataTypes.DATE },
		customer_id: { allowNull: false, type: DataTypes.INTEGER },
		product_id: { allowNull: false, type: DataTypes.INTEGER },
		rating: { allowNull: false, type: DataTypes.SMALLINT },
		review: { allowNull: false, type: DataTypes.TEXT },
		review_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
	});

	Review.associate = models => {
		Review.belongsTo(models.Customer, { as: 'ReviewCustomer', foreignKey: 'customer_id' });
		Review.belongsTo(models.Product, { as: 'ReviewProduct', foreignKey: 'product_id' });
	};

	return Review;
};
