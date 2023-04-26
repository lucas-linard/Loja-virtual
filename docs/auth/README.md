# Docs

Documentação da autenticação / autorização.

A partir dessa implementação, todos os endpoints estão protegidos e precisarão do Token para ser utilizados.

## Criar usuário

**POST** no endpoint: http://localhost:8080/register , com o seguinte corpo:

```json
{
    "username": "abcde",
    "password": "12345"
}
```

***Irá lançar uma exception com código 400 Bad Request caso o username já ter sido cadastrado previamente.***

## Logar

**POST** no endpoint: http://localhost:8080/register , com o seguinte corpo:

```json
{
    "username": "admin",
    "password": "admin"
}
```

***Caso o Login ter sido concluído com sucesso, o token JWT vai estar no header "Authorization" da resposta.***

Se o usuário ou senha estiverem incorretos, uma exception com código 401 irá ser lançada.
