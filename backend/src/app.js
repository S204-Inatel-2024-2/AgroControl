const fs = require('fs');
const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const loginRoutes = require('./routes/loginRoutes');
const SecurityRoutes = require('./middlewares/auth');
const servicosRoutes = require('./routes/servicosRoutes');
const receitasRoutes = require('./routes/receitasRoutes');
const tiposServicoRoutes = require('./routes/tiposServicoRoutes');
const funcionariosRoutes = require('./routes/funcionariosRoutes');
const categoriasReceitas = require('./routes/categoriasReceitaRoutes');


const app = express();
app.use(cors());//habilita acesso para o frontEnd
app.use(bodyParser.json());
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'swagger.json'), 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//mapeia as rotas da aplicação e documenta no swaager
app.use('/login', loginRoutes);
app.use('/servicos', SecurityRoutes, servicosRoutes);
app.use('/categorias',SecurityRoutes,categoriasReceitas);
app.use('/tiposervico', SecurityRoutes, tiposServicoRoutes);
app.use('/receitas', SecurityRoutes, receitasRoutes)
app.use('/funcionarios', SecurityRoutes, funcionariosRoutes);


module.exports = app; 