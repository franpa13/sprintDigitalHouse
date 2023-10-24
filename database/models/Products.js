
/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} DataTypes 
 */


module.exports = (sequelize, DataTypes ) => {
    const alias = "Products";
    const cols = {
            id : {
                type: DataTypes.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            title : {
                type: DataTypes.STRING(255),
            },
            editorial : {
                type: DataTypes.STRING(255),
            },
            price : {
                type: DataTypes.INTEGER(11).UNSIGNED,
            },
            stock : {
                type: DataTypes.INTEGER(11).UNSIGNED,
            },
            description : {
                type: DataTypes.STRING(255),
            },
            image : {
                type: DataTypes.STRING(255),
            },
            language : {
                type: DataTypes.STRING(50),
            },
            format : {
                type: DataTypes.STRING(25),
            },
            calification : {
                type: DataTypes.INTEGER(11).UNSIGNED
            },
            autor : {
                type: DataTypes.STRING(150),
            }
    };

    const config = {
        tableName: "products",
        timesTamps: false
    }

    let Products = sequelize.define( alias, cols, config )

    return Products;
}