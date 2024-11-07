module.exports = (funcionario) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #b30000;">Notificação de Remoção de Funcionário</h2>
            <p>Informamos que o funcionário <strong>${funcionario.nome}</strong> (${funcionario.email}) não faz mais parte da equipe AgroControl.</p>

            <h3 style="color: #b30000;">Detalhes do Funcionário Removido:</h3>
            <ul style="list-style-type: circle; margin-left: 20px;">
                <li><strong>Nome:</strong> ${funcionario.nome}</li>
                <li><strong>Email:</strong> ${funcionario.email}</li>
                <li><strong>Data de Remoção:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>

            <p>Por favor, atualizem os registros e façam os ajustes necessários nos sistemas.</p>

            <p style="color: #555; font-size: 12px;">Este é um email automático, por favor, não responda. Em caso de dúvidas, contate o suporte em <a href="mailto:suporte@agroControl.com">suporte@agroControl.com</a>.</p>
        </div>
    `;
};
