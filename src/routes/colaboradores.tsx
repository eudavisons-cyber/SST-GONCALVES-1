import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/colaboradores")({
  head: () => meta("Colaboradores — Sentinela SST", "Ficha individual do trabalhador com histórico ocupacional, alocações, restrições, exames, EPIs e treinamentos."),
  component: Colaboradores,
});

function Colaboradores() {
  return (
    <>
      <PageHeader
        titulo="Colaboradores"
        descricao="Ficha individual com histórico ocupacional, alocações, restrições e pendências de SST."
        acoes={<Button size="sm">Admitir colaborador</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Ativos" valor="1.482" tom="ok" />
        <Stat rotulo="Com restrição" valor="34" detalhe="Aptos com restrição / inaptos temporários" tom="alerta" />
        <Stat rotulo="Afastados" valor="19" detalhe="11 INSS • 8 atestado" tom="info" />
        <Stat rotulo="Pendências SST" valor="93" detalhe="Exame, treinamento ou EPI" tom="critico" />
      </div>
      <Panel titulo="Lista de colaboradores">
        <Tabela
          colunas={["Matrícula", "Nome", "Cargo", "Unidade", "ASO", "Treinamentos", "EPI"]}
          linhas={[
            ["10432", "Rafael Souza", "Eletricista", "Manutenção", <Tag tom="critico">Vencido</Tag>, <Tag tom="alerta">NR-10 a vencer</Tag>, <Tag tom="ok">Em dia</Tag>],
            ["10488", "Camila Nunes", "Operadora de máquinas", "Produção", <Tag tom="ok">Em dia</Tag>, <Tag tom="ok">Em dia</Tag>, <Tag tom="alerta">Troca devida</Tag>],
            ["10501", "Jonas Lima", "Servente", "Obra Norte", <Tag tom="alerta">Vence 09/09</Tag>, <Tag tom="critico">NR-35 ausente</Tag>, <Tag tom="ok">Em dia</Tag>],
            ["10515", "Patrícia Melo", "Analista de RH", "Administrativo", <Tag tom="ok">Em dia</Tag>, <Tag tom="ok">Em dia</Tag>, <Tag tom="neutro">N/A</Tag>],
            ["10530", "Wesley Braga", "Operador de empilhadeira", "Logística", <Tag tom="ok">Em dia</Tag>, <Tag tom="alerta">NR-11 a vencer</Tag>, <Tag tom="ok">Em dia</Tag>],
          ]}
        />
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel titulo="Ficha — Rafael Souza (10432)">
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Admissão", "14/03/2019"],
              ["Cargo atual", "Eletricista de manutenção"],
              ["Setor / GHE", "Manutenção — GHE 04"],
              ["Riscos expostos", "Elétrico, ruído 87 dB(A)"],
              ["Restrição", "Sem trabalho em altura até 30/09"],
              ["Último ASO", "Periódico — 20/07/2025"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{k}</dt>
                <dd className="text-foreground/90">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel titulo="Histórico ocupacional">
          <Tabela
            colunas={["Período", "Cargo", "Setor", "Agente nocivo"]}
            linhas={[
              ["2019–2021", "Auxiliar de manutenção", "Manutenção", "Ruído 84 dB(A)"],
              ["2021–2023", "Eletricista I", "Manutenção", "Elétrico, ruído 86 dB(A)"],
              ["2023–atual", "Eletricista", "Manutenção", "Elétrico, ruído 87 dB(A)"],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
