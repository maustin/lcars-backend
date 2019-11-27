module.exports = (sequelize, DataTypes) => {
	return sequelize.define('ranks', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING,
		species_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'species',
				key: 'id'
			}
		},
		user_generated: DataTypes.INTEGER
	}, {
		timestamps: false,
		freezeTableName: true,
		underscored: true
	});
};