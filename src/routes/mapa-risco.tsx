import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/mapa-risco")({
  head: () => meta("Mapas de Risco — Sentinela SST", "Gerador visual de mapa de risco por ambiente com círculos proporcionais e legenda por tipo de agente."),
  component: MapaRisco,
});

const pontos = [
  { x: 18, y: 24, cor: "bg-chart-2", tam: 56, nome: "Ruído — Prensa 04" },
  { x: 52, y: 18, cor: "bg-destructive", tam: 40, nome: "Mecânico — Serra" },
  { x: 72, y: 46, cor: "bg-chart-1", tam: 48, nome: "Químico — Cabine de pintura" },
  { x: 34, y: 62, cor: "bg-info", tam: 34, nome: "Ergonômico — Bancada 2" },
  { x: 62, y: 74, cor: "bg-chart-5", tam: 30, nome: "Biológico — Vestiário" },
];

function MapaRisco() {
  return (
    <>
      <PageHeader
        titulo="Mapas de Risco"
        descricao="Layout do ambiente com riscos representados por cor (tipo) e diâmetro (intensidade), conforme padrão da CIPA."
        acoes={<Button size="sm">Exportar PDF</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Panel titulo="Galpão de Produção — Matriz">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-border bg-secondary/40">
            <div className="absolute inset-6 rounded border-2 border-dashed border-border" />
            {pontos.map((p) => (
              <div
                key={p.nome}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${p.cor} opacity-80 ring-2 ring-background`}
                style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.tam, height: p.tam }}
                title={p.nome}
              />
            ))}
            <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              Escala 1:200 — rev. 04
            </span>
          </div>
        </Panel>
        <Panel titulo="Legenda e pontos">
          <ul className="space-y-2.5 text-sm">
            {pontos.map((p) => (
              <li key={p.nome} className="flex items-center gap-2.5">
                <span className={`size-3.5 rounded-full ${p.cor}`} />
                <span className="flex-1 text-foreground/90">{p.nome}</span>
                <Tag tom={p.tam > 45 ? "critico" : "alerta"}>{p.tam > 45 ? "Grande" : "Médio"}</Tag>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Verde: físico • Vermelho: acidente • Amarelo: químico • Azul: ergonômico • Cinza: biológico
          </p>
        </Panel>
      </div>
    </>
  );
}
