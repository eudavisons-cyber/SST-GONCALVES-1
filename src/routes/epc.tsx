import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/epc")({
  head: () => meta("Inspeção de EPCs — Sentinela SST", "Manutenção e inspeção de extintores, hidrantes, iluminação de emergência e proteções coletivas."),
  component: Epc,
});

function Epc() {
  return (
    <>
      <PageHeader
        titulo="Inspeção de EPCs"
        descricao="Rotas de inspeção por QR Code em extintores, hidrantes, alarmes e proteções de máquinas."
        acoes={<Button size="sm">Iniciar inspeção</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="EPCs cadastrados" valor="742" />
        <Stat rotulo="Inspeções do mês" valor="45%" detalhe="Meta 100% até o dia 25" tom="critico" />
        <Stat rotulo="Não conformes" valor="27" tom="alerta" />
        <Stat rotulo="Recargas a vencer" valor="14" detalhe="Extintores — próximos 60 dias" tom="alerta" />
      </div>
      <Panel titulo="Equipamentos por tipo">
        <Tabela
          colunas={["Tipo", "Quantidade", "Última inspeção", "Próxima", "Conformidade"]}
          linhas={[
            ["Extintores (ABC/CO2)", "318", "02/07", "18/08", <Tag tom="alerta">86%</Tag>],
            ["Hidrantes e mangueiras", "64", "12/08", "12/09", <Tag tom="ok">97%</Tag>],
            ["Iluminação de emergência", "212", "05/08", "05/09", <Tag tom="alerta">78%</Tag>],
            ["Proteções de máquinas (NR-12)", "118", "10/08", "10/09", <Tag tom="critico">64%</Tag>],
            ["Chuveiro / lava-olhos", "30", "14/08", "14/09", <Tag tom="ok">100%</Tag>],
          ]}
        />
      </Panel>
      <Panel titulo="Não conformidades abertas">
        <Tabela
          colunas={["EPC", "Local", "Achado", "Prazo", "Responsável", "Status"]}
          linhas={[
            ["Extintor EX-114", "Ala B", "Manômetro despressurizado", "20/08", "Manutenção", <Tag tom="critico">Atrasado</Tag>],
            ["Luminária EM-38", "Corredor 3", "Bateria não sustenta 1h", "25/08", "Elétrica", <Tag tom="alerta">Aberto</Tag>],
            ["Proteção PR-07", "Prensa 04", "Sensor de cortina desalinhado", "18/08", "Eng. Marcos", <Tag tom="alerta">Aberto</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
