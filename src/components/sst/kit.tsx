import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  titulo,
  descricao,
  acoes,
}: {
  titulo: string;
  descricao?: string;
  acoes?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
      <div>
        <div className="hazard-bar mb-3 h-1.5 w-24 rounded-full" />
        <h1 className="text-2xl font-semibold uppercase tracking-wide text-foreground">{titulo}</h1>
        {descricao ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{descricao}</p> : null}
      </div>
      {acoes ? <div className="flex flex-wrap gap-2">{acoes}</div> : null}
    </div>
  );
}

export function Panel({
  titulo,
  extra,
  children,
  className,
}: {
  titulo?: string;
  extra?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel p-5", className)}>
      {titulo ? (
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{titulo}</h2>
          {extra}
        </header>
      ) : null}
      {children}
    </section>
  );
}

type Tom = "neutro" | "ok" | "alerta" | "critico" | "info";

const TONS: Record<Tom, string> = {
  neutro: "bg-muted text-muted-foreground",
  ok: "bg-success/15 text-success",
  alerta: "bg-warning/15 text-warning",
  critico: "bg-destructive/15 text-destructive",
  info: "bg-info/15 text-info",
};

export function Tag({ tom = "neutro", children }: { tom?: Tom; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        TONS[tom],
      )}
    >
      {children}
    </span>
  );
}

export function Stat({
  rotulo,
  valor,
  detalhe,
  tom = "neutro",
}: {
  rotulo: string;
  valor: string;
  detalhe?: string;
  tom?: Tom;
}) {
  const barra: Record<Tom, string> = {
    neutro: "bg-muted-foreground/40",
    ok: "bg-success",
    alerta: "bg-warning",
    critico: "bg-destructive",
    info: "bg-info",
  };
  return (
    <div className="panel relative overflow-hidden p-4">
      <span className={cn("absolute inset-y-0 left-0 w-1", barra[tom])} />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{rotulo}</p>
      <p className="stat-value mt-2 text-foreground">{valor}</p>
      {detalhe ? <p className="mt-1 text-xs text-muted-foreground">{detalhe}</p> : null}
    </div>
  );
}

export function Tabela({
  colunas,
  linhas,
}: {
  colunas: string[];
  linhas: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            {colunas.map((c) => (
              <th
                key={c}
                className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i} className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40">
              {linha.map((celula, j) => (
                <td key={j} className="px-3 py-2.5 align-middle text-foreground/90">
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Barra({ valor, tom = "alerta" }: { valor: number; tom?: Tom }) {
  const cor: Record<Tom, string> = {
    neutro: "bg-muted-foreground",
    ok: "bg-success",
    alerta: "bg-warning",
    critico: "bg-destructive",
    info: "bg-info",
  };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div className={cn("h-full rounded-full", cor[tom])} style={{ width: `${Math.min(100, valor)}%` }} />
    </div>
  );
}
