module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define('category', {
		category_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		department_id: { allowNull: false, type: DataTypes.INTEGER },
		description: DataTypes.STRING(1000),
		name: { allowNull: false, type: DataTypes.STRING(100) },
	});

	Category.associate = models => {
		Category.belongsTo(models.Department, { as: 'Department', foreignKey: 'department_id' });
		Category.hasMany(models.ProductCategory, { as: 'CategoryProducts', foreignKey: 'category_id' });
	};

	return Category;
};
