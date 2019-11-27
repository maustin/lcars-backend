module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_ship', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		character_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'characters',
				key: 'id'
			}
		},
		ship_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'ships',
				key: 'id'
			}
		},
		effective_date: DataTypes.STRING
	}, {
		timestamps: false,
		freezeTableName: true,
		underscored: true
	});
};