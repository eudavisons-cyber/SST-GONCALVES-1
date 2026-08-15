import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/treinamentos")({
  head: () => meta("Treinamentos e Capacitação — Sentinela SST", "Matriz de treinamentos obrigatórios por cargo (NR-10, NR-33, NR-35), turmas, presença e certificados."),
  component: Treinamentos,
});

function Treinamentos() {
  return (
    <>
      <PageHeader
        titulo="Treinamentos e Capacitação"
        descricao="Matriz de obrigatoriedades por cargo, gestão de turmas e controle de validade das reciclagens."
        acoes={<Button size="sm">Abrir turma</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Aderência à matriz" valor="67%" tom="alerta" />
        <Stat rotulo="Vencidos" valor="41" detalhe="Bloqueio na catraca sugerido" tom="critico" />
        <Stat rotulo="A vencer em 60d" valor="128" tom="alerta" />
        <Stat rotulo="Certificados emitidos" valor="1.204" tom="ok" />
      </div>

      <Tabs defaultValue="matriz">
        <TabsList>
          <TabsTrigger value="matriz">Matriz por cargo</TabsTrigger>
          <TabsTrigger value="turmas">Turmas</TabsTrigger>
          <TabsTrigger value="validade">Validade e acesso</TabsTrigger>
        </TabsList>

        <TabsContent value="matriz" className="mt-4">
          <Panel titulo="Obrigatoriedades por cargo">
            <Tabela
              colunas={["Cargo", "NR-06", "NR-10", "NR-11", "NR-12", "NR-33", "NR-35", "Reciclagem"]}
              linhas={[
                ["Eletricista", "Sim", "Sim (40h)", "—", "Sim", "Sim", "Sim", "Bienal"],
                ["Operador de máquinas", "Sim", "—", "—", "Sim (8h)", "—", "—", "Bienal"],
                ["Op. de empilhadeira", "Sim", "—", "Sim (16h)", "—", "—", "—", "Trienal"],
                ["Servente de obras", "Sim", "—", "—", "—", "—", "Sim (8h)", "Bienal"],
                ["Brigadista", "Sim", "—", "—", "—", "—", "—", "Anual"],
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="turmas" className="mt-4">
          <Panel titulo="Turmas ativas">
            <Tabela
              colunas={["Turma", "Treinamento", "Instrutor", "Data", "Vagas", "Presença", "Certificados"]}
              linhas={[
                ["T-2026-041", "NR-35 Trabalho em altura", "Marcos Teixeira", "26/08", "20/24", <Tag tom="alerta">Aberta</Tag>, <Tag tom="neutro">Pendente</Tag>],
                ["T-2026-040", "NR-10 Reciclagem", "SENAI", "29/08", "9/12", <Tag tom="alerta">Aberta</Tag>, <Tag tom="neutro">Pendente</Tag>],
                ["T-2026-038", "NR-11 Empilhadeira", "Juliana Alves", "08/08", "14/14", <Tag tom="ok">100%</Tag>, <Tag tom="ok">Emitidos</Tag>],
                ["T-2026-036", "Integração de SST", "Interno", "01/08", "31/31", <Tag tom="ok">97%</Tag>, <Tag tom="ok">Emitidos</Tag>],
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="validade" className="mt-4">
          <Panel titulo="Integração com controle de acesso (catracas)">
            <Tabela
              colunas={["Colaborador", "Treinamento", "Validade", "Situação", "Acesso à área"]}
              linhas={[
                ["Rafael Souza", "NR-10", "29/08/2026", <Tag tom="alerta">7 dias</Tag>, <Tag tom="ok">Liberado</Tag>],
                ["Jonas Lima", "NR-35", "—", <Tag tom="critico">Ausente</Tag>, <Tag tom="critico">Bloqueado</Tag>],
                ["Wesley Braga", "NR-11", "12/09/2026", <Tag tom="alerta">A vencer</Tag>, <Tag tom="ok">Liberado</Tag>],
                ["Camila Nunes", "NR-12", "04/02/2027", <Tag tom="ok">Vigente</Tag>, <Tag tom="ok">Liberado</Tag>],
              ]}
            />
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}
