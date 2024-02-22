# Guia do desenvolvedor 📚

- [Instalação](#instalação)
- [Versão do node](#versão-do-node)
- [Como se localizar no projeto](#como-me-localizar-no-projeto)
- [Estrutura de pasta](#estrutura-de-pastas)
- [Pasta específica do componente](#pasta-específica-do-componente)
- [Como manipular os dados do usuário?](#como-manipular-os-dados-do-usuário)
- [Idioma](#idioma)

## Instalação

1. **Faça um Fork:**
   - Fork este repositório clicando no botão "Fork" no canto superior direito desta página. Isso criará uma cópia do repositório na sua conta GitHub.

2. **Clone o Repositório:**
   - Clone o repositório forked em seu ambiente de desenvolvimento local.

   ```bash
   git clone git@github.com:Luizboaventura1/fastdevelopment.git
   cd fastdevelopment

3. **Crie seu projeto no Firebase**
  - coloque as variáveis ​​de ambiente como no exemplo `.env.template`.

4. **Configuração do Firebase**
  - Crie um documento "users" no Firebase e depois crie a opção de login do Google no Firebase Authentication

### .env.template

```
# Crie um projeto no firebase e coloque suas chaves
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
MEASUREMENT_ID=

# Faça sua própria chave, exemplo: g3f3-3r5g-3fwd-3fwc
ROUTE_KEY=
```  

Depois basta criar um documento chamado `users` no firestore e assim você conseguira usar a aplicacao e contribuir.

## Versão do node

`v18.16.0`

## Como me localizar no projeto?

#### `/pages`
  - Aqui fica todas as rotas do projeto
#### `/middleware`
  - Controle as rotas que o usário pode acessar nessa pasta
#### `/components/common`
  - Componentes globais

## Estrutura de pastas

A pasta `components/common` fica todos os components usados em toda a aplicação, cada feature terá sua própria pasta `/components` caso aquele componente seja muito especifico e não será usado novamente.

### Pasta específica do componente

- Estrutura

- **/components/commun**
  - _Componentes globais aqui..._

- **/pages/auth**
    - **/components**

  - **/dashboard**
    - **/components**

Basta seguir essa padrão para componentes específicos, senão jogue tudo na pasta `/components/common`

## Como manipular os dados do usuário?

```javascript
import { useWorkspace } from "~/stores/workspace";

let frames = useWorkspace().frames;
```
Chamando o `useWorkspace().frames` você consegue acessar todos os quadros do usuário, essa é a forma principal de manipular os dados do usuário.

Veja outro exemplo pegando outros tipos de dados:
```javascript
onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      userEmail.value = data.email;
      userId.value = data.id;
    });
});
```
Veja quais dados você consegue pegar acessando o arquivo `workspace.js` na pasta `stores`.

## Idioma

  - ### [en-us](../en-us/structure.md)