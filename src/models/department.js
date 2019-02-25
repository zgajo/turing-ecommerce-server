module.exports = (sequelize, DataTypes) => {
	const Department = sequelize.define('department', {
		department_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		description: DataTypes.STRING(1000),
		name: { allowNull: false, type: DataTypes.STRING(100) },
	});

	Department.associate = models => {
		// 1:m
		Department.hasMany(models.Category, { as: 'Categories', foreignKey: 'department_id' });
	};

	return Department;
};
