module.exports = (admin, novoFuncionario) => {
  return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #0056b3;">Novo Funcionário Cadastrado na Empresa Agro Control!</h2>
          <p>Olá <strong>${admin.nome}</strong>,</p>
          <p>Temos o prazer de informar que um novo funcionário foi cadastrado na nossa equipe:</p>

          <h3 style="color: #0056b3;">Detalhes do Novo Funcionário</h3>
          <ul style="list-style-type: circle; margin-left: 20px;">
              <li><strong>Nome:</strong> ${novoFuncionario.nome}</li>
              <li><strong>Email:</strong> ${novoFuncionario.email}</li>
              <li><strong>Data de Nascimento:</strong> ${new Date(novoFuncionario.dataNascimento).toLocaleDateString()}</li>
              <li><strong>CPF:</strong> ${novoFuncionario.cpf}</li>
              <li><strong>Função:</strong> ${novoFuncionario.funcao}</li>
              <li><strong>Salário:</strong> R$ ${novoFuncionario.salario.toFixed(2)}</li>
              <li><strong>Endereço:</strong> ${novoFuncionario.endereco}</li>
              <li><strong>Data de Início:</strong> ${new Date().toLocaleDateString("pt-BR")}</li>
              <li><strong>Gestor:</strong> Matheus</li>
          </ul>

          <p style="margin-top: 20px;">Agradecemos por sua colaboração e desejamos um ótimo início ao novo membro da equipe!</p>

          <p style="color: #555; font-size: 12px;">Este é um email automático, por favor, não responda. Em caso de dúvidas, contate o suporte em <a href="mailto:suporte@agroControl.com">suporte@agroControl.com</a>.</p>
      </div>
  `;
}
