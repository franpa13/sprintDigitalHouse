/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} DataTypes 
 */


module.exports = (sequelize, DataTypes ) => {
    const alias = "Clients";
    const cols = {
            id : {
                type: DataTypes.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            
            email : {
                type: DataTypes.STRING(150),
            },
            password : {
                type: DataTypes.STRING(255),
            },
            username : {
                type: DataTypes.STRING(100),
            },
            image: {
                type: DataTypes.STRING(255),
            }
    };

    const config = {
        timestamps: false,
        tableName: "clients",
    }

    let clients = sequelize.define( alias, cols, config )

    return clients;
}