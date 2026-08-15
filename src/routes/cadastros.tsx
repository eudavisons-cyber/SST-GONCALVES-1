import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/cadastros")({
  head: () => meta("Empresas e Unidades — Sentinela SST", "Cadastro de matriz, filiais, obras e prestadores de serviço com CNAE, grau de risco e responsáveis técnicos."),
  component: Cadastros,
});

function Cadastros() {
  return (
    <>
      <PageHeader
        titulo="Empresas e Unidades"
        descricao="Estrutura societária e operacional: matriz, filiais, obras (CNO) e prestadores de serviço."
        acoes={<Button size="sm">Nova unidade</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Empresas" valor="4" tom="info" />
        <Stat rotulo="Unidades" valor="17" detalhe="9 filiais • 6 obras • 2 CDs" />
        <Stat rotulo="Prestadores" valor="23" detalhe="8 com pendência documental" tom="alerta" />
        <Stat rotulo="Colaboradores ativos" valor="1.482" tom="ok" />
      </div>
      <Panel titulo="Unidades cadastradas">
        <Tabela
          colunas={["Unidade", "Tipo", "CNPJ / CNO", "CNAE", "Grau de risco", "PGR", "Status"]}
          linhas={[
            ["Matriz — Fortaleza/CE", "Matriz", "12.345.678/0001-90", "4120-4/00", "3", "Vigente", <Tag tom="ok">Ativa</Tag>],
            ["Filial Caucaia", "Filial", "12.345.678/0002-71", "4744-0/01", "3", "Vigente", <Tag tom="ok">Ativa</Tag>],
            ["Obra Norte — Maracanaú", "Obra", "CNO 12.345.67890/12", "4211-1/01", "4", "Revisão", <Tag tom="alerta">Atenção</Tag>],
            ["CD Pecém", "Centro de distribuição", "12.345.678/0005-14", "5211-7/01", "3", "Vigente", <Tag tom="ok">Ativa</Tag>],
            ["Alfa Manutenção Ltda.", "Prestador", "98.765.432/0001-10", "3314-7/10", "3", "Pendente", <Tag tom="critico">Bloqueada</Tag>],
          ]}
        />
      </Panel>
      <Panel titulo="Responsáveis técnicos">
        <Tabela
          colunas={["Nome", "Função", "Registro", "Unidades", "Validade"]}
          linhas={[
            ["Marcos Teixeira", "Eng. de Segurança", "CREA 12345-D", "Matriz, Obra Norte", "12/2027"],
            ["Dra. Helena Costa", "Médica Coordenadora PCMSO", "CRM 45678", "Todas", "06/2027"],
            ["Juliana Alves", "Téc. de Segurança", "MTE 004512", "Filial Caucaia, CD Pecém", "—"],
          ]}
        />
      </Panel>
    </>
  );
}
