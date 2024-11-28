const app = require('./app');
const {
  exec
} = require('child_process');

const PORT = process.env.PORT || 3000;

// Inicia o MailDev automaticamente
/*
exec('npx maildev ', (err, stdout, stderr) => {
  if (err) {
    console.error(`Erro ao iniciar o MailDev: ${err}`);
    return;
  }
  console.log(`MailDev iniciado:\n${stdout}`); //http://127.0.0.1:1080/#/
});
*/
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});