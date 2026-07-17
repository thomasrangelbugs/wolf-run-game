# Wolf Run — Seasons Remaster

Runner lateral em Canvas no qual um lobo percorre cenários dinâmicos, salta obstáculos, coleta itens e evolui com distância, clima e estações.

## Estado do projeto

Aplicação web estática executada no navegador. O repositório não define etapa de instalação nem de compilação, salvo quando indicado abaixo.

## Funcionalidades

- Corrida lateral
- Pulo e obstáculos
- Moedas, vidas e pontuação
- Upgrades
- Clima, turnos e estações
- Recordes/configurações locais
- Controles touch

## Tecnologias

- HTML5 Canvas
- CSS e JavaScript incorporados
- Web Audio/localStorage

## Estrutura principal

- `index.html — interface e motor do jogo`
- `Wolf_Run/, Wolf_Jump/, Wolf_Stop/ e Wolf_death/ — sprites`
- `audio/ — trilhas e efeitos`

## Executar localmente

Não há dependências de pacote nem comando de build registrado para este projeto. Abra `index.html` em um navegador moderno.

## Controles

- Desktop: use os controles indicados na tela para mover e pular.
- Celular: use os botões laterais/touch.
- Botões da interface controlam início, tela cheia, áudio e configurações.

## Dados e persistência

- Configurações usam `wolf_settings_v2` no localStorage.
- Recordes e progresso local dependem dos dados do navegador.

## Testes

Não foi identificado script de teste automatizado. Valide manualmente os fluxos descritos em **Como usar**, em desktop e em viewport móvel.

## Publicação

O projeto não contém configuração de deploy. Sirva os arquivos estáticos preservando a estrutura de pastas e usando o arquivo de entrada indicado acima.

## Limitações e segurança

- Não há teste automatizado nem configuração de deploy identificada.
- Áudio pode exigir interação inicial.
- Confirme licenças de sprites e músicas.

## Repositório

[redobrai-del/thomas-projetos](https://github.com/redobrai-del/thomas-projetos)