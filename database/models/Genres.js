/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} DataTypes 
 */


module.exports = (sequelize, DataTypes ) => {
    const alias = "Genres";
    const cols = {
            id : {
                type: DataTypes.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name : {
                type: DataTypes.STRING(50),
            }
    };

    const config = {
        tableName: "genres",
        timestamps: false
    }

    let genres = sequelize.define( alias, cols, config )

    return genres;
}