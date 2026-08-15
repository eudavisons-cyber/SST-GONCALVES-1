import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/documentos")({
  head: () => meta("Laudos e GED — Sentinela SST", "Emissão de LTCAT, LIP, AEP/AET e repositório documental com controle de versão e assinatura digital."),
  component: Documentos,
});

function Documentos() {
  return (
    <>
      <PageHeader
        titulo="Documentos e Laudos"
        descricao="Emissor de laudos técnicos e GED com versionamento e assinatura digital ICP-Brasil."
        acoes={<Button size="sm">Novo laudo</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Documentos no GED" valor="4.318" />
        <Stat rotulo="Vencendo em 90d" valor="9" tom="alerta" />
        <Stat rotulo="Aguardando assinatura" valor="6" tom="critico" />
        <Stat rotulo="Assinados digitalmente" valor="98%" tom="ok" />
      </div>
      <Panel titulo="Laudos e programas">
        <Tabela
          colunas={["Documento", "Unidade", "Versão", "Emissão", "Validade", "Responsável", "Status"]}
          linhas={[
            ["PGR — Programa de Gerenciamento de Riscos", "Matriz", "v4.2", "10/02/2026", "10/02/2028", "Eng. Marcos", <Tag tom="ok">Vigente</Tag>],
            ["PCMSO", "Todas", "v3.0", "05/01/2026", "05/01/2027", "Dra. Helena", <Tag tom="ok">Vigente</Tag>],
            ["LTCAT", "Obra Norte", "v1.3", "18/09/2025", "15/09/2026", "Eng. Marcos", <Tag tom="alerta">Em revisão</Tag>],
            ["LIP — Laudo de Insalubridade", "Produção", "v2.0", "22/03/2026", "22/03/2028", "Eng. Ana", <Tag tom="ok">Vigente</Tag>],
            ["AET — Análise Ergonômica", "Logística", "v1.0", "30/06/2026", "30/06/2028", "Fisio. Beatriz", <Tag tom="critico">A assinar</Tag>],
            ["AEP — Avaliação Ergonômica Preliminar", "Administrativo", "v1.1", "12/05/2026", "12/05/2027", "Fisio. Beatriz", <Tag tom="ok">Vigente</Tag>],
          ]}
        />
      </Panel>
      <Panel titulo="Repositório GED — últimas movimentações">
        <Tabela
          colunas={["Arquivo", "Pasta", "Versão", "Autor", "Data"]}
          linhas={[
            ["ordem-servico-nr01-eletricista.pdf", "Ordens de Serviço", "v2", "Juliana Alves", "15/08 14:22"],
            ["ata-cipa-08-2026.pdf", "CIPA/2026", "v1", "Secretário CIPA", "13/08 09:10"],
            ["laudo-audiometria-lote-agosto.zip", "PCMSO/Exames", "v1", "Clínica Vida", "12/08 17:45"],
            ["ltcat-obra-norte-rev.docx", "Laudos", "v1.4-rascunho", "Eng. Marcos", "11/08 11:03"],
          ]}
        />
      </Panel>
    </>
  );
}
