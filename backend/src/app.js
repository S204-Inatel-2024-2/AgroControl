const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const despesasRoutes = require('./routes/despesasRoutes');
const swaggerUi = require('swagger-ui-express');
const SecurityRoutes = require('./middlewares/auth')
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
app.use('/login', loginRoutes);
app.use('/users/despesas',SecurityRoutes,despesasRoutes);

app.use('/users',SecurityRoutes, userRoutes);
app.use('/protected',SecurityRoutes,(req,res)=>{
    res.json({ message: 'This is a protected route', user: req.user });
})



module.exports = app; // Certifique-se de exportar a instância do Express
