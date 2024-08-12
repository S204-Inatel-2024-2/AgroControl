const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db/conecctionBD');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const loginRoutes = require('./routes/loginRoutes')
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
// Caminho para o arquivo JSON
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'swagger.json'), 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/login',loginRoutes)



module.exports = app; // Certifique-se de exportar a instância do Express
