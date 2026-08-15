import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Barra, PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Painel Geral — Sentinela SST",
      "Indicadores de SST em tempo real: taxa de frequência e gravidade, exames vencidos, ações pendentes e treinamentos a vencer.",
    ),
  component: Painel,
});

const acidentes = [
  { mes: "Jan", tf: 3.1, tg: 42 },
  { mes: "Fev", tf: 2.6, tg: 31 },
  { mes: "Mar", tf: 3.9, tg: 58 },
  { mes: "Abr", tf: 2.2, tg: 27 },
  { mes: "Mai", tf: 1.8, tg: 19 },
  { mes: "Jun", tf: 2.4, tg: 34 },
];

const conformidade = [
  { nr: "NR-01", pct: 92 },
  { nr: "NR-06", pct: 78 },
  { nr: "NR-07", pct: 85 },
  { nr: "NR-10", pct: 64 },
  { nr: "NR-35", pct: 71 },
];

function Painel() {
  return (
    <>
      <PageHeader
        titulo="Painel Geral"
        descricao="Visão macro dos indicadores de segurança e saúde ocupacional — atualizado há 4 minutos."
        acoes={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link to="/alertas">Ver alertas</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/acidentes">Abrir CAT</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat rotulo="Taxa de Frequência" valor="2,41" detalhe="Acidentes por milhão de HHT — meta 2,00" tom="alerta" />
        <Stat rotulo="Taxa de Gravidade" valor="34" detalhe="Dias perdidos por milhão de HHT" tom="critico" />
        <Stat rotulo="Exames vencidos" valor="27" detalhe="18 periódicos • 9 mudança de risco" tom="critico" />
        <Stat rotulo="Ações pendentes (GRO)" valor="46" detalhe="12 em atraso no 5W2H" tom="alerta" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel titulo="Acidentabilidade — 6 meses" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={acidentes}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    color: "var(--color-foreground)",
                  }}
                />
                <Line type="monotone" dataKey="tf" name="Freq." stroke="var(--color-chart-1)" strokeWidth={2} />
                <Line type="monotone" dataKey="tg" name="Grav." stroke="var(--color-chart-4)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel titulo="Conformidade por NR">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conformidade} layout="vertical">
                <CartesianGrid stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="nr" stroke="var(--color-muted-foreground)" fontSize={12} width={52} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                  }}
                />
                <Bar dataKey="pct" name="% conforme" fill="var(--color-chart-2)" radius={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel titulo="Prazos críticos (próximos 30 dias)">
          <Tabela
            colunas={["Item", "Módulo", "Vencimento", "Status"]}
            linhas={[
              ["ASO periódico — 18 colaboradores", "PCMSO", "22/08", <Tag tom="critico">Vencido</Tag>],
              ["Reciclagem NR-35 — Turma B", "Treinamentos", "29/08", <Tag tom="alerta">7 dias</Tag>],
              ["C.A. 31.469 — Luva nitrílica", "EPI", "02/09", <Tag tom="alerta">11 dias</Tag>],
              ["LTCAT — Unidade Obra Norte", "Documentos", "15/09", <Tag tom="info">Em revisão</Tag>],
              ["Eleição CIPA — edital", "CIPA", "20/09", <Tag tom="ok">No prazo</Tag>],
            ]}
          />
        </Panel>

        <Panel titulo="Progresso operacional">
          <div className="space-y-4">
            {[
              { label: "PGR revisado por unidade", valor: 82, tom: "ok" as const },
              { label: "Treinamentos obrigatórios em dia", valor: 67, tom: "alerta" as const },
              { label: "Fichas de EPI assinadas digitalmente", valor: 94, tom: "ok" as const },
              { label: "Eventos eSocial transmitidos sem erro", valor: 71, tom: "alerta" as const },
              { label: "Inspeções de EPC do mês", valor: 45, tom: "critico" as const },
            ].map((i) => (
              <div key={i.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-foreground/90">{i.label}</span>
                  <span className="font-semibold tabular-nums text-muted-foreground">{i.valor}%</span>
                </div>
                <Barra valor={i.valor} tom={i.tom} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
