const express = require('express');
const app = express();
app.use(express.json());
const port = 3001;
require("dotenv").config();
const sequelize = require('./module/db');
const Article = require('./models/article');
const articleRoutes = require('./routes/articleRoutes');
sequelize.sync().then(() => {
    console.log('DB synced')
});
console.log("DB_USER", process.env.DB_USER);

app.use('/', articleRoutes);

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});