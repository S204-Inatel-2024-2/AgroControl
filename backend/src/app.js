const fs = require('fs');
const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const swaggerUi = require('swagger-ui-express');
const servicosRoutes = require('./routes/servicos');
const SecurityRoutes = require('./middlewares/auth');
const receitasRoutes = require('./routes/receitasRoutes');
const tiposServicoRoutes = require('./routes/tiposServico');
const funcionariosRoutes = require('./routes/funcionarios');
const categoriasReceitas = require('./routes/categoriasReceitaRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/login', loginRoutes);
app.use('/servicos', SecurityRoutes, servicosRoutes);
app.use('/receitas', SecurityRoutes, receitasRoutes);
app.use('/categorias', SecurityRoutes, categoriasReceitas);
app.use('/tiposervico', SecurityRoutes, tiposServicoRoutes);
app.use('/funcionarios', SecurityRoutes, funcionariosRoutes);
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'swagger.json'), 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//mapeia as rotas da aplicação e documenta no swaager


module.exports = app; 