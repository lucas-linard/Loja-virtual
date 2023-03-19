# Documentação

O documento está dividido pelos métodos HTTP na seguinte ordem:

 - GET
 - POST
 - PUT
 - DELETE

Cada método contém a sequência de passos necessárias para performar sua respectiva ação, pois algumas rotinas (de criação por exemplo) dependem de mais de 1 ***endpoint***.

***Necessário criar uma pasta com nome "loja-virtual-images" no PATH:*** C:\temp (se não tiver a pasta temp, cria tbm).

## GET

### Find All

Para recuperar todos os produtos, envie uma requisição ***GET*** no seguinte endpoint:

| http://localhost:8080/produtos

A resposta virá paginada, com os produtos dentro do objeto ***content*** (o content é uma lista de objetos **Produtos**). Exemplo:

```json
{
    "content": [
        {
            "id": "64161c23c8e6b94559b5bc9f",
            "nome": "God of War",
            "preco": 200.0,
            "imageUrl": "C:\\temp\\loja-virtual-images\\image.png",
            "quantidade": 2147483647,
            "descricao": "Um jogo",
            "desconto": 50,
            "tipo": "DIGITAL",
            "categorias": [
                {
                    "id": "6416010f4857ee599b0fe6ac",
                    "nome": "Jogos"
                },
                {
                    "id": "641601134857ee599b0fe6ad",
                    "nome": "Jogos digitais"
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
        {
            "id": "64161c2fc8e6b94559b5bca0",
            "nome": "Resident Evil 4",
            "preco": 250.0,
            "imageUrl": "C:\\temp\\loja-virtual-images\\image.png",
            "quantidade": 2147483647,
            "descricao": "Um jogo",
            "desconto": 50,
            "tipo": "DIGITAL",
            "categorias": [
                {
                    "id": "6416010f4857ee599b0fe6ac",
                    "nome": "Jogos"
                },
                {
                    "id": "641601134857ee599b0fe6ad",
                    "nome": "Jogos digitais"
                }
            ],
            "variacao": {
                "nome": "Teste nome variacao",
                "variacoes": [
                    "PREMIUM",
                    "NORMAL"
                ]
            }
        }
    ],
    "pageable": {
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "offset": 0,
        "pageSize": 100,
        "pageNumber": 0,
        "paged": true,
        "unpaged": false
    },
    "last": true,
    "totalPages": 1,
    "totalElements": 2,
    "size": 100,
    "number": 0,
    "sort": {
        "empty": true,
        "sorted": false,
        "unsorted": true
    },
    "first": true,
    "numberOfElements": 2,
    "empty": false
}
```

### Find By Id

Recupera o produto a partir do ID especificado. Envie uma requisição ***GET*** no seguinte endpoint:

| http://localhost:8080/produtos/64161c23c8e6b94559b5bc9f

Onde *64161c23c8e6b94559b5bc9f* é o ID do produto

Retorna 200 OK com o produto na resposta ou 404 Not Found. Exemplo:

#### 200 OK

```json
{
    "id": "64161c23c8e6b94559b5bc9f",
    "nome": "God of War",
    "preco": 200.0,
    "imageUrl": "C:\\temp\\loja-virtual-images\\image.png",
    "quantidade": 2147483647,
    "descricao": "Um jogo",
    "desconto": 50,
    "tipo": "DIGITAL",
    "categorias": [
        {
            "id": "6416010f4857ee599b0fe6ac",
            "nome": "Jogos"
        },
        {
            "id": "641601134857ee599b0fe6ad",
            "nome": "Jogos digitais"
        }
    ],
    "variacao": {
        "nome": "Teste nome variacao",
        "variacoes": [
            "PREMIUM",
            "NORMAL"
        ]
    }
}
```

#### 404 NOT FOUND

```json
{
    "timestamp": 1679170856260,
    "status": 404,
    "error": "Não encontrado!",
    "message": "Não encontrado. Id: 64161c23c8e6b94559b5bc9fa",
    "path": "/produtos/64161c23c8e6b94559b5bc9fa"
}
```

## POST

### Create

A criação do produto é dividida em duas etapas:

- A primeira etapa é fazer o upload da imagem do produto no servidor. Quando fizer o upload da imagem, o servidor irá retornar o PATH da imagem, que deve ser utilizado no atributo **imageUrl** do objeto que será enviado no corpo da criação do produto.
- A segunda etapa é cadastrar o produto propriamente. Como informado na etapa anterior, aqui você usa o **imgeUrl** da resposta do servidor no objeto que será enviado no corpo da requisição. Para essa etapa, utilize o ***Find All*** das categorias para serem selecionadas na criação do produto também.

Upload da imagem. ***POST*** no endpoint (o nome do form-data que a imagem virá é: "file"):

| http://localhost:8080/produtos/upload-image

Resposta:

```json
{
    "imageUrl": "C:\\temp\\loja-virtual-images\\image.png"
}
```

Criação do produto. ***POST*** no endpoint:

| http://localhost:8080/produtos

**COM O SEGUINTE CORPO DE REQUISIÇÃO**

```json
{
    "nome": "Resident Evil 4",
    "preco": 250.00,
    "quantidade": 5,
    "descricao": "Um jogo",
    "desconto": 50,
    "tipo": "DIGITAL",
    "imageUrl": "C:\\temp\\loja-virtual-images\\image.png",
    "categoriaIds": [
        "6416010f4857ee599b0fe6ac",
        "641601134857ee599b0fe6ad"
    ],
    "variacao": {
        "nome": "Teste nome variacao",
        "variacoes": [
            "PREMIUM",
            "NORMAL"
        ]
    }
}
```

**Note que o imageUrl é exatamente o que o servidor respondeu durante o upload da imagem.**

Também notamos a presença de um atributo com nome **categoriaIds**. Envie nesse campo os IDs da categoria que foram selecionados no front para preencher o produto.

## PUT

Podemos atualizar tudo no produto.

**Para atualizar a imagem do produto, repetimos o mesmo passo da criação: primeiro fazemos o upload da imagem NO MESMO ENDPOINT DE UPLOAD DE IMAGEM DA ROTINA DE CRIAÇÃO e utilizamos a resposta do servidor como imageUrl.**

Atualizamos o produto com uma requisição ***PUT*** no seguinte endpoint:

| http://localhost:8080/produtos/64160908dc51403ec1cf393e

Onde *64160908dc51403ec1cf393e* é o ID do Produto.

**COM O SEGUINTE CORPO NA REQUISIÇÃO** (podemos alterar tudo, como na criação). Assim como na criação, será necessário mandar os IDs das categorias a serem alteradas.

**Mesmo que apenas alguns dados sejam alterados, envie todos os dados antigos nos outros campos.**

```json
{
    "nome": "Resident Evil 4 atualizado 2",
    "preco": 2530.00,
    "quantidade": 530,
    "descricao": "Um jogo muito bomasdf",
    "desconto": 330,
    "tipo": "DIGITAL",
    "imageUrl": "C:\\temp\\loja-virtual-images\\other-image.png",
    "categoriaIds": [
        "641601134857ee599b0fe6ad"
    ],
    "variacao": {
        "nome": "Teste nome variacao novo asdf",
        "variacoes": [
            "M",
            "G"
        ]
    }
}
```

Caso o ID não pertencer a nenhum produto, o mesmo erro de NOT FOUND será lançado aqui.

## DELETE

Deletamos o produto com uma requisição ***DELETE*** no seguinte endpoint:

| http://localhost:8080/produtos/64160908dc51403ec1cf393e

Se o produto existir, será retornado 204 NO CONTENT.

Se não existir, será retornado 404 NOT FOUND.
