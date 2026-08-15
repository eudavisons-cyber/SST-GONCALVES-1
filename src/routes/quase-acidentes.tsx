import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/quase-acidentes")({
  head: () => meta("Quase-Acidentes e Desvios — Sentinela SST", "Módulo de relatos preventivos de desvios e condições inseguras, com tratativa e retorno ao relator."),
  component: QuaseAcidentes,
});

function QuaseAcidentes() {
  return (
    <>
      <PageHeader
        titulo="Quase-Acidentes e Desvios"
        descricao="Relatos preventivos abertos por qualquer colaborador, inclusive anônimos, pelo app mobile."
        acoes={<Button size="sm">Novo relato</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Relatos no mês" valor="86" tom="ok" />
        <Stat rotulo="Tratados" valor="64" tom="info" />
        <Stat rotulo="Em aberto" valor="22" tom="alerta" />
        <Stat rotulo="Índice de participação" valor="41%" detalhe="Colaboradores que já relataram" tom="ok" />
      </div>
      <Panel titulo="Relatos recentes">
        <Tabela
          colunas={["Data", "Local", "Relato", "Tipo", "Relator", "Tratativa"]}
          linhas={[
            ["15/08", "Ala B — Produção", "Piso escorregadio por vazamento de óleo", "Condição insegura", "Anônimo", <Tag tom="ok">Resolvido</Tag>],
            ["14/08", "Obra Norte", "Andaime sem rodapé", "Condição insegura", "Jonas Lima", <Tag tom="alerta">Em análise</Tag>],
            ["13/08", "Logística", "Empilhadeira em velocidade excessiva", "Desvio comportamental", "Wesley Braga", <Tag tom="alerta">Em análise</Tag>],
            ["11/08", "Manutenção", "Quase queda de ferramenta de 3 m", "Quase-acidente", "Rafael Souza", <Tag tom="critico">Ação pendente</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
