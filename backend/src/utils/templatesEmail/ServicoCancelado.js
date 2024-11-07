module.exports = function ServicoCancelado(dadosServico) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #0056b3;">Notificação de Cancelamento de Serviço</h2>
      <p>O serviço <strong>${dadosServico.servico}</strong> foi <strong>cancelado</strong>.</p>

      <h3 style="color: #0056b3;">Detalhes do Serviço:</h3>
      <ul style="list-style-type: circle; margin-left: 20px;">
        <li><strong>Serviço:</strong> ${dadosServico.servico}</li>
        <li><strong>Status:</strong> Cancelado</li>
        <li><strong>Data de Atividade:</strong> ${new Date(dadosServico.dataAtividade).toLocaleDateString()}</li>
        <li><strong>Tipo de Serviço:</strong> ${dadosServico.tipoServico}</li>
        <li><strong>Responsável:</strong> ${dadosServico.responsavel}</li>
        <li><strong>Valor Gasto:</strong> R$ ${dadosServico.valorGasto.toFixed(2)}</li>
      </ul>

      <p>Por favor, verifique o sistema para mais detalhes e tome as ações necessárias.</p>

      <p style="color: #555; font-size: 12px;">Este é um e-mail automático, por favor, não responda. Em caso de dúvidas, contate o suporte em <a href="mailto:suporte@agroControl.com">suporte@agroControl.com</a>.</p>
    </div>
  `;
};
