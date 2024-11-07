module.exports = (dadosServico) => {
    const formattedServicos = dadosServico.servicos.map(servico => `
        <ul style="list-style-type: circle; margin-left: 20px; padding: 0;">
            <li><strong>ID do Serviço:</strong> ${servico.IdServico}</li>
            <li><strong>Status:</strong> ${servico.status}</li>
            <li><strong>Data da Atividade:</strong> ${new Date(servico.dataAtividade).toLocaleDateString()}</li>
            <li><strong>Tipo de Serviço:</strong> ${servico.tipoServico || 'N/A'}</li>
            <li><strong>Responsável:</strong> ${servico.responsavel || 'N/A'}</li>
            <li><strong>Valor Gasto:</strong> R$ ${servico.valorGasto.toFixed(2)}</li>
            <li><strong>Data de Criação:</strong> ${new Date(servico.createdAt).toLocaleDateString()}</li>
            <li><strong>Última Atualização:</strong> ${new Date(servico.updatedAt).toLocaleDateString()}</li>
        </ul>
    `).join('');

    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #0056b3;">Notificação de Transferência de Serviço</h2>
            <p>O serviço <strong>${dadosServico.servico}</strong> foi transferido para um novo responsável.</p>

            <h3 style="color: #0056b3;">Detalhes do Serviço:</h3>
            <ul style="list-style-type: circle; margin-left: 20px;">
                <li><strong>Serviço:</strong> ${dadosServico.servico}</li>
                <li><strong>Descrição:</strong> ${dadosServico.descricao}</li>
                <li><strong>Data da Transferência:</strong> ${new Date().toLocaleDateString()}</li>
                <li><strong>Novo Responsável:</strong> ${dadosServico.novoResponsavel}</li>
            </ul>

            <h3 style="color: #0056b3;">Serviços Transferidos:</h3>
            ${formattedServicos}

            <p>Certifique-se de que todas as partes envolvidas estão cientes da mudança.</p>

            <p style="color: #555; font-size: 12px;">Este é um email automático, por favor, não responda. Em caso de dúvidas, contate o suporte em <a href="mailto:suporte@agroControl.com">suporte@agroControl.com</a>.</p>
        </div>
    `;
};
