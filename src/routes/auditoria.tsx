import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/auditoria")({
  head: () => meta("Checklists e Não Conformidades — Sentinela SST", "Inspeções de campo personalizadas via app mobile offline, RNC e gestão de ações corretivas."),
  component: Auditoria,
});

function Auditoria() {
  return (
    <>
      <PageHeader
        titulo="Auditoria e Não Conformidades"
        descricao="Checklists de inspeção executados no app mobile (modo offline) e tratativa de RNCs."
        acoes={<Button size="sm">Novo checklist</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Inspeções no mês" valor="132" tom="ok" />
        <Stat rotulo="RNCs abertas" valor="38" tom="alerta" />
        <Stat rotulo="Reincidentes" valor="7" tom="critico" />
        <Stat rotulo="Sincronizações offline" valor="24" detalhe="Coletas enviadas ao reconectar" tom="info" />
      </div>
      <Panel titulo="Checklists aplicados">
        <Tabela
          colunas={["Checklist", "Local", "Auditor", "Data", "Itens", "Conformidade"]}
          linhas={[
            ["Inspeção de andaimes (NR-18)", "Obra Norte", "Juliana Alves", "15/08", "32", <Tag tom="alerta">81%</Tag>],
            ["Bloqueio LOTO (NR-10/12)", "Manutenção", "Marcos Teixeira", "14/08", "18", <Tag tom="critico">67%</Tag>],
            ["Ordem e limpeza 5S", "Produção", "Sup. Lucas", "13/08", "24", <Tag tom="ok">96%</Tag>],
            ["Empilhadeiras (NR-11)", "Logística", "Wesley Braga", "12/08", "15", <Tag tom="ok">93%</Tag>],
          ]}
        />
      </Panel>
      <Panel titulo="Relatórios de Não Conformidade (RNC)">
        <Tabela
          colunas={["RNC", "Origem", "Descrição", "Ação corretiva", "Responsável", "Prazo", "Status"]}
          linhas={[
            ["RNC-0142", "Inspeção LOTO", "Kit de bloqueio incompleto", "Padronizar kits + inventário", "Eng. Marcos", "30/08", <Tag tom="alerta">Em curso</Tag>],
            ["RNC-0141", "Andaimes", "Ausência de rodapé", "Instalar rodapés e treinar montadores", "Encarregado Jonas", "18/08", <Tag tom="critico">Atrasada</Tag>],
            ["RNC-0138", "Auditoria interna", "OS de NR-01 sem assinatura", "Assinatura digital obrigatória", "RH / SST", "05/09", <Tag tom="info">Planejada</Tag>],
            ["RNC-0130", "Cliente auditor", "Extintor obstruído", "Demarcação de piso", "Manutenção", "01/08", <Tag tom="ok">Concluída</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
