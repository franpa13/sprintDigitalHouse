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
            name : {
                type: DataTypes.STRING(100),
            },
            last_name : {
                type: DataTypes.STRING(100),
            },
            email : {
                type: DataTypes.STRING(150),
            },
            password : {
                type: DataTypes.STRING(255),
            },
            username : {
                type: DataTypes.STRING(255),
            }
    };

    const config = {
        tableName: "clients",
        timesTamps: false
    }

    let clients = sequelize.define( alias, cols, config )

    return clients;
}