import { createFileRoute } from "@tanstack/react-router";
import { PenLine, QrCode, Fingerprint } from "lucide-react";
import { PageHeader, Panel, Stat, Tabela, Tag } from "@/components/sst/kit";
import { Button } from "@/components/ui/button";
import { meta } from "@/lib/sst-meta";

export const Route = createFileRoute("/epi")({
  head: () => meta("Ficha de EPI Digital — Sentinela SST", "Entrega, devolução e assinatura eletrônica de EPIs com motivo, rastreabilidade e alerta de troca periódica."),
  component: Epi,
});

function Epi() {
  return (
    <>
      <PageHeader
        titulo="EPI Digital"
        descricao="Ficha de EPI sem papel: entrega, devolução, motivo e assinatura eletrônica no app."
        acoes={<Button size="sm">Nova entrega</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat rotulo="Entregas no mês" valor="612" tom="ok" />
        <Stat rotulo="Fichas assinadas" valor="94%" detalhe="Biometria, PIN ou assinatura em tela" tom="ok" />
        <Stat rotulo="Trocas devidas" valor="73" detalhe="Vida útil atingida" tom="alerta" />
        <Stat rotulo="Devoluções pendentes" valor="18" detalhe="Desligamentos e mudanças de função" tom="critico" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { i: Fingerprint, t: "Biometria", d: "Digital coletada no coletor do almoxarifado" },
          { i: PenLine, t: "Assinatura em tela", d: "Traço capturado no tablet/celular na retirada" },
          { i: QrCode, t: "PIN / QR Code", d: "Confirmação por código pessoal do colaborador" },
        ].map((m) => (
          <Panel key={m.t}>
            <m.i className="size-5 text-primary" />
            <p className="mt-2 text-sm font-semibold">{m.t}</p>
            <p className="text-xs text-muted-foreground">{m.d}</p>
          </Panel>
        ))}
      </div>
      <Panel titulo="Ficha de EPI — Rafael Souza (10432)">
        <Tabela
          colunas={["Data", "EPI", "C.A.", "Qtd", "Motivo", "Vida útil", "Assinatura", "Devolução"]}
          linhas={[
            ["14/08/2026", "Luva isolante classe 0", "38.221", "1 par", "Desgaste natural", "6 meses", <Tag tom="ok">Biometria</Tag>, <Tag tom="neutro">Em uso</Tag>],
            ["02/07/2026", "Capacete classe B", "31.905", "1", "Alteração de função", "24 meses", <Tag tom="ok">Em tela</Tag>, <Tag tom="neutro">Em uso</Tag>],
            ["18/04/2026", "Protetor auricular plug", "12.447", "2 pares", "Perda", "3 meses", <Tag tom="ok">PIN</Tag>, <Tag tom="alerta">Troca devida</Tag>],
            ["10/01/2026", "Óculos ampla visão", "9.722", "1", "Admissão", "12 meses", <Tag tom="ok">Biometria</Tag>, <Tag tom="ok">Devolvido</Tag>],
          ]}
        />
      </Panel>
      <Panel titulo="Alertas de troca periódica">
        <Tabela
          colunas={["Colaborador", "EPI", "Entregue em", "Limite", "Situação"]}
          linhas={[
            ["Camila Nunes", "Protetor auricular", "10/05", "3 meses", <Tag tom="critico">Vencido</Tag>],
            ["Jonas Lima", "Botina de segurança", "20/02", "12 meses", <Tag tom="alerta">Vence em 15 d</Tag>],
            ["Wesley Braga", "Luva vaqueta", "01/08", "2 meses", <Tag tom="ok">Em uso</Tag>],
          ]}
        />
      </Panel>
    </>
  );
}
