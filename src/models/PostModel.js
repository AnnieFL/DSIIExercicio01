const { sequelize } = require('../config/connection-db');
const { Model, DataTypes } = require('sequelize');

class PostModel extends Model {}
PostModel.init({
  title: DataTypes.STRING,
  text: DataTypes.STRING,
  assunto: DataTypes.STRING,
  autor: DataTypes.STRING,
}, { sequelize, schema: 'annie', modelName: 'post' });

(async () => {
    await sequelize.sync();
})();

module.exports = { PostModel };
