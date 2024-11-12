module.exports = (dadosServico) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #0056b3;">Notificação de Novos Serviços Atribuídos</h2>
            <p>Olá <strong>${dadosServico.novoResponsavel}</strong>,</p>
            <p>Você recebeu um novo serviço atribuído a você. Abaixo estão os detalhes do serviço que foi designado:</p>

            <h3 style="color: #0056b3;">Detalhes do Novo Serviço:</h3>
            <ul style="list-style-type: circle; margin-left: 20px; line-height: 1.8;">
                <li><strong>Serviço:</strong> ${dadosServico.servico}</li>
                <li><strong>Status:</strong> ${dadosServico.status}</li>
                <li><strong>Data da Atividade:</strong> ${new Date(dadosServico.dataAtividade).toLocaleDateString()}</li>
                <li><strong>Tipo de Serviço:</strong> ${dadosServico.tipoServico || 'N/A'}</li>
                <li><strong>Valor Gasto:</strong> R$ ${dadosServico.valorGasto.toFixed(2)}</li>
                <li><strong>Data da Transferência:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>

            <p>Por favor, revise os detalhes e entre em contato com seu supervisor se tiver dúvidas ou precisar de suporte adicional.</p>

            <p style="color: #555; font-size: 12px;">Este é um email automático, por favor, não responda diretamente. Em caso de dúvidas, contate o suporte em <a href="mailto:suporte@agroControl.com">suporte@agroControl.com</a>.</p>
        </div>
    `;
};
