import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/estoque")({
  head: () => meta("Estoque e Certificado de Aprovação — Sentinela SST", "Gestão de estoque de EPIs, saldo mínimo, ordens de compra e validação automática do C.A. na base do MTE."),
  component: Estoque,
});

function Estoque() {
  return (
    <>
      <PageHeader
        titulo="Estoque e C.A."
        descricao="Consulta automática do Certificado de Aprovação na base do MTE e controle de saldo por almoxarifado."
        acoes={<Button size="sm">Ordem de compra</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Itens cadastrados" valor="184" />
        <Stat rotulo="C.A. irregulares" valor="3" detalhe="1 cancelado • 2 vencidos" tom="critico" />
        <Stat rotulo="Abaixo do mínimo" valor="11" tom="alerta" />
        <Stat rotulo="Valor em estoque" valor="R$ 218 mil" tom="info" />
      </div>
      <Panel titulo="Validação automática do C.A. (base MTE)">
        <Tabela
          colunas={["Item", "Fabricante", "C.A.", "Validade do C.A.", "Situação MTE", "Ação"]}
          linhas={[
            ["Luva nitrílica G", "ProtLuvas", "31.469", "02/09/2026", <Tag tom="critico">Cancelado</Tag>, "Bloquear entregas"],
            ["Capacete classe B", "SafeTop", "31.905", "14/05/2028", <Tag tom="ok">Válido</Tag>, "—"],
            ["Respirador PFF2", "AirPro", "44.120", "30/08/2026", <Tag tom="alerta">Vence em 15 d</Tag>, "Renovar lote"],
            ["Cinto paraquedista", "AltaSeg", "27.884", "11/03/2029", <Tag tom="ok">Válido</Tag>, "—"],
          ]}
        />
      </Panel>
      <Panel titulo="Saldo por almoxarifado">
        <Tabela
          colunas={["Item", "Matriz", "Obra Norte", "CD Pecém", "Mínimo", "Status"]}
          linhas={[
            ["Botina de segurança 41", "24", "8", "12", "20", <Tag tom="ok">OK</Tag>],
            ["Protetor auricular plug", "310", "40", "95", "500", <Tag tom="critico">Repor</Tag>],
            ["Óculos ampla visão", "62", "31", "18", "60", <Tag tom="alerta">Atenção</Tag>],
            ["Luva vaqueta", "140", "77", "40", "100", <Tag tom="ok">OK</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
