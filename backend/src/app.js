const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/loginRoutes');
const funcionariosRoutes = require('./routes/funcionariosRoutes')
const swaggerUi = require('swagger-ui-express');
const SecurityRoutes = require('./middlewares/auth')
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());//habilita acesso para o frontEnd
app.use(bodyParser.json());
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'swagger.json'), 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//mapeia as rotas da aplicação e documenta no swaager
app.use('/login', loginRoutes);
app.use('/funcionarios', SecurityRoutes, funcionariosRoutes);

module.exports = app; 