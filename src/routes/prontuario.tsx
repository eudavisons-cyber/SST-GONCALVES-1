import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { PageHeader, Panel, Tabela, Tag } from "@/components/sst/kit";
import { meta } from "@/lib/sst-meta";
import { useAuth } from "@/lib/sst-auth";

export const Route = createFileRoute("/prontuario")({
  head: () => meta("Prontuário Eletrônico — Sentinela SST", "Histórico médico confidencial do trabalhador com acesso restrito ao médico coordenador e examinador."),
  component: Prontuario,
});

function Prontuario() {
  const { usuario, hidratado } = useAuth();
  const autorizado = usuario?.perfil === "medico";

  if (hidratado && !autorizado) {
    return (
      <>
        <PageHeader titulo="Prontuário Eletrônico" descricao="Área de sigilo médico." />
        <Panel>
          <div className="flex items-center gap-3 text-sm">
            <Lock className="size-5 text-destructive" />
            <p className="text-muted-foreground">
              Acesso restrito à equipe médica (médico coordenador / examinador). Entre com o perfil{" "}
              <strong className="text-foreground">Médico do Trabalho</strong> para visualizar.
            </p>
          </div>
        </Panel>
      </>
    );
  }

  return (
    <>
      <PageHeader
        titulo="Prontuário Eletrônico"
        descricao="Sigilo médico — todo acesso é registrado em log de auditoria (LGPD)."
        acoes={<Tag tom="critico">Confidencial</Tag>}
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Panel titulo="Paciente">
          <p className="text-lg font-semibold">Rafael Souza</p>
          <p className="text-xs text-muted-foreground">Matrícula 10432 • Eletricista • 38 anos</p>
          <dl className="mt-4 space-y-2 text-sm">
            {[
              ["Tipo sanguíneo", "O+"],
              ["Alergias", "Dipirona"],
              ["Comorbidades", "Hipertensão controlada"],
              ["Exposições", "Ruído 87 dB(A), risco elétrico"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right text-foreground/90">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel titulo="Evolução clínica">
          <Tabela
            colunas={["Data", "Tipo", "Registro", "Profissional"]}
            linhas={[
              ["12/08/2026", "Mudança de risco", "Perda auditiva induzida leve bilateral — afastar de ruído >85 dB", "Dra. Helena Costa"],
              ["20/07/2025", "Periódico", "Audiometria com limiar 30 dB em 4 kHz — monitorar", "Dra. Helena Costa"],
              ["03/02/2025", "Consulta ambulatorial", "Lombalgia mecânica — 2 dias de repouso", "Dr. Paulo Vieira"],
              ["14/03/2019", "Admissional", "Apto sem restrições", "Dr. Paulo Vieira"],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
