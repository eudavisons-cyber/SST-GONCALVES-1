import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Perfil = "admin" | "tecnico" | "medico" | "gestor";

export type Usuario = {
  nome: string;
  email: string;
  perfil: Perfil;
};

export const PERFIS: Record<Perfil, { label: string; descricao: string }> = {
  admin: { label: "Administrador", descricao: "Acesso total ao sistema e configurações" },
  tecnico: { label: "Técnico de Segurança", descricao: "PGR, EPI, treinamentos, CAT e auditorias" },
  medico: { label: "Médico do Trabalho", descricao: "PCMSO, ASO e prontuário sigiloso" },
  gestor: { label: "Gestor / Cliente", descricao: "Painéis, indicadores e planos de ação" },
};

const STORAGE_KEY = "sst.usuario";

type Ctx = {
  usuario: Usuario | null;
  hidratado: boolean;
  entrar: (u: Usuario) => void;
  sair: () => void;
};

const AuthContext = createContext<Ctx>({
  usuario: null,
  hidratado: false,
  entrar: () => {},
  sair: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUsuario(JSON.parse(raw) as Usuario);
    } catch {
      /* ignora */
    }
    setHidratado(true);
  }, []);

  const entrar = useCallback((u: Usuario) => {
    setUsuario(u);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }, []);

  const sair = useCallback(() => {
    setUsuario(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({ usuario, hidratado, entrar, sair }), [usuario, hidratado, entrar, sair]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
