const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.CONNECTION_URL) {
    throw new Error('CONNECTION_URL não está definida nas variáveis de ambiente');
}

const sequelize = new Sequelize(process.env.CONNECTION_URL, {
    dialect: 'postgres',
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


module.exports = sequelize;
