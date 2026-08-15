import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/pcmso")({
  head: () => meta("PCMSO e ASO — Sentinela SST", "Matriz de exames por cargo, periodicidade, vínculo com agentes nocivos e emissão de Atestados de Saúde Ocupacional."),
  component: Pcmso,
});

function Pcmso() {
  return (
    <>
      <PageHeader
        titulo="PCMSO — Exames e ASO"
        descricao="Configuração da matriz de exames por cargo e emissão de Atestados de Saúde Ocupacional."
        acoes={<Button size="sm">Emitir ASO</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="ASOs no mês" valor="212" tom="ok" />
        <Stat rotulo="Exames vencidos" valor="27" tom="critico" />
        <Stat rotulo="A vencer em 30d" valor="64" tom="alerta" />
        <Stat rotulo="Inaptos / restrição" valor="34" tom="info" />
      </div>

      <Tabs defaultValue="matriz">
        <TabsList>
          <TabsTrigger value="matriz">Matriz por cargo</TabsTrigger>
          <TabsTrigger value="agentes">Por agente nocivo</TabsTrigger>
          <TabsTrigger value="aso">ASOs emitidos</TabsTrigger>
        </TabsList>

        <TabsContent value="matriz" className="mt-4">
          <Panel titulo="Matriz de exames por cargo">
            <Tabela
              colunas={["Cargo", "Exames exigidos", "Admissional", "Periódico", "Retorno", "Mudança de risco", "Demissional"]}
              linhas={[
                ["Eletricista", "Clínico, Audiometria, ECG, Glicemia", "Sim", "12 meses", "Sim", "Sim", "Sim"],
                ["Operador de máquinas", "Clínico, Audiometria, Acuidade visual", "Sim", "12 meses", "Sim", "Sim", "Sim"],
                ["Pintor industrial", "Clínico, Hemograma, TGO/TGP, Espirometria", "Sim", "6 meses", "Sim", "Sim", "Sim"],
                ["Servente de obras", "Clínico, RX tórax, Audiometria", "Sim", "12 meses", "Sim", "Sim", "Sim"],
                ["Analista administrativo", "Clínico", "Sim", "24 meses", "Sim", "Não", "Sim"],
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="agentes" className="mt-4">
          <Panel titulo="Vinculação automática exame x agente nocivo (inventário PGR)">
            <Tabela
              colunas={["Agente nocivo", "Origem", "Exame vinculado", "Periodicidade", "Regra"]}
              linhas={[
                ["Ruído > 85 dB(A)", "GHE 04 — Manutenção", "Audiometria tonal", "12 meses", <Tag tom="ok">Automática</Tag>],
                ["Hidrocarbonetos aromáticos", "GHE 07 — Pintura", "Hemograma + TGO/TGP", "6 meses", <Tag tom="ok">Automática</Tag>],
                ["Poeira mineral (sílica)", "GHE 12 — Obra", "RX tórax OIT + espirometria", "12 meses", <Tag tom="ok">Automática</Tag>],
                ["Sobrecarga biomecânica", "GHE 18 — Logística", "Avaliação osteomuscular", "12 meses", <Tag tom="alerta">Revisar</Tag>],
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="aso" className="mt-4">
          <Panel titulo="ASOs emitidos">
            <Tabela
              colunas={["Data", "Colaborador", "Tipo", "Médico examinador", "Conclusão", "eSocial S-2220"]}
              linhas={[
                ["14/08", "Camila Nunes", "Periódico", "Dra. Helena Costa", <Tag tom="ok">Apta</Tag>, <Tag tom="ok">Transmitido</Tag>],
                ["13/08", "Jonas Lima", "Admissional", "Dr. Paulo Vieira", <Tag tom="alerta">Apta c/ restrição</Tag>, <Tag tom="alerta">Pendente</Tag>],
                ["12/08", "Rafael Souza", "Mudança de risco", "Dra. Helena Costa", <Tag tom="critico">Inapto temporário</Tag>, <Tag tom="ok">Transmitido</Tag>],
                ["09/08", "Wesley Braga", "Retorno ao trabalho", "Dr. Paulo Vieira", <Tag tom="ok">Apto</Tag>, <Tag tom="ok">Transmitido</Tag>],
              ]}
            />
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}
