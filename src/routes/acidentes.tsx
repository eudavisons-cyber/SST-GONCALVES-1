import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/acidentes")({
  head: () => meta("CAT e Investigação de Acidentes — Sentinela SST", "Registro e envio de CAT, investigação de incidentes com 5 Porquês e Diagrama de Ishikawa."),
  component: Acidentes,
});

const espinha = [
  { m: "Método", causas: ["Procedimento de bloqueio não seguido", "APR desatualizada"] },
  { m: "Mão de obra", causas: ["Reciclagem NR-10 vencida", "Pressa por parada de linha"] },
  { m: "Máquina", causas: ["Chave seccionadora sem trava", "Sinalização apagada"] },
  { m: "Meio ambiente", causas: ["Iluminação insuficiente", "Área molhada"] },
];

function Acidentes() {
  return (
    <>
      <PageHeader
        titulo="Eventos e Acidentes"
        descricao="Abertura de CAT, investigação de causa raiz e acompanhamento de ações corretivas."
        acoes={<Button size="sm">Registrar CAT</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Acidentes no ano" valor="14" detalhe="3 com afastamento" tom="alerta" />
        <Stat rotulo="Dias sem acidentes" valor="42" tom="ok" />
        <Stat rotulo="CATs abertas" valor="2" tom="critico" />
        <Stat rotulo="Investigações concluídas" valor="11/14" tom="info" />
      </div>

      <Tabs defaultValue="cat">
        <TabsList>
          <TabsTrigger value="cat">Registro de CAT</TabsTrigger>
          <TabsTrigger value="porques">5 Porquês</TabsTrigger>
          <TabsTrigger value="ishikawa">Ishikawa</TabsTrigger>
        </TabsList>

        <TabsContent value="cat" className="mt-4">
          <Panel titulo="CATs registradas">
            <Tabela
              colunas={["Nº CAT", "Colaborador", "Data", "Tipo", "Parte atingida", "Afastamento", "S-2210"]}
              linhas={[
                ["2026-0014", "Diego Farias", "05/08", "Típico", "Mão direita", "15 dias", <Tag tom="alerta">Em validação</Tag>],
                ["2026-0013", "Marcos Pinho", "22/07", "Trajeto", "Joelho", "3 dias", <Tag tom="ok">Transmitida</Tag>],
                ["2026-0012", "Luís Andrade", "10/07", "Típico", "Olho esquerdo", "Sem afastamento", <Tag tom="ok">Transmitida</Tag>],
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="porques" className="mt-4">
          <Panel titulo="CAT 2026-0014 — Análise dos 5 Porquês">
            <ol className="space-y-3">
              {[
                "Por que houve o acidente? O colaborador tocou barramento energizado.",
                "Por que estava energizado? A chave geral não foi bloqueada.",
                "Por que não foi bloqueada? O cadeado de bloqueio não estava disponível.",
                "Por que não estava disponível? O kit LOTO não é controlado por inventário.",
                "Por que não é controlado? Falta procedimento de gestão de kits de bloqueio (causa raiz).",
              ].map((p, i) => (
                <li key={i} className="flex gap-3 rounded border border-border bg-secondary/40 p-3 text-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-foreground/90">{p}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </TabsContent>

        <TabsContent value="ishikawa" className="mt-4">
          <Panel titulo="Diagrama de Ishikawa — choque elétrico em painel">
            <div className="grid gap-3 sm:grid-cols-2">
              {espinha.map((e) => (
                <div key={e.m} className="rounded border border-border bg-secondary/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{e.m}</p>
                  <ul className="mt-2 space-y-1 text-sm text-foreground/90">
                    {e.causas.map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}
