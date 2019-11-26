module.exports = (sequelize, DataTypes) => {
	return sequelize.define('characters', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING,
		species_id: DataTypes.INTEGER,
		gender: DataTypes.STRING,
		dob: DataTypes.STRING,
		actor: DataTypes.STRING,
		image: DataTypes.STRING,
		status: DataTypes.STRING,
		user_generated: DataTypes.INTEGER
	}, { timestamps: false });
};