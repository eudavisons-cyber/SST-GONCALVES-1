import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/agenda-clinica")({
  head: () => meta("Agenda Clínica — Sentinela SST", "Agendamento e controle de consultas e exames complementares com clínicas credenciadas."),
  component: Agenda,
});

const horarios = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00"];
const dias = ["Seg 18", "Ter 19", "Qua 20", "Qui 21", "Sex 22"];

function Agenda() {
  return (
    <>
      <PageHeader
        titulo="Agenda Clínica"
        descricao="Marcação integrada com clínicas credenciadas e ambulatório próprio."
        acoes={<Button size="sm">Agendar exame</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Agendados na semana" valor="88" tom="info" />
        <Stat rotulo="Confirmados" valor="61" tom="ok" />
        <Stat rotulo="Faltas" valor="9" tom="critico" />
        <Stat rotulo="Clínicas credenciadas" valor="7" />
      </div>
      <Panel titulo="Semana de 18 a 22/08 — Ambulatório Matriz">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-xs">
            <thead>
              <tr>
                <th className="w-16" />
                {dias.map((d) => (
                  <th key={d} className="pb-2 text-center font-semibold uppercase tracking-wide text-muted-foreground">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarios.map((h, i) => (
                <tr key={h}>
                  <td className="pr-2 text-right text-muted-foreground">{h}</td>
                  {dias.map((d, j) => {
                    const ocupado = (i + j) % 3 !== 0;
                    return (
                      <td key={d} className="p-1">
                        <div
                          className={
                            ocupado
                              ? "rounded border border-primary/40 bg-primary/10 px-2 py-2 text-[11px] text-primary"
                              : "rounded border border-dashed border-border px-2 py-2 text-[11px] text-muted-foreground"
                          }
                        >
                          {ocupado ? ((i + j) % 2 ? "Audiometria" : "Clínico") : "Livre"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel titulo="Próximos atendimentos">
        <Tabela
          colunas={["Data/hora", "Colaborador", "Exame", "Clínica", "Status"]}
          linhas={[
            ["18/08 07:30", "Rafael Souza", "Audiometria + Clínico", "Clínica Vida", <Tag tom="ok">Confirmado</Tag>],
            ["18/08 09:00", "Jonas Lima", "RX tórax OIT", "Imagem Norte", <Tag tom="alerta">Aguardando</Tag>],
            ["19/08 08:00", "Camila Nunes", "Acuidade visual", "Ambulatório Matriz", <Tag tom="ok">Confirmado</Tag>],
            ["20/08 10:00", "Ana Paula Reis", "Espirometria", "Clínica Vida", <Tag tom="critico">Reagendar</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
