
# Decisões de Projeto

Nesse projeto procurei não fazer muitas mudaças e seguir o modelo do template enviado.

Passei por alguns problemas e um deles em especial não foi resolvido.O projeto quando rodei a primeira vez apresentava um warning a respeito dos ícones do UIKit
Li a documentação à procura de uma solução ou em blogs na internet e acabei não encontrando e decidi,mesmo insatisfeito,continuar desenvolvendo a aplicação

Quanto á informação de planos foi utilizados os mesmos disponibilizados no json

As informações de cartão em [resources/cards] foram adicionados alguns atributos como "balance" para verificar o limite do cartão

Optei por utilizar como biblioteca de testes o Cypress para teste end-to-end que inclusive é recomendada na documentação do Next e que se mostrou muitos hábil para esse tipo de teste
# Configuração Inicial

Ao baixar o projeto do meu repositório,verifiquei que ocorria erros com a instalação do cypress por tentar acessar uma pastar sem permissão.Tentar rodar o comando de instalação do Cypress dentro do Docker tbm não funciona e,devido ao prazo, fiquei sem tempo para corrgir de uma forma elegante

Sendo assim para rodar a aplicação a primeira vez é necessário rodar na raiz do projeto o comando

`npm install cypress@10.6.0 --save-dev` (apenas na instalação do projeto.)

E logo depois o comando

`docker compose up`
# Rodar os testes

Para rodar os testes no Cypress rodar o comando:

`npm run cypress`

O arquivo de testes do Cypress se encontra em [cypress/e2e/index.cy.js]
