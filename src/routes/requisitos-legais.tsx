import { createFileRoute } from "@tanstack/react-router";
import { Barra, PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/requisitos-legais")({
  head: () => meta("Requisitos Legais e NRs — Sentinela SST", "Matriz de conformidade com as Normas Regulamentadoras, evidências e responsáveis por requisito."),
  component: Requisitos,
});

const nrs = [
  { nr: "NR-01", t: "Disposições gerais e GRO", p: 92, s: "ok" as const },
  { nr: "NR-05", t: "CIPA", p: 88, s: "ok" as const },
  { nr: "NR-06", t: "EPI", p: 78, s: "alerta" as const },
  { nr: "NR-07", t: "PCMSO", p: 85, s: "ok" as const },
  { nr: "NR-09", t: "Agentes físicos, químicos e biológicos", p: 74, s: "alerta" as const },
  { nr: "NR-10", t: "Instalações e serviços em eletricidade", p: 64, s: "critico" as const },
  { nr: "NR-11", t: "Movimentação de materiais", p: 90, s: "ok" as const },
  { nr: "NR-12", t: "Máquinas e equipamentos", p: 69, s: "alerta" as const },
  { nr: "NR-18", t: "Construção civil", p: 72, s: "alerta" as const },
  { nr: "NR-23", t: "Proteção contra incêndios", p: 83, s: "ok" as const },
  { nr: "NR-33", t: "Espaços confinados", p: 58, s: "critico" as const },
  { nr: "NR-35", t: "Trabalho em altura", p: 71, s: "alerta" as const },
];

function Requisitos() {
  return (
    <>
      <PageHeader titulo="Requisitos Legais" descricao="Matriz de conformidade com as NRs aplicáveis, com evidências vinculadas ao GED." />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="NRs aplicáveis" valor="12" />
        <Stat rotulo="Conformidade geral" valor="77%" tom="alerta" />
        <Stat rotulo="Requisitos críticos" valor="14" tom="critico" />
        <Stat rotulo="Evidências no GED" valor="1.964" tom="ok" />
      </div>
      <Panel titulo="Aderência por norma">
        <div className="grid gap-4 sm:grid-cols-2">
          {nrs.map((n) => (
            <div key={n.nr}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  {n.nr} <span className="font-normal text-muted-foreground">— {n.t}</span>
                </span>
                <span className="tabular-nums text-muted-foreground">{n.p}%</span>
              </div>
              <Barra valor={n.p} tom={n.s} />
            </div>
          ))}
        </div>
      </Panel>
      <Panel titulo="Requisitos com pendência">
        <Tabela
          colunas={["Norma", "Requisito", "Evidência exigida", "Responsável", "Prazo", "Status"]}
          linhas={[
            ["NR-33", "Supervisor de entrada capacitado", "Certificado 40h + ASO específico", "Eng. Marcos", "05/10", <Tag tom="critico">Pendente</Tag>],
            ["NR-10", "Prontuário das instalações elétricas", "PIE atualizado + diagramas", "Eng. Ana", "30/09", <Tag tom="critico">Pendente</Tag>],
            ["NR-12", "Apreciação de risco das prensas", "Laudo + adequação categoria", "Manutenção", "20/11", <Tag tom="alerta">Em curso</Tag>],
            ["NR-06", "Comprovação de entrega de EPI", "Ficha digital assinada", "Almoxarifado", "Contínuo", <Tag tom="alerta">Parcial</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
