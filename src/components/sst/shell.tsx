import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import * as Icons from "lucide-react";
import { GRUPOS, NAV } from "@/lib/sst-nav";
import { PERFIS, useAuth } from "@/lib/sst-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Icone({ nome, className }: { nome: string; className?: string }) {
  const Comp = (Icons as unknown as Record<string, Icons.LucideIcon>)[nome] ?? Icons.Circle;
  return <Comp className={className} aria-hidden />;
}

export function AppShell({ children }: { children: ReactNode }) {
  const { usuario, hidratado, sair } = useAuth();
  const [aberto, setAberto] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const perfil = usuario?.perfil ?? "gestor";
  const itens = NAV.filter((i) => i.perfis.includes(perfil));

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0",
          aberto ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2.5 border-b border-sidebar-border px-4 py-4">
          <span className="flex size-9 items-center justify-center rounded bg-primary text-primary-foreground">
            <Icons.ShieldCheck className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-sidebar-foreground">
              Sentinela SST
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Gestão NR / eSocial</p>
          </div>
        </div>

        <nav className="px-2 py-3">
          {GRUPOS.map((grupo) => {
            const doGrupo = itens.filter((i) => i.grupo === grupo);
            if (doGrupo.length === 0) return null;
            return (
              <div key={grupo} className="mb-3">
                <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                  {grupo}
                </p>
                <ul className="space-y-0.5">
                  {doGrupo.map((item) => {
                    const ativo = pathname === item.to;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setAberto(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded px-3 py-2 text-[13px] font-medium transition-colors",
                            ativo
                              ? "bg-primary/15 text-primary shadow-[inset_2px_0_0_0_var(--color-primary)]"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          )}
                        >
                          <Icone nome={item.icon} className="size-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setAberto((v) => !v)}>
            <Icons.Menu className="size-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <div className="hidden items-center gap-2 rounded border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <Icons.Search className="size-3.5" />
            Buscar colaborador, CAT, documento…
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded border border-warning/40 bg-warning/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-warning sm:flex">
              <Icons.BellRing className="size-3.5" /> 12 prazos críticos
            </span>
            {hidratado && usuario ? (
              <div className="flex items-center gap-2">
                <div className="hidden text-right leading-tight sm:block">
                  <p className="text-xs font-semibold text-foreground">{usuario.nome}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {PERFIS[usuario.perfil].label}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={sair}>
                  Sair
                </Button>
              </div>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">Entrar</Link>
              </Button>
            )}
          </div>
        </header>

        {hidratado && !usuario ? (
          <div className="border-b border-warning/30 bg-warning/10 px-4 py-2 text-xs text-warning">
            Modo demonstração — entre com um perfil para ver os módulos restritos (ex.: prontuário médico).
          </div>
        ) : null}

        <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-6 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
