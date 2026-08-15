import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/absenteismo")({
  head: () => meta("Absenteísmo e Licenças — Sentinela SST", "Controle de atestados médicos, afastamentos previdenciários e indicadores de absenteísmo por setor e CID."),
  component: Absenteismo,
});

const dados = [
  { setor: "Produção", dias: 142 },
  { setor: "Manutenção", dias: 88 },
  { setor: "Logística", dias: 96 },
  { setor: "Obra Norte", dias: 71 },
  { setor: "Admin.", dias: 34 },
];

function Absenteismo() {
  return (
    <>
      <PageHeader titulo="Absenteísmo e Licenças" descricao="Atestados, afastamentos e dias perdidos com análise por CID e setor." />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Taxa de absenteísmo" valor="3,8%" detalhe="Meta 2,5%" tom="alerta" />
        <Stat rotulo="Dias perdidos (mês)" valor="431" tom="critico" />
        <Stat rotulo="Afastados > 15 dias" valor="11" detalhe="Encaminhados ao INSS" tom="info" />
        <Stat rotulo="Atestados recebidos" valor="197" tom="neutro" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel titulo="Dias perdidos por setor">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dados}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="setor" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6 }} />
                <Bar dataKey="dias" name="Dias" fill="var(--color-chart-1)" radius={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel titulo="Principais CIDs">
          <Tabela
            colunas={["CID", "Descrição", "Casos", "Dias"]}
            linhas={[
              ["M54.5", "Dor lombar", "38", "121"],
              ["F41.1", "Ansiedade generalizada", "21", "94"],
              ["S62", "Fratura de mão/punho", "9", "76"],
              ["J06", "Infecção respiratória", "44", "62"],
            ]}
          />
        </Panel>
      </div>
      <Panel titulo="Afastamentos em curso">
        <Tabela
          colunas={["Colaborador", "Início", "Previsão de retorno", "Motivo", "Natureza", "Status"]}
          linhas={[
            ["Ana Paula Reis", "22/07", "05/09", "M54.5 — lombalgia", "Previdenciária", <Tag tom="info">INSS</Tag>],
            ["Diego Farias", "05/08", "20/08", "Acidente de trabalho", "Acidentária (B91)", <Tag tom="critico">CAT aberta</Tag>],
            ["Sônia Prado", "12/08", "17/08", "J06 — gripe", "Atestado", <Tag tom="ok">Curta duração</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
