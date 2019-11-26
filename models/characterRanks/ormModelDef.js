module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_rank', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		character_id: DataTypes.INTEGER,
		rank_id: DataTypes.INTEGER,
		effective_date: DataTypes.STRING
	}, { timestamps: false });
};