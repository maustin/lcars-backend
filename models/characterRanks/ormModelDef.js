module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_rank', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		character_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'characters',
				key: 'id'
			}
		},
		rank_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'ranks',
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