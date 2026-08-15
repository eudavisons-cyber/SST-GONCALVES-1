# SafeWork Companion

Quero um software para SST: 1. Painel Geral (Dashboard)

Visão Macro: Indicadores de desempenho (KPIs), acidentes (Taxa de Frequência e Gravidade), exames vencidos, ações pendentes e treinamentos a vencer.

Alertas e Notificações: Avisos automáticos de prazos críticos.

2. Cadastros Base

Empresas e Unidades: Matriz, filiais, obras e prestadores de serviço.

Organograma Operacional: Setores, cargos, funções e mapeamento de processos.

Colaboradores: Ficha individual com histórico ocupacional, alocações e restrições.

3. Engenharia e Gestão de Riscos (PGR)

Inventário de Riscos: Mapeamento de agentes físicos, químicos, biológicos, ergonômicos e de acidentes.

Matriz de Risco: Avaliação de severidade x probabilidade.

GRO e Plano de Ação: Matriz 5W2H para controle de riscos com prazos e responsáveis.

Mapas de Risco: Gerador visual de mapa de risco por ambiente.

4. Saúde Ocupacional (PCMSO)

Atendimentos e ASO: Emissão de Atestados de Saúde Ocupacional (Admissional, Periódico, Demissional, etc.).

Agenda Clínica: Marcação e controle de exames complementares.

Prontuário Eletrônico: Histórico médico confidencial do trabalhador.

Absenteísmo e Licenças: Controle de atestados médicos e afastamentos.

5. eSocial

S-2210: Comunicação de Acidente de Trabalho (CAT).

S-2220: Monitoramento da Saúde do Trabalhador (ASO).

S-2240: Condições Ambientais do Trabalho (Agentes Nocivos / Aposentadoria Especial).

Painel de Envios: Status de transmissão, validações e inconsistências da governança digital.

6. Eventos e Acidentes

Registro de CAT: Abertura e envio de acidentes de trabalho.

Investigação de Incidentes: Metodologias de análise de causa raiz (ex: 5 Porquês, Diagrama de Ishikawa).

Quase-Acidentes: Módulo de relatos preventivos (desvios e condições inseguras).

7. Treinamentos e Capacitação

Matriz de Treinamentos: Mapeamento de obrigatoriedades por cargo (NR-10, NR-33, NR-35, etc.).

Gestão de Turmas: Listas de presença, agendamento e emissão automatizada de certificados.

Validade e Validação: Alertas de reciclagens e integração com controle de acesso (catracas).

8. Equipamentos e Proteção (EPI / EPC)

Ficha de EPI Digital: Controle de entrega, devolução e assinaturas eletrônicas.

Estoque e Validades: Gestão do Certificado de Aprovação (C.A.) e vencimentos de insumos.

Inspeção de EPCs: Manutenção de extintores, redes de hidrantes, iluminação de emergência e proteções coletivas.

9. CIPA e Brigada

Processo Eleitoral: Cronograma automatizado da CIPA, votação e atas de posse.

Atas de Reunião: Registro e acompanhamento de reuniões ordinárias e extraordinárias.

SIPAT e Planos: Organização de semanas de prevenção e simulados de emergência.

10. Documentos e Laudos

Emissor de Laudos: Elaboração de LTCAT, LIP, AEP/AET (Ergonomia) e laudos periciais.

GED (Gestão Eletrônica de Documentos): Repositório com controle de versão e assinatura digital.

11. Auditoria e Conformidade

Checklists de Inspeção: Inspeções de campo personalizadas via app mobile (offline).

Não Conformidades: Relatórios de RNC e gestão de ações corretivas.

Acompanhamento de Requisitos Legais: Matriz de conformidade com as Normas Regulamentadoras. 1. Módulo de Gestão de Exames Ocupacionais (PCMSO)

Configuração do PCMSO

Matriz de Exames por Cargo: Definição de quais exames (Clínico, Audiometria, Hemograma, Espirometria, etc.) cada função exige, com periodicidade (Admissional, Periódico, Retorno ao Trabalho, Mudança de Risco, Demissional).

Parâmetros por Agente Nocivo: Vinculação automática de exames ao risco do inventário (ex: exposição a ruído exige Audiometria).

Operacional e Agendamento

Agenda Clínica Integrada: Marcação de consultas e exames com clínicas credenciadas via rede ou sistema próprio.

Prontuário Médico Digital: Histórico sigiloso com acesso restrito à equipe médica (médico coordenador/examinador).

2. Módulo de Gestão de EPIs e EPCs

Cadastro e Validação Automatizada

Integração com a Base do MTE (Consulta de C.A.): Validação automática do Certificado de Aprovação (C.A.) com alertas se o C.A. estiver vencido ou cancelado pelo Ministério do Trabalho.

Cadastro de Itens: Código do produto, fabricante, vida útil estimada, periodicidade de troca e instruções de uso/higienização.

Operação de Entrega e Devolução

Ficha de EPI Digital: Substituição da ficha em papel.

Assinatura Eletrônica: Coleta de assinatura via biometria, PIN, QR Code no app mobile ou assinatura em tela no momento da retirada.

Motivo da Entrega: Admissão, desgaste natural, perda, dano ou alteração de função.

Controle de Devolução/Descarte: Registro de devolução no desligamento ou substituição, garantindo a rastreabilidade do ciclo de vida do equipamento.

Estoque e Prevenção

Alerta de Troca Periódica: Notificação ao gestor/colaborador quando o EPI atingir o limite de durabilidade estipulado.

Gestão de Estoque: Controle de entradas, saídas, saldo mínimo por unidade/almoxarifado e ordem de compra.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://care-for-workers.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/07fce331-3cde-4ac9-9c3b-5ddc90f8f6e6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
