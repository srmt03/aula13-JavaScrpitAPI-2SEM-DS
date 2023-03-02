/**********************************************
 * Objetivo: Obter uma lista de estados 
 * Data: 29/08
 * Autor: Samuel Matos 
 * Versao: 1.0
 *********************************************/

//Simulando o resultado de uma API
var estados = 
[
    {
        sigla: 'SP',
        nome: 'Sao Paulo'
    },
    {
        sigla: 'RJ',
        nome: 'Rio de Janeiro'
    },
    {
        sigla: 'AC',
        nome: 'Acre'
    },
    {
        sigla: 'BA',
        nome: 'Bahia'
    },
    {
        sigla: 'MS',
        nome: 'Mato Grosso do Sul'
    },
    {
        sigla: 'MT',
        nome: 'Mato Grosso'
    },
    {
        sigla: 'GO',
        nome: 'Goias'
    }
];

//Retorna todos os estados pela sigla 
const getListEstados = function () {
    let listaEstados = [];
    erro = true;

    estados.forEach(item => {
        listaEstados.push(item.sigla);
        erro = false;
    });
    if (erro)
        return false;
    else
        //JSON.stringify - Converte um array[] para JSON{} 
        return listaEstados;
};

//Retorna os dados de um estado temdo como base a sigla 
const getEstado = function (siglaEstado) {
    let sigla = siglaEstado;
    //Cria um obejto do tipo JSON
    let estado = {};
    let erro = true;


    
    if (typeof(sigla) != 'undefined') 
    {
        //Tratamento para validacao de sigla vazia e com diferenca de caracteres 
        if (sigla != '' && sigla.length == 2) 
        {
            estados.forEach (item => {
                //Localiza um item no array (indexOf())
                if (item.sigla.indexOf(sigla.toUpperCase()) == 0) 
                {
                    //Criamos as chaves 'uf' e 'descricao' para enviar para JSON
                    estado.uf = item.sigla,
                    estado.descricao = item.nome
                    erro = false;
                }   
            });
        }

    }
    if (erro)            
            return false
        else 
            return estado 
}
//console.table(getListEstados());
//console.table(getEstado());
//console.log(getEstado('AC'));
//console.log(getEstado('A'));
//console.log(getEstado(''));

module.exports = {
    getListEstados,
    getEstado
}