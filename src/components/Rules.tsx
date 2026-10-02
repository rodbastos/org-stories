const STEPS = [
  'Ideal para ser jogado em um grupo de 3 a 6 pessoas.',
  'Em cada rodada, uma pessoa sorteia uma carta.',
  'A pessoa pode ler e mostrar a frente da carta para o grupo, que tem uma história e uma imagem.',
  'O verso da carta ela lê, mas não revela ao restante do grupo.',
  'O grupo precisa descobrir a história toda (o contexto), porém só pode fazer perguntas que podem ser respondidas por: Sim, Não, Irrelevante ou "Refaça sua pergunta".',
  'Após a descoberta, o grupo reflete e conversa sobre o antipadrão descrito. Ele pode usar o QR code da carta para buscar mais informações sobre o antipadrão.',
];

export function Rules({ onClose }: { onClose: () => void }) {
  return (
    <div className="reveal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="reveal-panel rules-body">
        <h3>Como jogar</h3>
        <ol className="rules-list">
          {STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="reveal-section">
          <h4>Definições</h4>
          <p>
            <strong>Padrão</strong>: solução de sucesso para um problema que acontece em um
            determinado contexto.
          </p>
          <p style={{ marginTop: 8 }}>
            <strong>Antipadrão</strong>: solução ruim e recorrente, que não resolve o problema ou
            cria um contexto resultante com mais ou piores problemas.
          </p>
        </div>
        <div className="reveal-actions">
          <button className="btn btn-teal" onClick={onClose}>Entendi, vamos jogar</button>
        </div>
      </div>
    </div>
  );
}
