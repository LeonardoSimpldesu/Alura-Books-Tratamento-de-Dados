/* Async, declara a função como uma função asyncrona */
async function buscaEndereco(cep){
    const mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""
    /* A função do try é tentar executar o bloco inteiro do código, caso não consiga, o catch irá capturar o erro */
    try{
    /* O fetch realiza uma "Promessa" e o await faz com que o código seguinte só seja executado quando a promessa for concluída  */
    /* Await é apenas para funções Async */ 
    const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    /* Converter o resultado da promessa para um Json */
    const consultaCEPConvertida = await consultaCEP.json()
    /* Se o resultado da promessa Json resultar em erro, envia o erro para o catch */
    if (consultaCEPConvertida.erro){
        /* 'Throw Error' vai enviar o erro para o Catch, caso o cep não exista */
        throw Error('CEP não existe!')
    }
    /* Buscando os campos no HTML */
    const cidade = document.getElementById('cidade')
    const logradouro = document.getElementById('endereco')
    const estado = document.getElementById('estado')
    const bairro = document.getElementById('bairro')
    
    /* Adicionando o resultado da busca do cep aos camposdo HTML */
    cidade.value = consultaCEPConvertida.localidade
    logradouro.value = consultaCEPConvertida.logradouro
    estado.value = consultaCEPConvertida.uf
    bairro.value = consultaCEPConvertida.bairro

    /* Retorna o resultado da ConsultaCepConvertida */
    console.log(consultaCEPConvertida)
    return consultaCEPConvertida
    /* Captura o erro caso exista */
    }catch(erro){
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`
    }
}

const cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))


/* 
Array de ceps para consultas
let ceps = ['01001000', '01001001']
Para cada cep executar a função buscaEndereco enviando como parametro o cep
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores))
Criando varias promessas com o conjutoCeps para que retorne o resultado pronto 
Promise.all(conjuntoCeps).then(respostas => console.log(respostas)) 
*/







/* Construção de uma função Assíncrona em uma estrutura Sincrona (Não recomendado essa estrutura) */
/* 
-- Todo esse bloco é uma única linha de código

-- Fetch está fazendo uma 'Promessa" e executa o resto do código sem esperar o resultado
const consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
-- 'Then' executa quando a promessa for concluida
.then(resposta => resposta.json())
.then(r =>{
    if(r.erro){
        'Throw Error' vai enviar o erro para o Catch, caso o cep não exista
        throw Error('Esse cep não existe!')
    }else{
        console.log(r)
    }
} )
-- 'catch' irá capturar o erro caso exista
.catch(erro => console.log(erro))

-- 'Finally' executa quando a promessa foi concluida, independende do resultado 
.finally(mensagem => console.log('Processamento Concluído'))
 */