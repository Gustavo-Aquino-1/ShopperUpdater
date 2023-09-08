## Shopper Updater

Sistema para atualização de produtos, de um modo simples e seguro!!

Como Utilizar:

// video vira aqui


## Subindo com docker-compose 🐳

⚠️ Certifique-se de que as portas que serao usadas pelo docker-compose estão livres, são elas: 3000, 3001, 3306.

```
docker-compose up -d
```

## Populando o banco de dados

```
docker exec -it shopper_updater_backend sh
```

Dentro do container execute:

```
npm run db:on
```


## Tecnologias utilizadas 💻

**Front-end:** React, TailwindCSS

**Back-end:** Node, Express, Joi

**Outros**: Docker


## Desenvolvido por:

[@GustavoAquino](https://www.github.com/Gustavo-Aquino-1)

