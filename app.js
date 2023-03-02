/*
    Bibliotecas necessarias para criar uma API
        É uma biblioteca para criar aplicacacoes em node 
        no formato de API
            .express - npm install express --save
        É uma biblioteca para manipular as permissoes 
        do protocolo http
            .cors - npm install cors --save
        É uma biblioteca que permite manipular o corpo 
        do protocolo http 
            .body-parser - npm install body-parser --save
*/
//Import da biblioteca do express para criar a API
const express = require('express');
const { request, response } = require('express');
//Import da biblioteca do cors para manipullar as permissoes do http
const cors = require('cors')
//Importbda biblioteca do body-parser que ira manipular o corpo das requisicoes do protocolo http
const bodyParser = require('body-parser');
//Cria um objeto chamado app que sera especialista nas funcoes do express
const app = express();
//Import de arquivos do projeto 
const { getListEstados, getEstado } = require('./module/estados.js')
const { getListaCidades } = require('./module/cidades.js')

// request - receber dados
// response - devolve dados (escreve)
app.use((request, response, next) => {
    //header - permissoes, seguranca
    //body - dados (JSON)

    //Permite especificar quem serao os IPs que podem acessar a API ('*' - significa todos)
    response.header('Access-Control-Allow-Origin', '*');
    //Permite especificar quais serao os verbos ou metodos qur a API ira reconhecer 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //Estabelece que as permissoes acima serao representadas pelo cors
    app.use(cors());
    
    next();
});
//EndPoint: Inicio da API de Cidades 
app.get('/cidades', cors(), async function (request, response, next) {
    let message = {mensagem:  'Bem Vindo a API de Cidades'}
    response.status(200);
    response.json(message);
});

// EndPoint: Inicio da API de Estados 
// app.get('/estado', cors(), async function (request, response, next) {
//     let message = {mensagem:  'Bem Vindo a API de Estados'}
//     response.status(200);
//     response.json(message);
// });

//EndPoint: Listagem de Estados 
app.get('/estados', cors(), async function (request, response, next) {
    let estados = getListEstados();
    //Cria uma variavel do tipo JSON 
    let estadosJSON = {}
    if (estados) {
        //Criamos uma chave chamasda UF para receber o array de estados 
        estadosJSON.uf = estados
        response.status(200);
        response.json(estadosJSON);
    } else {
        response.status(400);
        response.json('{message: "Nenhum item encontrado"}');
    }
    // let message = {mensagem:  'Bem Vindo a API de Estados'}
    // response.status(200);
    // response.json(message);
});

//EndPoint: Busca estados pela sigla 
app.get('/estado/:sigla', cors(), async function (request, response, next) {
    //Recebe a sigla enviada por parametro no endPoint 
    let sigla = request.params.sigla;
    //Chama a funcao que vai localizar o estado solicitado com base na sigla
    let estado = getEstado(sigla);

    if (estado) 
    {
        response.status(200);
        response.json(estado);
    } else 
        response.status(404);
});

//EndPoint: Listagem de Cidades tendo como base a sigla do Estado 
app.get('/cidades/:sigla', cors(), async function (request, response, next) {
    //Recebe a sigla enviada por parametro no endPoint 
    let sigla = request.params.sigla;
    //Chama a funcao que vai localizar o estado solicitado com base na sigla
    let cidades = getListaCidades(sigla);
    //
    let cidadesJSON = {};
    if (cidades) 
    {
        cidadesJSON.city = cidades
        response.status(200);
        response.json(cidadesJSON);
    } else 
        response.status(404);
}); 

//Para que os endPoins possam estar funcionando obrigatoriamente finalizar 
//a API com essa function que representa o start da API
app.listen(8080, function () {
    console.log('Servidor aguardando requisicoes.');
});
