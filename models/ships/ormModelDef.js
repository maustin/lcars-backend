module.exports = (sequelize, DataTypes) => {
	return sequelize.define('ships', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING,
		class: DataTypes.STRING,
		registry: DataTypes.STRING,
		status: DataTypes.STRING,
		image: DataTypes.STRING,
		user_generated: DataTypes.INTEGER
	}, { timestamps: false });
};