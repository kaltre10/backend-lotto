const express = require('express');
const routerApi = require('./network/routerApi');
const cors = require('cors')
const app = express();
app.use(cors());
const connection = require('./configDB');
app.use(express.json());

//zona horaria
process.env.TZ = "America/Caracas";
console.log(`test date ${new Date()}`);

connection();

routerApi(app);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`server en el puerto ${PORT}`))

module.exports = {app, server};