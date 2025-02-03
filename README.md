# Como rodar o projeto

tem duas formas de executar, localmente ou por docker.

## localmente

coloque um arquivo .env dentro das pastas web e api seguindo o exemplo do .env.example,
instale as dependencias usando npm i ou yarn,
e execute o projeto usando npm run dev ou yarn dev.

## Docker

coloque um arquivo .env dentro das pastas web e api seguindo o exemplo do .env.example,
descrubra qual o ip local da sua maquina usando o comando hostname -I,
depois va nos dois .env e onde estiver localhost, coloue o ip da sua maquina local,
e depois é so rodar o comando docker-compose up.
