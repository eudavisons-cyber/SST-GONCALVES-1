import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/cipa")({
  head: () => meta("CIPA e Brigada de Emergência — Sentinela SST", "Processo eleitoral da CIPA, atas de reunião, SIPAT, brigada e simulados de emergência."),
  component: Cipa,
});

function Cipa() {
  return (
    <>
      <PageHeader
        titulo="CIPA e Brigada"
        descricao="Cronograma eleitoral automatizado, atas de reuniões, SIPAT e simulados."
        acoes={<Button size="sm">Nova ata</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Membros eleitos" valor="8" detalhe="4 titulares • 4 suplentes" tom="ok" />
        <Stat rotulo="Reuniões no ano" valor="8/12" tom="alerta" />
        <Stat rotulo="Brigadistas" valor="42" detalhe="Reciclagem anual" tom="info" />
        <Stat rotulo="Simulados realizados" valor="2" tom="ok" />
      </div>
      <Panel titulo="Cronograma eleitoral — Gestão 2026/2027">
        <Tabela
          colunas={["Etapa", "Prazo legal", "Data", "Status"]}
          linhas={[
            ["Convocação da eleição", "60 dias antes do término", "20/09", <Tag tom="ok">Concluída</Tag>],
            ["Publicação do edital", "45 dias antes", "05/10", <Tag tom="alerta">Em curso</Tag>],
            ["Inscrição de candidatos", "15 dias mínimos", "06/10 a 21/10", <Tag tom="info">Planejada</Tag>],
            ["Votação", "30 dias antes do término", "10/11", <Tag tom="info">Planejada</Tag>],
            ["Ata de posse e treinamento", "Até o início da gestão", "01/12", <Tag tom="info">Planejada</Tag>],
          ]}
        />
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel titulo="Atas de reunião">
          <Tabela
            colunas={["Nº", "Tipo", "Data", "Pendências"]}
            linhas={[
              ["08/2026", "Ordinária", "12/08", "3 abertas"],
              ["07/2026", "Extraordinária (CAT 0014)", "06/08", "1 aberta"],
              ["06/2026", "Ordinária", "10/07", "Nenhuma"],
            ]}
          />
        </Panel>
        <Panel titulo="SIPAT e simulados">
          <Tabela
            colunas={["Evento", "Data", "Participação", "Status"]}
            linhas={[
              ["SIPAT 2026 — 5 dias", "20 a 24/10", "—", <Tag tom="info">Planejada</Tag>],
              ["Simulado de abandono", "18/06", "92%", <Tag tom="ok">Concluído</Tag>],
              ["Simulado de vazamento químico", "14/11", "—", <Tag tom="info">Planejado</Tag>],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
