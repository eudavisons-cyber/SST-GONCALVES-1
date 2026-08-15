import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tag } from "@/components/sst/kit";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/alertas")({
  head: () => meta("Alertas e Notificações — Sentinela SST", "Avisos automáticos de prazos críticos de exames, treinamentos, C.A. de EPI, laudos e eventos do eSocial."),
  component: Alertas,
});

const alertas = [
  { t: "27 ASOs periódicos vencidos", m: "PCMSO", q: "critico", d: "Unidades Matriz e Obra Norte — bloqueio de acesso sugerido" },
  { t: "12 ações do 5W2H em atraso", m: "GRO", q: "critico", d: "Responsáveis notificados em 14/08" },
  { t: "NR-10 vence em 7 dias para 9 eletricistas", m: "Treinamentos", q: "alerta", d: "Turma de reciclagem sem agendamento" },
  { t: "C.A. 31.469 cancelado pelo MTE", m: "EPI", q: "critico", d: "Substituir item no estoque e refazer entregas" },
  { t: "3 eventos S-2240 com inconsistência", m: "eSocial", q: "alerta", d: "Código de agente nocivo divergente do PGR" },
  { t: "Extintores da Ala B sem inspeção mensal", m: "EPC", q: "alerta", d: "Última inspeção em 02/07" },
  { t: "Simulado de abandono realizado", m: "Brigada", q: "ok", d: "Relatório disponível no GED" },
];

function Alertas() {
  return (
    <>
      <PageHeader titulo="Alertas e Notificações" descricao="Motor de regras que monitora prazos legais e dispara avisos por e-mail, push e painel." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat rotulo="Críticos" valor="12" detalhe="Exigem ação imediata" tom="critico" />
        <Stat rotulo="Atenção" valor="34" detalhe="Vencem em até 30 dias" tom="alerta" />
        <Stat rotulo="Resolvidos no mês" valor="118" tom="ok" />
      </div>
      <Panel titulo="Fila de notificações">
        <ul className="divide-y divide-border/60">
          {alertas.map((a) => (
            <li key={a.t} className="flex flex-wrap items-start justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{a.t}</p>
                <p className="text-xs text-muted-foreground">{a.d}</p>
              </div>
              <div className="flex items-center gap-2">
                <Tag tom="neutro">{a.m}</Tag>
                <Tag tom={a.q as "critico" | "alerta" | "ok"}>
                  {a.q === "critico" ? "Crítico" : a.q === "alerta" ? "Atenção" : "OK"}
                </Tag>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
