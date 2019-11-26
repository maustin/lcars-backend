module.exports = (sequelize, DataTypes) => {
	return sequelize.define('ranks', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING,
		species_id: DataTypes.INTEGER,
		user_generated: DataTypes.INTEGER
	}, { timestamps: false });
};