# Docs

Documentação do CRUD de itens do carrinho.

## Find All do carrinho

***GET*** no endpoint: http://localhost:8080/cart

Isso retornará todos os itens do carrinho do usuário logado. Não precisa passar nada relacionado ao usuário, o back mesmo pegará o usuário logado e irá fazer a query de findAllByUser.

## Adicionar item ao carrinho

***POST*** no endpoint: http://localhost:8080/cart

Com o seguinte corpo:

```json
{
    "produtoId": "646786f4d35afe632df959da"
}
```

Onde "produtoId" é o ID do produto que irá ser adicionado no carrinho.

Resposta do Create:

```json
{
    "id": "6467884e4922da757af07124",
    "produto": {
        "id": "646786f4d35afe632df959da",
        "nome": "Resident Evil 3",
        "preco": 250.0,
        "imageUrl": "C:\\temp\\loja-virtual-images\\image.png",
        "quantidade": 2147483647,
        "descricao": "Um jogo",
        "desconto": 50,
        "active": true,
        "tipo": "DIGITAL",
        "categorias": [
            {
                "id": "646786e6d35afe632df959d9",
                "nome": "Jogos digitais",
                "produtos": []
            }
        ],
        "variacao": {
            "nome": "Teste nome variacao",
            "variacoes": [
                "PREMIUM",
                "NORMAL"
            ]
        }
    },
    "usuario": {
        "id": "6467882e4922da757af07123",
        "username": "asdf1",
        "password": "$2a$10$di6cf/RNt3IaccBLN0uCDeBzdw5lM3rDdHVVfUseU3QZ12wnnHLh6",
        "role": "ROLE_CLIENTE"
    },
    "quantidade": 1
}
```

Percebe-se que o atributo "produto" é o produto em si, o "usuario" é o usuário logado do token e a "quantidade" é a quantidade do respectivo item no carrinho.

## Adicionar 1 unidade ao item do carrinho

***PUT*** no endpoint: http://localhost:8080/cart/add/6467875fd35afe632df959dc

Obs: percebe-se que após o endpoint "/cart" há ainda a presença do "/add"

Onde o "6467875fd35afe632df959dc" é o ID do **ITEM DO CARRINHO**. Cada vez que o endpoint for chamado, será *ADICIONADO* **UMA UNIDADE**

Resposta do adicionar 1 unidade:

```json
{
    "id": "6467875fd35afe632df959dc",
    "produto": {
        "id": "646786f4d35afe632df959da",
        "nome": "Resident Evil 3",
        "preco": 250.0,
        "imageUrl": "C:\\temp\\loja-virtual-images\\image.png",
        "quantidade": 2147483647,
        "descricao": "Um jogo",
        "desconto": 50,
        "active": true,
        "tipo": "DIGITAL",
        "categorias": [
            {
                "id": "646786e6d35afe632df959d9",
                "nome": "Jogos digitais",
                "produtos": []
            }
        ],
        "variacao": {
            "nome": "Teste nome variacao",
            "variacoes": [
                "PREMIUM",
                "NORMAL"
            ]
        }
    },
    "usuario": {
        "id": "6467870dd35afe632df959db",
        "username": "asdf",
        "password": "$2a$10$peUYRkCm5oNSab0pGDKaEefdeGjU9yaonJjmIZ5mdvsPmGMOOtchS",
        "role": "ROLE_CLIENTE"
    },
    "quantidade": 2
}
```

## Remover 1 unidade do item do carrinho

***PUT*** no endpoint: http://localhost:8080/cart/rem/6467875fd35afe632df959dc

Obs: percebe-se que após o endpoint "/cart" há ainda a presença do "/rem"

Onde o "6467875fd35afe632df959dc" é o ID do **ITEM DO CARRINHO**. Cada vez que o endpoint for chamado, será *REMOVIDO* **UMA UNIDADE**

Resposta do remover 1 unidade:

```json
{
    "id": "6467875fd35afe632df959dc",
    "produto": {
        "id": "646786f4d35afe632df959da",
        "nome": "Resident Evil 3",
        "preco": 250.0,
        "imageUrl": "C:\\temp\\loja-virtual-images\\image.png",
        "quantidade": 2147483647,
        "descricao": "Um jogo",
        "desconto": 50,
        "active": true,
        "tipo": "DIGITAL",
        "categorias": [
            {
                "id": "646786e6d35afe632df959d9",
                "nome": "Jogos digitais",
                "produtos": []
            }
        ],
        "variacao": {
            "nome": "Teste nome variacao",
            "variacoes": [
                "PREMIUM",
                "NORMAL"
            ]
        }
    },
    "usuario": {
        "id": "6467870dd35afe632df959db",
        "username": "asdf",
        "password": "$2a$10$peUYRkCm5oNSab0pGDKaEefdeGjU9yaonJjmIZ5mdvsPmGMOOtchS",
        "role": "ROLE_CLIENTE"
    },
    "quantidade": 1
}
```

## Deletar o item do carrinho

***DELETE*** no endpoint: http://localhost:8080/cart/6467875fd35afe632df959dc

Obs: diferente dos endpoints de adicionar e remover, esse terá de path apenas o "/cart", assim como o FindAll e Create.

Onde o "6467875fd35afe632df959dc" é o ID do **ITEM DO CARRINHO**.

Retornará 204 No Content em caso de sucesso.
