# MiAuDota

Projeto desenvolvido para a atividade PJBL, com o objetivo de criar um frontend web integrado a uma Azure Function e ao MongoDB Atlas.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Azure Functions
* Azure Static Web Apps
* GitHub
* MongoDB Atlas

## Funcionalidades

O projeto possui duas telas principais:

* **Tela inicial:** apresenta os pets disponíveis para adoção.
* **Tela de cadastro:** permite o preenchimento de informações para cadastro de um novo pet.

O frontend realiza comunicação com a API da própria Static Web App através de requisições HTTP. Os registros são lidos e gravados no MongoDB Atlas.

## Comunicação com a API

O projeto utiliza um endpoint `GET` de Azure Functions para buscar os dados dos pets.

### Endpoint

`GET https://proud-wave-00198ca10.5.azurestaticapps.net/api/pets`

Os dados retornados pelo endpoint são utilizados pelo frontend para exibir os pets disponíveis.

## Publicação

Antes do deploy, configure `MONGODB_URI` nas Application settings da Static Web App. O arquivo `local.settings.json` serve apenas para execução local e não é publicado.

### GitHub

https://github.com/pSerafM/miaudota-azure

### Azure Static Web Apps

**https://proud-wave-00198ca10.5.azurestaticapps.net**

### Azure Functions

[https://miaudota-api-midup-c2dqhcemane5h4eg.brazilsouth-01.azurewebsites.net](https://miaudota-api-midup-c2dqhcemane5h4eg.brazilsouth-01.azurewebsites.net/api/pets)

## Inteligência Artificial Generativa

A Inteligência Artificial Generativa foi utilizada como apoio na criação do frontend, estruturação das páginas, implementação das funcionalidades em JavaScript e organização dos arquivos do projeto.

O prompt utilizado está disponível no arquivo [`Prompt.md`](Prompt.md).

## Estrutura do projeto

```text
miaudota-azure/
│
├── index.html
├── cadastro.html
├── css/
│   └── style.css
│
├── js/
│   ├── index.js
│   ├── cadastro.js
│   └── pet-service.js
│
├── src/
│   ├── index.js
│   └── functions/
│       └── pets.js
│
├── GRUPO.md
├── Prompt.md
├── README.md
├── package.json
└── host.json
```

## Objetivo

O projeto demonstra a integração entre um frontend desenvolvido com tecnologias web básicas e serviços disponibilizados na nuvem através do Azure Functions e Azure Static Web Apps.
