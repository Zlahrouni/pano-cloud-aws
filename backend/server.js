const express = require('express');
const app = express();
app.use(express.json());
const port = 3001;
const Sequelize = require("sequelize");
const dbConfig = require("./config/db.config");
const {DataTypes} = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
});



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



app.get('/hello', (req, res) => {
  res.send('Hello World');
});

console.log("DB_USER", process.env.DB_USER);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to zeus application." });
});

app.get("/articles", (req, res) => {
    Article.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving articles."
            });
        });
});

app.post("/article/add", (req, res) => {
    console.log('Body received :',req.body);

    if (!req.body.title || !req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const article = {
        title: req.body.title,
        content: req.body.content
    };

    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Article."
            });
        });
});

app.get("/article/:id", (req, res) => {
    const id = req.params.id;

    Article.findByPk(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });

});




app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
