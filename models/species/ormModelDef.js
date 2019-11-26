module.exports = (sequelize, DataTypes) => {
	return sequelize.define('species', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING,
		origin: DataTypes.STRING,
		name_generator: DataTypes.STRING,
		user_generated: DataTypes.INTEGER
	}, { timestamps: false });
};