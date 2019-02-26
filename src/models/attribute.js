module.exports = (sequelize, DataTypes) => {
	const Attribute = sequelize.define('attribute', {
		attribute_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		name: { allowNull: false, type: DataTypes.STRING(100) },
	});

	return Attribute;
};
