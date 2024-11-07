module.exports = (dadosFuncionario) => {
    const formattedServicos = dadosFuncionario.novosServicos.map(servico => `
        <ul style="list-style-type: circle; margin-left: 20px; padding: 0;">
            <li><strong>ID do Serviço:</strong> ${servico.IdServico}</li>
            <li><strong>Status:</strong> ${servico.status}</li>
            <li><strong>Data da Atividade:</strong> ${new Date(servico.dataAtividade).toLocaleDateString()}</li>
            <li><strong>Tipo de Serviço:</strong> ${servico.tipoServico || 'N/A'}</li>
            <li><strong>Valor Gasto:</strong> R$ ${servico.valorGasto ? servico.valorGasto.toFixed(2) : '0.00'}</li>
            <li><strong>Data de Criação:</strong> ${new Date(servico.createdAt).toLocaleDateString()}</li>
        </ul>
    `).join('');

    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #0056b3;">Notificação de Novos Serviços Atribuídos</h2>
            <p>Olá <strong>${dadosFuncionario.nomeFuncionario}</strong>,</p>
            <p>Você recebeu novos serviços atribuídos a você. Abaixo estão os detalhes dos serviços que foram designados:</p>

            <h3 style="color: #0056b3;">Detalhes dos Novos Serviços:</h3>
            ${formattedServicos}

            <p>Por favor, revise os detalhes e entre em contato com seu supervisor se tiver dúvidas ou precisar de suporte adicional.</p>

            <p style="color: #555; font-size: 12px;">Este é um email automático, por favor, não responda diretamente. Em caso de dúvidas, contate o suporte em <a href="mailto:suporte@agroControl.com">suporte@agroControl.com</a>.</p>
        </div>
    `;
};
