const {sequelize, DataType, Model } = require('sequelize')
const sequelize = require('../bd')
const tarefa = require('../controllers/rotas/tarefa')
const usuario = new require('./usuario')
const tipo = new require('./tipo')
class Tarefas extends Model{}
Tarefas.init({
    descricao: {
        type: DataType.STRiNG,
        allowNull: false
    },
    data_cadastro: {
        type: sequelize.DATEONLY,
        defaultValue: DataType.NOW
    },
    data_conclusao: {
        type: sequelize.DATEONLY,
        allowNull: true
    },
},{
    sequelize,
    moduleName: 'Tarefas'
}
)

tipo.hasOne(tarefa)
Tarefa.belongsTo(tipo)

usuario.hasMany(Tarefa)
Tarefa.belongsTo(usuario)

sequelize.sync()
module.exports = Tarefa


