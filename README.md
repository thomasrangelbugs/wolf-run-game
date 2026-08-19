# Wolf Run — Seasons Remaster

Runner lateral em Canvas no qual um lobo percorre cenários dinâmicos, salta obstáculos, coleta itens e evolui com distância, clima e estações.

## Estado do projeto

Aplicação web estática (PWA) executada no navegador ou instalada como app no PC e no celular. O repositório não define etapa de instalação nem de compilação, salvo quando indicado abaixo.

## Funcionalidades

- Corrida lateral
- Pulo e obstáculos
- Moedas, vidas e pontuação
- Upgrades
- Clima, turnos e estações
- Recordes/configurações locais
- Controles touch
- **Instalar como app (PWA)** no PC e no celular
- **Baixar ZIP** para jogar offline abrindo `index.html`
- Cache offline via service worker

## Tecnologias

- HTML5 Canvas
- CSS e JavaScript incorporados
- Web Audio/localStorage
- Progressive Web App (`manifest.webmanifest` + `sw.js`)

## Estrutura principal

- `index.html` — interface e motor do jogo
- `manifest.webmanifest` / `sw.js` — instalação e modo offline
- `icons/` — ícones do app
- `Wolf_Run/`, `Wolf_Jump/`, `Wolf_Stop/` e `Wolf_death/` — sprites
- `audio/` — trilhas e efeitos

## Executar localmente

Não há dependências de pacote nem comando de build. Abra `index.html` em um navegador moderno.

Para testar instalação PWA e service worker, sirva a pasta por HTTP (ex.: `npx serve .` ou Live Server), pois `file://` não registra service worker.

## Baixar e jogar no PC ou celular

1. **Instalar app** (recomendado)
   - **PC (Chrome/Edge):** botão **INSTALAR APP** no menu, ou o ícone de instalar na barra de endereço.
   - **Android:** Chrome → menu ⋮ → Instalar app / Adicionar à tela inicial.
   - **iPhone/iPad:** Safari → Compartilhar → Adicionar à Tela de Início.
2. **Baixar ZIP:** no menu do jogo, use **BAIXAR ZIP**, extraia a pasta e abra `index.html`.

Se os dados/cache do site forem apagados manualmente, abra o app uma vez com internet. O service worker verifica e restaura automaticamente os arquivos necessários para as próximas aberturas offline.

Site publicado: https://wolfseminternet.netlify.app/

## Controles

- Desktop: use os controles indicados na tela para mover e pular.
- Celular: use os botões laterais/touch.
- Botões da interface controlam início, tela cheia, instalação, download, áudio e configurações.

## Dados e persistência

- Configurações usam `wolf_settings_v2` no localStorage.
- Recordes e progresso local dependem dos dados do navegador.

## Testes

Não foi identificado script de teste automatizado. Valide manualmente os fluxos descritos, em desktop e em viewport móvel, inclusive instalação e download.

## Publicação

Sirva os arquivos estáticos preservando a estrutura de pastas. O `netlify.toml` ajusta headers do manifest e do service worker.

## Limitações e segurança

- Áudio pode exigir interação inicial.
- Instalação PWA exige HTTPS (ou localhost).
- Confirme licenças de sprites e músicas.


## Requisitos

- Navegador moderno (Chrome, Edge, Firefox ou Safari atualizado)
- Conexão com a internet apenas para recursos externos integrados, quando aplicável
## Repositório

[thomasrangelbugs/wolf-run-game](https://github.com/thomasrangelbugs/wolf-run-game)


## Autor

**Thomas Rangel Bugs** — [github.com/thomasrangelbugs](https://github.com/thomasrangelbugs)
