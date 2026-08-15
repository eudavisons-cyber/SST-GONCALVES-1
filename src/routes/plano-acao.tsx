import { createFileRoute } from "@tanstack/react-router";
import { Barra, PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/plano-acao")({
  head: () => meta("GRO e Plano de Ação 5W2H — Sentinela SST", "Gerenciamento de riscos ocupacionais com plano de ação 5W2H, responsáveis, prazos e evidências de eficácia."),
  component: PlanoAcao,
});

function PlanoAcao() {
  return (
    <>
      <PageHeader
        titulo="GRO — Plano de Ação 5W2H"
        descricao="Controle de riscos com responsáveis, prazos, custo e verificação de eficácia."
        acoes={<Button size="sm">Nova ação</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Ações abertas" valor="46" />
        <Stat rotulo="Em atraso" valor="12" tom="critico" />
        <Stat rotulo="Concluídas no ano" valor="163" tom="ok" />
        <Stat rotulo="Eficácia verificada" valor="88%" tom="ok" />
      </div>
      <Panel titulo="Ações por prioridade">
        <div className="space-y-4">
          {[
            { l: "Eliminação / substituição", v: 22, t: "ok" as const },
            { l: "Controles de engenharia (EPC)", v: 54, t: "info" as const },
            { l: "Controles administrativos", v: 71, t: "alerta" as const },
            { l: "EPI (última barreira)", v: 90, t: "critico" as const },
          ].map((i) => (
            <div key={i.l}>
              <div className="mb-1.5 flex justify-between text-xs">
                <span>{i.l}</span>
                <span className="tabular-nums text-muted-foreground">{i.v}%</span>
              </div>
              <Barra valor={i.v} tom={i.t} />
            </div>
          ))}
        </div>
      </Panel>
      <Panel titulo="Matriz 5W2H">
        <Tabela
          colunas={["O quê", "Por quê", "Onde", "Quem", "Quando", "Como", "Quanto", "Status"]}
          linhas={[
            ["Enclausurar prensa 04", "Ruído 87 dB(A)", "Produção", "Eng. Marcos", "30/09", "Projeto acústico", "R$ 48.000", <Tag tom="alerta">Em curso</Tag>],
            ["Instalar linha de vida", "Queda de altura", "Obra Norte", "Encarregado Jonas", "12/09", "Ancoragem certificada", "R$ 12.400", <Tag tom="critico">Atrasada</Tag>],
            ["Treinar NR-33 (5 op.)", "Espaço confinado", "Silo 2", "Juliana Alves", "05/10", "Turma externa", "R$ 7.800", <Tag tom="info">Planejada</Tag>],
            ["Trocar paleteiras manuais", "Risco ergonômico", "Logística", "Sup. Wesley", "20/08", "Compra de 4 elétricas", "R$ 62.000", <Tag tom="ok">Concluída</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
