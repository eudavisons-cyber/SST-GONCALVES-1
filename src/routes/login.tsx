import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PERFIS, useAuth, type Perfil } from "@/lib/sst-auth";
import { meta } from "@/lib/sst-meta";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => meta("Entrar — Sentinela SST", "Acesse o sistema de gestão de SST com seu perfil: administrador, técnico de segurança, médico do trabalho ou gestor."),
  component: LoginPage,
});

const CONTAS: Record<Perfil, string> = {
  admin: "admin@sentinela.com.br",
  tecnico: "tecnico@sentinela.com.br",
  medico: "medico@sentinela.com.br",
  gestor: "gestor@sentinela.com.br",
};

const NOMES: Record<Perfil, string> = {
  admin: "Ana Ribeiro",
  tecnico: "Marcos Teixeira",
  medico: "Dra. Helena Costa",
  gestor: "Eudavison Moura",
};

function LoginPage() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState<Perfil>("tecnico");

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6 py-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="panel flex flex-col justify-center p-6">
        <span className="flex size-11 items-center justify-center rounded bg-primary text-primary-foreground">
          <ShieldCheck className="size-6" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold uppercase tracking-wide">Sentinela SST</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Plataforma de Saúde e Segurança do Trabalho: PGR, PCMSO, eSocial, EPI, treinamentos e auditorias em um só
          lugar.
        </p>
        <div className="hazard-bar mt-6 h-2 w-full rounded-full" />
      </div>

      <form
        className="panel space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          entrar({ nome: NOMES[perfil], email: CONTAS[perfil], perfil });
          navigate({ to: "/" });
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail corporativo</Label>
          <Input id="email" type="email" defaultValue={CONTAS[perfil]} key={perfil} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" type="password" defaultValue="demo1234" />
        </div>
        <div className="space-y-2">
          <Label>Perfil de acesso</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.keys(PERFIS) as Perfil[]).map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPerfil(p)}
                className={cn(
                  "rounded border p-3 text-left transition-colors",
                  perfil === p
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <p className="text-sm font-semibold text-foreground">{PERFIS[p].label}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{PERFIS[p].descricao}</p>
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Entrar no sistema
        </Button>
        <p className="text-center text-[11px] text-muted-foreground">
          Protótipo de demonstração — nenhum dado real é armazenado.
        </p>
      </form>
    </div>
  );
}
