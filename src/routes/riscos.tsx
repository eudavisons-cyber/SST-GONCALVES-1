import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/riscos")({
  head: () => meta("Inventário de Riscos e PGR — Sentinela SST", "Inventário de agentes físicos, químicos, biológicos, ergonômicos e de acidentes com matriz de severidade x probabilidade."),
  component: Riscos,
});

const severidades = ["Insignificante", "Baixa", "Moderada", "Alta", "Catastrófica"];
const probabilidades = ["Raro", "Improvável", "Possível", "Provável", "Quase certo"];

function nivel(i: number, j: number) {
  const v = (i + 1) * (j + 1);
  if (v >= 15) return "critico";
  if (v >= 8) return "alerta";
  if (v >= 4) return "info";
  return "ok";
}

function Riscos() {
  return (
    <>
      <PageHeader
        titulo="Inventário de Riscos (PGR)"
        descricao="Mapeamento por GHE com classificação de agentes e avaliação quantitativa."
        acoes={<Button size="sm">Novo risco</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Riscos inventariados" valor="284" />
        <Stat rotulo="Nível crítico" valor="19" tom="critico" />
        <Stat rotulo="Com medida de controle" valor="217" tom="ok" />
        <Stat rotulo="GHEs" valor="26" tom="info" />
      </div>
      <Panel titulo="Matriz de risco — severidade x probabilidade">
        <div className="overflow-x-auto">
          <table className="min-w-[620px] border-separate border-spacing-1 text-xs">
            <tbody>
              {probabilidades.map((p, j) => (
                <tr key={p}>
                  <th className="w-28 pr-2 text-right font-medium text-muted-foreground">{p}</th>
                  {severidades.map((_, i) => {
                    const n = nivel(i, probabilidades.length - 1 - j);
                    return (
                      <td
                        key={i}
                        className={cn(
                          "h-12 min-w-[92px] rounded text-center font-semibold",
                          n === "critico" && "bg-destructive/25 text-destructive",
                          n === "alerta" && "bg-warning/25 text-warning",
                          n === "info" && "bg-info/20 text-info",
                          n === "ok" && "bg-success/20 text-success",
                        )}
                      >
                        {(i + 1) * (probabilidades.length - j)}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th />
                {severidades.map((s) => (
                  <th key={s} className="pt-2 text-center font-medium text-muted-foreground">
                    {s}
                  </th>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel titulo="Inventário detalhado">
        <Tabela
          colunas={["GHE / Setor", "Agente", "Classificação", "Intensidade", "Medida de controle", "Nível"]}
          linhas={[
            ["GHE 04 — Manutenção", "Ruído contínuo", "Físico", "87 dB(A) — NEN acima do LE", "Protetor auricular + enclausuramento", <Tag tom="critico">Crítico</Tag>],
            ["GHE 07 — Pintura", "Xileno / tolueno", "Químico", "42 ppm", "Exaustão local + respirador", <Tag tom="alerta">Alto</Tag>],
            ["GHE 12 — Obra Norte", "Queda de altura", "Acidente", "Trabalho a 6 m", "Linha de vida + cinto tipo paraquedista", <Tag tom="critico">Crítico</Tag>],
            ["GHE 18 — Logística", "Levantamento manual", "Ergonômico", "23 kg / repetitivo", "Paleteira elétrica + AET", <Tag tom="alerta">Alto</Tag>],
            ["GHE 22 — Refeitório", "Agentes biológicos", "Biológico", "Contato eventual", "Higienização + PPHO", <Tag tom="info">Moderado</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
