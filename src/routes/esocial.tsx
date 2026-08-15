import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/esocial")({
  head: () => meta("eSocial — Painel de Envios — Sentinela SST", "Transmissão e monitoramento dos eventos S-2210 (CAT), S-2220 (ASO) e S-2240 (condições ambientais do trabalho)."),
  component: ESocial,
});

function ESocial() {
  return (
    <>
      <PageHeader
        titulo="eSocial — Painel de Envios"
        descricao="Governança digital dos eventos de SST: validação, transmissão e tratamento de inconsistências."
        acoes={<Button size="sm">Transmitir lote</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Transmitidos (mês)" valor="418" tom="ok" />
        <Stat rotulo="Com inconsistência" valor="23" tom="critico" />
        <Stat rotulo="Aguardando envio" valor="57" tom="alerta" />
        <Stat rotulo="Prazo médio de envio" valor="2,1 d" tom="info" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { c: "S-2210", t: "Comunicação de Acidente de Trabalho", env: 14, err: 1 },
          { c: "S-2220", t: "Monitoramento da Saúde (ASO)", env: 331, err: 9 },
          { c: "S-2240", t: "Condições Ambientais do Trabalho", env: 73, err: 13 },
        ].map((e) => (
          <Panel key={e.c} titulo={e.c}>
            <p className="text-sm font-semibold text-foreground">{e.t}</p>
            <div className="mt-3 flex items-center gap-2">
              <Tag tom="ok">{e.env} enviados</Tag>
              <Tag tom={e.err ? "critico" : "ok"}>{e.err} erros</Tag>
            </div>
          </Panel>
        ))}
      </div>
      <Panel titulo="Fila de eventos">
        <Tabela
          colunas={["Recibo", "Evento", "Colaborador", "Data do fato", "Status", "Mensagem"]}
          linhas={[
            ["1.2.0000123456", "S-2220", "Camila Nunes", "14/08", <Tag tom="ok">Aceito</Tag>, "Processado com sucesso"],
            ["—", "S-2240", "Rafael Souza", "01/08", <Tag tom="critico">Rejeitado</Tag>, "Erro 1230: agente nocivo 02.01.001 sem EPC informado"],
            ["—", "S-2210", "Diego Farias", "05/08", <Tag tom="alerta">Em validação</Tag>, "Aguardando CID no ASO complementar"],
            ["1.2.0000123401", "S-2240", "Jonas Lima", "31/07", <Tag tom="ok">Aceito</Tag>, "Processado com sucesso"],
            ["—", "S-2220", "Wesley Braga", "09/08", <Tag tom="alerta">Pendente</Tag>, "Assinatura do médico examinador ausente"],
          ]}
        />
      </Panel>
    </>
  );
}
