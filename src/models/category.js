module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define('category', {
		category_id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		department_id: DataTypes.INTEGER,
		description: DataTypes.TEXT,
		name: DataTypes.STRING,
	});

	Category.associate = models => {
		// 1:m
		Category.belongsTo(models.Department, { as: 'Department', foreignKey: 'department_id' });
	};

	return Category;
};
