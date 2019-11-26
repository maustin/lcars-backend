module.exports = (sequelize, DataTypes) => {
	return sequelize.define('characters', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING,
		species_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'species',
				key: 'id'
			}
		},
		gender: DataTypes.STRING,
		dob: DataTypes.STRING,
		actor: DataTypes.STRING,
		image: DataTypes.STRING,
		status: DataTypes.STRING,
		user_generated: DataTypes.INTEGER
	}, {
		timestamps: false,
		freezeTableName: true,
		underscored: true
	});
};