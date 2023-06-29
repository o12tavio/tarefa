const { DataTypes, Model } = require('sequelize')
const sequelize = require('../bd')
class Tipo extends Model{}
Usuario.init({
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    sequelize,
    modelName:'usurios'
}
)
sequelize.sync()
module.exports = Usuario