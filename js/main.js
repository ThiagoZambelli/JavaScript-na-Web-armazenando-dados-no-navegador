//criação de uma cosntante que pega o formulario do HTML e carrega nela
const form = document.getElementById("novoItem");
//criação de uma cosntante que a Ul do HTML com o ID lista e carrega nela
const lista = document.getElementById("lista")
//criação de uma cosntante que pega os elementos com o nome "itens" de dentro so LocalStorage (que são sempre salvos como string)
//e passa pelo metodo do JSON para transformar novamente em arrey ou se o localStorage estiver vazio cria um novo arrey
const itens = JSON.parse(localStorage.getItem("itens")) || [];

//um forEach passando por todos os elementos do arrey itens criado anteriormente e chamando a função criarElemento
// isso vai criar a lista com todos os elementos salvos no LocalStorage sempre que carregar a pagina
itens.forEach((elemento) => {
    //P.S forEach passa por todos os elementos de uma lista
   criaElemento(elemento);
})

// Pega o formulario, antes salvo em uma variavel, e seta um evento de click no "submit" (Botao do formulario)
form.addEventListener("submit", (evento)=>{
    //Faz com que o evento intrinsico ao submit não aconteça (recarregar a pagina) 
    evento.preventDefault();

    //Criação da variavel pegando o capo "nome" do formulario passado no target do evento
    const nome = evento.target.elements["nome"];
    //Criação da variavel pegando o capo "quantidade" do formulario passado no target do evento
    const quantidade = evento.target.elements["quantidade"]
    
    //criação de uma cosntante no formato de objeto, para salvar o nome e a quantidade do formulario
    const itemAtual = {
        "nome" : nome.value,
        "quantidade": quantidade.value
    }  

    //chamando a função criar elemento passando o objeto criado anteriormente
    criaElemento(itemAtual);

    //adicionando o objero criado anteriormente na lista atual de itens
    itens.push(itemAtual);

    //salvando no LocalStorage, o obejeto recem criado, no formato de string, passando ele antes pelo metodo JSON stringfy
    localStorage.setItem("itens", JSON.stringify(itens));

    //limpando os inputs 
    quantidade.value = "";
    nome.value = "";
})

//função responsavel por receber um objeto e criar as li na tela com o mesmo
function criaElemento(item){   
    //cria uma constante com um elemento li chamado novoItem
    const novoItem = document.createElement('li');
    //coloca no novo item uma classe "item"
    novoItem.classList.add("item");

    //cria um elemento Strong chamado numeroItem
    const numeroItem = document.createElement("strong");
    //seta um valor dentro do elemento usando a quantidade passada pelo objeto recebido como parametro
    numeroItem.innerHTML = item.quantidade;
    //insere na li crada anteriormente um elemento filho, sendo esse o elemento Strong criado anteriormente
    novoItem.appendChild(numeroItem);
    //Correção feita por mim, colocando a primeira letra de todos os itens como maiuscula
    let nomeCorrigido = item.nome[0].toUpperCase() + item.nome.substring(1);
    //coloca como valor da li o nome do objeto recebido como parametro da funçaõ
    novoItem.innerHTML += nomeCorrigido;
    
    //insere na lista carregada no inicio do documento js o item criado, sendo esse a <li classe="item"><Strong>quantidade</Strong>nome</li>
    lista.appendChild(novoItem);   
}