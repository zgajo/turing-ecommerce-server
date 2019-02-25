module.exports = (sequelize, DataTypes) => {
	const Department = sequelize.define('department', {
		department_id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		description: DataTypes.TEXT,
		name: DataTypes.STRING,
	});

	Department.associate = models => {
		// 1:m
		Department.hasMany(models.Category, { as: 'Categories', foreignKey: 'department_id' });
	};

	return Department;
};
