export interface CardData {
  id: number;
  slug: string;
  title: string;
  story: string;
  context: string;
  reflection: string;
  antipattern: string;
  frontImage: string;
  backImage: string;
}

export const CARDS: CardData[] = [
  {
    id: 1,
    slug: 'quem-pediu',
    title: 'QUEM PEDIU?',
    story:
      'Uma fila se forma do lado de fora de uma grande loja de departamentos. Um mês depois, todas recebem em suas casas um cartão de crédito com a bandeira da loja. Muitos reclamam no PROCON e nas redes sociais.',
    context:
      'Em um processo seletivo, os candidatos que compareceram tiveram seus dados usados sem autorização para a criação de cartões de crédito. Os funcionários alegaram que estavam em uma situação difícil, pois vários já tinham sido demitidos por não atingirem as metas definidas pela gerência.',
    reflection:
      'Muitos dos desvios éticos nas organizações acontecem aos poucos, um passo de cada vez. Para bater a meta de um mês, a pessoa força uma venda, depois ela faz uma venda casada, depois ela usa dados sem autorização para um "inofensivo" cartão de crédito. Punir quem não atinge um desempenho ou resultado numérico pode gerar a pressão necessária para desvios como esse.',
    antipattern: 'Metas com Punições',
    frontImage: '/cards/card-01-front.png',
    backImage: '/cards/card-01-back.png',
  },
  {
    id: 2,
    slug: 'dinheiro-nao-e-problema',
    title: 'DINHEIRO NÃO É PROBLEMA',
    story:
      'Uma empresa é contratada para dar um treinamento. Ela recebe para isso, porém nunca entrega o serviço. Ninguém recorre à justiça, pois todos parecem satisfeitos.',
    context:
      'O RH tinha um valor no budget que se não fosse gasto no ano atual, não seria disponibilizado no ano seguinte. Quando surgiram problemas com as datas para o treinamento, a Nota Fiscal foi emitida e paga antes que pudessem marcar outra data. O treinamento não ocorreu, mas o recurso para o outro ano estava garantido.',
    reflection:
      'Fazer um budget anual em uma grande empresa envolve negociações difíceis e previsões com grande incerteza. Todo mundo tenta puxar a sardinha e evitar se comprometer demais. Já existem outras práticas (Beyond Budgeting) que atendem a necessidade de uma gestão financeira, sem gerar tantas disfunções.',
    antipattern: 'Budget Anual',
    frontImage: '/cards/card-02-front.png',
    backImage: '/cards/card-02-back.png',
  },
  {
    id: 3,
    slug: 'pobre-bichinho',
    title: 'POBRE BICHINHO',
    story:
      'Uma organização tem como propósito salvar uma espécie rara de bicho-preguiça. Apesar da boa reputação e equipe competente, eles perdem um prazo importante para apresentar um projeto e conseguir financiamento. A extinção acontece e a ONG fecha as portas.',
    context:
      'Na ONG todos queriam saber de tudo e participar de todas as decisões. Nada podia acontecer sem intermináveis discussões na busca pelo consenso. Nesse caso, o tempo esgotou, nada aconteceu e o bicho-preguiça levou a pior.',
    reflection:
      'Esse antipadrão surge em organizações que possuem intenções louváveis, como criar uma gestão mais colaborativa, menos autocrática, melhorar o ambiente organizacional e fortalecer o senso de time. Porém é comum gerar lentidão, frustração e desresponsabilização. Por isso a crença que "tudo é de todos" pode incapacitar qualquer grupo na busca de seu propósito.',
    antipattern: 'Tudo é de Todos',
    frontImage: '/cards/card-03-front.png',
    backImage: '/cards/card-03-back.png',
  },
  {
    id: 4,
    slug: 'jogo-de-azar',
    title: 'JOGO DE AZAR',
    story:
      'Uma equipe chega para trabalhar em uma sexta-feira. O chefe propõe um jogo de azar. Todos jogam e o perdedor é sumariamente demitido.',
    context:
      'Uma política de avaliação de desempenho da empresa obrigava todo gestor a classificar sua equipe em 3 categorias de igual proporção. Acreditando que o resultado era coletivo, o gestor propôs um jogo do palitinho para ver quem levaria a pior. A política obrigava demitir quem era mal avaliado.',
    reflection:
      'Em um mundo onde trabalho é resultado do coletivo, promover a avaliação individual já é anacrônico. Some isso à ideia de forçar todo time em uma distribuição gaussiana e você tem uma das práticas mais abomináveis que já se popularizou em grandes empresas.',
    antipattern: 'Curva Forçada',
    frontImage: '/cards/card-04-front.png',
    backImage: '/cards/card-04-back.png',
  },
  {
    id: 5,
    slug: 'triste-decisao',
    title: 'TRISTE DECISÃO',
    story:
      'Uma reunião é chamada para avaliar os riscos de uma barragem se romper. Dois meses depois a barragem se rompe causando uma tragédia humana e ambiental de gigantes proporções.',
    context:
      'Na reunião estavam presentes vários técnicos internos, consultores e um diretor. Todos os técnicos acreditavam que a barragem estava em alto risco e precisava ser interditada. Porém prevaleceu a opinião da pessoa mais bem paga na sala (HIPPO — Highest Paid Person\u2019s Opinion). Na ata ficou registrado como uma decisão coletiva.',
    reflection:
      'Muitos fatores contribuem para uma grande tragédia, alguns deles originados no sistema político e econômico que vivemos. Porém o fenômeno HIPPO está presente em muitos eventos. Podemos vê-lo também em decisões que impactam apenas a empresa, como desastrosos produtos lançados por grandes corporações.',
    antipattern: 'HIPPO (Opinião do Chefe)',
    frontImage: '/cards/card-05-front.png',
    backImage: '/cards/card-05-back.png',
  },
  {
    id: 6,
    slug: 'o-voo-da-galinha',
    title: 'O VOO DA GALINHA',
    story:
      'Uma empresa moderna, cheia de gente jovem, onde todos trabalham muito, mas poucos projetos chegam ao fim. O CEO chama um consultor para resolver o problema, mas suas ideias, apesar de aceitas, também não são executadas. Alguém comenta: "Algumas organizações são como galinhas, quase voam."',
    context:
      'Na organização as pessoas têm o hábito de não dizer não. Assim elas assumem mais trabalho do que dão conta. Quando os acordos e promessas não são cumpridos, a desconfiança aumenta e as pessoas, querendo agradar, evitam ao máximo dizer não.',
    reflection:
      'Esse é um traço cultural comum em muitas empresas. Uma excelente estratégia para começar a terminar e parar de começar é limitar o "trabalho em progresso". A questão é como romper o círculo vicioso e sentir-se à vontade para dizer não, "isso não é prioritário", ou abrir o diálogo sobre o que é prioritário, pois não dá para tudo ser.',
    antipattern: 'Proibido Dizer Não',
    frontImage: '/cards/card-06-front.png',
    backImage: '/cards/card-06-back.png',
  },
  {
    id: 7,
    slug: 'o-premiado',
    title: 'O PREMIADO',
    story:
      'Um jovem profissional recebe um prêmio de sua empresa por conta de seu alto engajamento e desempenho. Duas semanas depois ele relata estar muito desmotivado e triste. Logo depois, começa a procurar oportunidades no mercado e pede demissão.',
    context:
      'O RH definiu um sistema de premiação em que os gestores escolhiam os melhores colaboradores de cada departamento. Nessa área, o gestor era odiado pela equipe. O jovem profissional, após receber o prêmio, foi tachado pelos colegas como puxa-saco e traidor. Ele não conseguiu lidar com a sensação de ser excluído do grupo de colegas e pediu demissão.',
    reflection:
      'Se apenas uma pessoa tem a autoridade formal de reconhecer o trabalho de toda uma equipe e ainda é forçada a escolher um, entre muitos, teremos uma situação onde o reconhecimento é escasso. Some isso a um grupo que não legitima essa autoridade e você tem uma situação potencialmente desastrosa.',
    antipattern: 'Prêmio para o Preferido',
    frontImage: '/cards/card-07-front.png',
    backImage: '/cards/card-07-back.png',
  },
  {
    id: 8,
    slug: 'diretoria',
    title: 'DIRETORIA',
    story:
      'Uma empresa júnior de uma faculdade de grande prestígio elege sua nova chapa para a diretoria. Após três meses os diretores começam a notar que suas equipes só trazem problemas e não assumem o protagonismo nas soluções.',
    context:
      'Os diretores eleitos não tinham um perfil diferente do restante da empresa júnior. Eles simplesmente foram eleitos para cargos com muito mais responsabilidade e autoridade. Por conta dessa separação, os outros esperavam que eles tomassem a frente nas iniciativas e resolvessem os problemas apresentados.',
    reflection:
      'A concentração de autoridade nos cargos de liderança tem o potencial de gerar um fenômeno onde muitos assumem a posição de seguidores e esperam que os líderes tomem a frente. Liderança pode ser uma força que vai muito além dos cargos, mas se existem estruturas e uma cultura que reforçam a separação entre os líderes e os não líderes, a passividade vai prevalecer.',
    antipattern: 'Líderes e o Resto',
    frontImage: '/cards/card-08-front.png',
    backImage: '/cards/card-08-back.png',
  },
  {
    id: 9,
    slug: 'crescimento-travado',
    title: 'CRESCIMENTO TRAVADO',
    story:
      'Uma organização que desenvolve software para grandes clientes começa a ter sucesso e crescer no mercado. Ela começa a enfrentar um problema sério, pois apesar de contratar 50 pessoas por mês, a soma total de pessoas trabalhando não passa de 500. Ela precisa parar de vender, pois não consegue crescer sua equipe.',
    context:
      'Apesar de oferecer salários competitivos, a empresa não consegue manter sua equipe. Depois de 12 meses em média, a pessoa pede demissão. O principal motivo: todo o processo de alocação de desenvolvedores em projetos é top-down, sem espaço para conversas e sem levar em consideração nenhuma vontade ou necessidade pessoal. Como o mercado está aquecido, a empresa perde 10% de seus funcionários todo mês.',
    reflection:
      'Muitos motivos contribuem para alguém pedir demissão. No mercado de trabalho de tecnologia, as pessoas estão em constante busca de desafios, ao mesmo tempo que valorizam sua liberdade de escolha.',
    antipattern: 'Alocação Forçada',
    frontImage: '/cards/card-09-front.png',
    backImage: '/cards/card-09-back.png',
  },
  {
    id: 10,
    slug: 'a-perseguicao',
    title: 'A PERSEGUIÇÃO',
    story:
      'João pede demissão após alguns anos trabalhando em uma empresa. Apesar de gostar do que faz, ele relata que não aguenta mais a perseguição do Pedro, um colega de trabalho. O RH chama a gestora dos dois envolvidos para conversar, pois isso já tinha acontecido com outro time em que essa mesma gestora atuava.',
    context:
      'João reclamava para a gestora sobre algumas falas de Pedro sobre a qualidade do seu trabalho. A gestora assumia o papel de salvadora, dizendo que iria conversar com o Pedro e pedir para ele não ser tão mala. Por conta disso, Pedro ficava irritado e cada vez mais tecia comentários, alguns velados, sobre o trabalho do João. Com o tempo a relação entre Pedro e João ficou insustentável.',
    reflection:
      'Não podemos confundir casos onde assédio, abuso e outras violências acontecem com um fenômeno onde 3 papéis sociais surgem e se reforçam. O triângulo formado pelo Carrasco, Vítima e Salvador é comum em muitos conflitos e promove uma dinâmica disfuncional.',
    antipattern: 'Triângulo do Drama',
    frontImage: '/cards/card-10-front.png',
    backImage: '/cards/card-10-back.png',
  },
  {
    id: 11,
    slug: 'produtividade',
    title: 'PRODUTIVIDADE',
    story:
      'Preocupado com os custos de uma central de atendimento por telefone, um gerente decide implementar níveis mínimos de produtividade. Depois da decisão, mês após mês a demanda começa a subir e com isso os custos. Após meses lutando contra os altos custos, a saída mais racional parece ser a terceirização do serviço. Isso é feito e todos são demitidos.',
    context:
      'O gerente definiu que cada atendente receberia pelo menos 120 ligações por dia. Com essa diretriz, os atendentes mais se preocupavam em passar o cliente para outra área do que resolver o problema. O volume de ligações aumentou, pois a demanda era por resolver problemas no serviço prestado e essa medida só fez piorar a qualidade. Com a terceirização o custo continuou aumentando e a qualidade piorando.',
    reflection:
      'Focar na produtividade ou velocidade de uma pessoa ou time realizar uma tarefa pode piorar o desempenho de um sistema, como exemplificado acima. Uma opção melhor é analisar a demanda que chega a um call center e focar na diminuição da demanda por falha e não na quantidade de ligações.',
    antipattern: 'Foco na Velocidade',
    frontImage: '/cards/card-11-front.png',
    backImage: '/cards/card-11-back.png',
  },
  {
    id: 12,
    slug: 'sonho-interrompido',
    title: 'SONHO INTERROMPIDO',
    story:
      'Um time se reúne por uma semana em uma sala para construir seus novos OKRs (objetivos e resultados) para o próximo trimestre. No último dia eles olham satisfeitos para o que foi definido. Uma pessoa vai ao banheiro e, quando retorna, dá um grito de surpresa, pois todo o trabalho foi jogado fora.',
    context:
      'O time recebeu uma missão da diretoria de que deveria criar objetivos audaciosos e que promovessem inovação. Eles fizeram isso. Mas no último momento uma pessoa lembrou que se os objetivos não fossem atingidos, a avaliação de desempenho, progressão de carreira e remuneração variável seriam impactados. Eles jogaram tudo fora e usaram os OKRs do trimestre anterior com poucas modificações.',
    reflection:
      'Para estimular a inovação precisamos investigar como as políticas de avaliação promovem uma cultura de aversão ao risco e limitam nossa capacidade de sonhar. Apenas usar nomes ou jeitos modernos para estabelecer objetivos (OKR) não fará nenhuma diferença.',
    antipattern: 'OKR Atrelado à Avaliação',
    frontImage: '/cards/card-12-front.png',
    backImage: '/cards/card-12-back.png',
  },
  {
    id: 13,
    slug: 'uma-base-confusa',
    title: 'UMA BASE CONFUSA',
    story:
      'Em uma reunião com gestores de uma empresa, surge a ideia da criação de uma base de conhecimentos disponível online para os vendedores utilizarem no processo de vendas. Seis meses depois é lançada uma espécie de intranet atrelada a uma rede social para corporações. Dois anos depois, após muito investimento, ela é abandonada por falta de uso.',
    context:
      'Na reunião, decidiram formar um grupo para desenvolver a ideia com gerentes de diferentes áreas. Durante esse processo cada gerente defendia suas necessidades. RH queria um espaço de troca, Tecnologia queria um lugar para organizar documentos técnicos, etc. Assim eles contrataram uma empresa para produzir uma plataforma cheia de funcionalidades e quase impossível de navegar de tão confusa.',
    reflection:
      'Em um processo de design, quando todos têm voz igual nas decisões, quando existem disputas políticas ou quando existe um ambiente socialmente carregado, as decisões que buscam atender a todos se afastam do que consideramos ser uma decisão razoável ou racional. Produtos e projetos bizarros ganham vida.',
    antipattern: 'Design by Committee',
    frontImage: '/cards/card-13-front.png',
    backImage: '/cards/card-13-back.png',
  },
  {
    id: 14,
    slug: 'apressado-passa-fome',
    title: 'APRESSADO PASSA FOME',
    story:
      'Um processo de diagnóstico que durou 9 meses em uma grande empresa identificou que um dos grandes problemas em sua cultura organizacional era a baixa segurança psicológica. Todos reconheciam a gravidade do problema e sua importância. Depois de dois anos e muito dinheiro investido, a grande maioria das pessoas acredita que nada mudou.',
    context:
      'Todos estavam ansiosos para resolver o problema da baixa segurança psicológica. Contrataram treinamentos para todos sobre o tema. Esses treinamentos duravam 3 dias. Depois de 6 meses treinando a imensa força de trabalho, todo o design organizacional permanecia igual: estrutura de cargos, formatos de reunião, metas, símbolos, processos, etc. Nada tinha mudado. A cultura também não.',
    reflection:
      'Acreditar em soluções rápidas para uma mudança cultural parece ingênuo. Mas é muito comum as organizações contratarem alguns dias de workshop na esperança de afetar a cultura de maneira significativa. A cultura é um fenômeno sistêmico que demanda um olhar e uma atuação sistêmica. Você precisa mudar o design organizacional.',
    antipattern: 'Solução Rápida',
    frontImage: '/cards/card-14-front.png',
    backImage: '/cards/card-14-back.png',
  },
  {
    id: 15,
    slug: 'canal-do-medo',
    title: 'CANAL DO MEDO',
    story:
      'A área de compliance de uma empresa cria um canal de denúncia anônima para casos de assédio, racismo e outras situações. Após uma ampla campanha de comunicação interna para divulgar o canal, os resultados são inesperados: as pessoas relatam estar mais estressadas e desconfiadas, com um aumento perceptível no clima de tensão.',
    context:
      'A introdução do canal, apesar de bem-intencionada, gerou insegurança entre os funcionários. Muitos começaram a temer que suas conversas fossem monitoradas e que qualquer comportamento pudesse ser denunciado, mesmo sem fundamento. O anonimato e a campanha de incentivo ao uso do canal geraram desresponsabilização e um uso inadequado, criando um ambiente de desconfiança onde conflitos eram tratados por meio de denúncias e boatos.',
    reflection:
      'Canais de denúncia devem existir como último recurso, e não como primeiro. O anonimato é algo que pode, em algumas situações, evitar até que se cuide da pessoa que sofreu a violência. É possível que canais de denúncia reforcem dinâmicas de medo e desconexão no ambiente de trabalho.',
    antipattern: 'Canal de Denúncia Turbinado',
    frontImage: '/cards/card-15-front.png',
    backImage: '/cards/card-15-back.png',
  },
  {
    id: 16,
    slug: 'nao-ha-vagas',
    title: 'NÃO HÁ VAGAS',
    story:
      'A CEO de uma empresa de telecom, preocupada com o aumento dos custos com a folha de pagamento, decide que todas as novas contratações devem passar por sua aprovação pessoal. Meses depois, descobre-se que o número de funcionários cresceu ainda mais e os custos dispararam.',
    context:
      'A CEO subestimou o tempo e a complexidade necessários para analisar as solicitações de novas contratações. Com sua agenda cheia e as demandas acumuladas, ela começou a aprovar quase todas as vagas, sem a devida análise. Gestores, percebendo essa dinâmica, continuaram enviando pedidos sem critérios claros, confiantes de que seriam aprovados. O RH lavou as mãos.',
    reflection:
      'Quando muitas decisões dependem exclusivamente de uma única pessoa que já possui muitas atribuições, as chances são grandes de surgir gargalos ou decisões automáticas que geram pouco valor. Centralizar algo por desconfiança do julgamento alheio não costuma dar certo.',
    antipattern: 'Centralização Inviável',
    frontImage: '/cards/card-16-front.png',
    backImage: '/cards/card-16-back.png',
  },
];
