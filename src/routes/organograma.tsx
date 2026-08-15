import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tabela, Tag } from "@/components/sst/kit";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/organograma")({
  head: () => meta("Organograma Operacional — Sentinela SST", "Setores, cargos, funções e mapeamento de processos vinculados aos riscos e exigências legais."),
  component: Organograma,
});

const setores = [
  { setor: "Produção", cargos: ["Operador de máquinas", "Auxiliar de produção", "Líder de célula"], risco: "Ruído, vibração, mecânico" },
  { setor: "Manutenção", cargos: ["Eletricista", "Mecânico industrial"], risco: "Elétrico (NR-10), altura (NR-35), espaço confinado" },
  { setor: "Logística", cargos: ["Operador de empilhadeira", "Conferente"], risco: "Movimentação de cargas, ergonômico" },
  { setor: "Administrativo", cargos: ["Analista", "Assistente"], risco: "Ergonômico, psicossocial" },
  { setor: "Obra Norte", cargos: ["Servente", "Carpinteiro", "Encarregado"], risco: "Altura, escavação, poeira mineral" },
];

function Organograma() {
  return (
    <>
      <PageHeader titulo="Organograma Operacional" descricao="Setores, cargos e funções mapeados por processo — base para matriz de riscos, exames e treinamentos." />
      <div className="grid gap-4 lg:grid-cols-2">
        {setores.map((s) => (
          <Panel key={s.setor} titulo={s.setor}>
            <div className="flex flex-wrap gap-1.5">
              {s.cargos.map((c) => (
                <span key={c} className="rounded border border-border bg-secondary px-2 py-1 text-xs text-foreground/90">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Riscos predominantes: {s.risco}</p>
          </Panel>
        ))}
      </div>
      <Panel titulo="Mapeamento de processos críticos">
        <Tabela
          colunas={["Processo", "Setor", "Atividade crítica", "NR aplicável", "Status"]}
          linhas={[
            ["Manutenção elétrica", "Manutenção", "Intervenção em painel energizado", "NR-10", <Tag tom="critico">Alto risco</Tag>],
            ["Limpeza de silo", "Produção", "Entrada em espaço confinado", "NR-33", <Tag tom="critico">Alto risco</Tag>],
            ["Montagem de estrutura", "Obra Norte", "Trabalho em altura > 2m", "NR-35", <Tag tom="alerta">Controlado</Tag>],
            ["Abastecimento de linha", "Logística", "Operação de empilhadeira", "NR-11", <Tag tom="ok">Monitorado</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
