const {DataTypes} = require("sequelize");
const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");
const sequelize = require("../module/db")

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Article;