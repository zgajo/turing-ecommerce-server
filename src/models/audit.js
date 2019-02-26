module.exports = (sequelize, DataTypes) => {
	const Audit = sequelize.define('audit', {
		audit_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
		code: { allowNull: false, type: DataTypes.INTEGER },
		created_on: { allowNull: false, type: DataTypes.DATE },
		message: { allowNull: false, type: DataTypes.TEXT },
		order_id: { allowNull: false, type: DataTypes.INTEGER },
	});

	Audit.associate = models => {
		Audit.belongsTo(models.Orders, { as: 'AuditOrder', foreignKey: 'order_id' });
	};

	return Audit;
};
