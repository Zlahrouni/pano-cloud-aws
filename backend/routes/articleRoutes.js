const express = require('express');
const router = express.Router();
const Article = require('../models/article.js');

router.get("/", (req, res) => {
    res.json({ message: "Welcome to gest-art application." });
});

router.get("/articles", (req, res) => {
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

router.post("/article/add", async (req, res) => {
    console.log('Body received :', req.body);

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

    let newtArticle = await Article.create(article);
    if (newtArticle) {
        res.json(newtArticle);
    } else {
        res.status(500).send({
            message: "Some error occurred while creating the Article."
        });
    }

});

router.get("/article/:id", (req, res) => {
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

module.exports = router;