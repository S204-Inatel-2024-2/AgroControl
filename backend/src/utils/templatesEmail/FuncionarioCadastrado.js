module.exports = (funcionario) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #0056b3;">Bem-vindo(a) à Empresa Agro Control, ${funcionario.nome}!</h2>
            <p>Olá <strong>${funcionario.nome}</strong>,</p>
            <p>Estamos muito felizes em ter você como parte do nosso time! Aqui na <strong>Agro Control</strong>, acreditamos que pessoas como você são essenciais para alcançarmos grandes resultados.</p>

            <h3 style="color: #0056b3;">Informações Importantes</h3>
            <p>Aqui estão algumas informações úteis para o seu início:</p>
            <ul style="list-style-type: circle; margin-left: 20px; line-height: 1.8;">
                <li><strong>Email corporativo:</strong> ${funcionario.email}</li>
                <li><strong>Seu gestor:</strong> Matheus</li>
            </ul>

            <p>Se você tiver qualquer dúvida ou precisar de mais informações, estamos à disposição. Fique à vontade para entrar em contato com o seu gestor.</p>

            <p style="margin-top: 20px;">Estamos ansiosos para ver suas contribuições e desejamos que você tenha um ótimo começo conosco!</p>

            <p style="color: #555; font-size: 12px;">Este é um email automático, por favor, não responda. Em caso de dúvidas, contate o suporte em <a href="mailto:suporte@agroControl.com">suporte@agroControl.com</a>.</p>
        </div>
    `;
}
