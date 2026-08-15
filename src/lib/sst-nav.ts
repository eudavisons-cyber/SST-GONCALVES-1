import type { Perfil } from "./sst-auth";

export type NavItem = {
  to: string;
  label: string;
  icon: string;
  grupo: string;
  perfis: Perfil[];
};

export const NAV: NavItem[] = [
  { to: "/", label: "Painel Geral", icon: "LayoutDashboard", grupo: "Visão", perfis: ["admin", "tecnico", "medico", "gestor"] },
  { to: "/alertas", label: "Alertas", icon: "BellRing", grupo: "Visão", perfis: ["admin", "tecnico", "medico", "gestor"] },
  { to: "/cadastros", label: "Empresas e Unidades", icon: "Building2", grupo: "Cadastros", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/organograma", label: "Organograma", icon: "Network", grupo: "Cadastros", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/colaboradores", label: "Colaboradores", icon: "Users", grupo: "Cadastros", perfis: ["admin", "tecnico", "medico", "gestor"] },
  { to: "/riscos", label: "Inventário e PGR", icon: "TriangleAlert", grupo: "Riscos", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/plano-acao", label: "GRO / Plano 5W2H", icon: "ListChecks", grupo: "Riscos", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/mapa-risco", label: "Mapas de Risco", icon: "Map", grupo: "Riscos", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/pcmso", label: "PCMSO e ASO", icon: "Stethoscope", grupo: "Saúde", perfis: ["admin", "medico", "tecnico"] },
  { to: "/agenda-clinica", label: "Agenda Clínica", icon: "CalendarClock", grupo: "Saúde", perfis: ["admin", "medico", "tecnico"] },
  { to: "/prontuario", label: "Prontuário Eletrônico", icon: "FileLock2", grupo: "Saúde", perfis: ["medico"] },
  { to: "/absenteismo", label: "Absenteísmo", icon: "CalendarX", grupo: "Saúde", perfis: ["admin", "medico", "gestor"] },
  { to: "/esocial", label: "Painel de Envios", icon: "Send", grupo: "eSocial", perfis: ["admin", "tecnico", "medico"] },
  { to: "/acidentes", label: "CAT e Acidentes", icon: "Siren", grupo: "Eventos", perfis: ["admin", "tecnico", "medico", "gestor"] },
  { to: "/quase-acidentes", label: "Quase-Acidentes", icon: "MessageSquareWarning", grupo: "Eventos", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/treinamentos", label: "Matriz e Turmas", icon: "GraduationCap", grupo: "Treinamentos", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/epi", label: "EPI Digital", icon: "HardHat", grupo: "Equipamentos", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/estoque", label: "Estoque e C.A.", icon: "Boxes", grupo: "Equipamentos", perfis: ["admin", "tecnico"] },
  { to: "/epc", label: "Inspeção de EPCs", icon: "FireExtinguisher", grupo: "Equipamentos", perfis: ["admin", "tecnico"] },
  { to: "/cipa", label: "CIPA e Brigada", icon: "Vote", grupo: "Comissões", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/documentos", label: "Laudos e GED", icon: "FolderLock", grupo: "Documentos", perfis: ["admin", "tecnico", "medico", "gestor"] },
  { to: "/auditoria", label: "Checklists e RNC", icon: "ClipboardCheck", grupo: "Conformidade", perfis: ["admin", "tecnico", "gestor"] },
  { to: "/requisitos-legais", label: "Requisitos Legais", icon: "Scale", grupo: "Conformidade", perfis: ["admin", "tecnico", "gestor"] },
];

export const GRUPOS = [
  "Visão",
  "Cadastros",
  "Riscos",
  "Saúde",
  "eSocial",
  "Eventos",
  "Treinamentos",
  "Equipamentos",
  "Comissões",
  "Documentos",
  "Conformidade",
];
