const express = require('express');
const routerApi = require('./network/routerApi');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors());
const connection = require('./configDB');
app.use(express.json());

connection();

routerApi(app);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`server en el puerto ${PORT}`))

module.exports = {app, server};