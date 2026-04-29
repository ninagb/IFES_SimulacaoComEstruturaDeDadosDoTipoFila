let pacotes = [];

let botaoAdicionar = document.getElementById("adicionar");

//Adicionando evento ao clicar no botão "Adicionar pacote à fila"
botaoAdicionar.onclick = function () {
  //Requisição à API externa pública que gera dados aleatórios de pessoas
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      //Dentro do success, para garantir que a API retornou ou dados, pegamos os dados desejados dentro do JSON da API
      let destinatario = data.results[0];
      let nome = destinatario.name.first;
      let sobrenome = destinatario.name.last;
      let rua = destinatario.location.street.name;
      let numeroRua = destinatario.location.street.number;
      let cidade = destinatario.location.city;
      let estado = destinatario.location.state;
      let pais = destinatario.location.country;
      let cep = destinatario.location.postcode;

      //Com os dados retornados da API, adicionamos objetos (com nome e endereço do destinatário) ao array pacotes
      pacotes.push({
        destinatario: " " + nome + " " + sobrenome,
        endereco:
          " " +
          rua +
          ", " +
          numeroRua +
          ", " +
          cidade +
          ", " +
          estado +
          ". CEP: " +
          cep,
      });

      let listaParaEntrega = document.getElementById("listaParaEntrega"); //id da ol
      let itemListaParaEntrega = document.createElement("li"); //criação do item da lista
      let ultimoPacote = pacotes[pacotes.length - 1]; //pegando o último objeto do array para exibir na lista
      itemListaParaEntrega.textContent =
        ultimoPacote.destinatario + " - " + ultimoPacote.endereco; //definindo o texto que vai ser exibido no item da lista
      listaParaEntrega.appendChild(itemListaParaEntrega); //Adicionando o li dentro do pai ol

      //imprimindo no console o array de objetos
      console.log(pacotes);
    },
  });
};

let botaoEntregar = document.getElementById("entregar");
botaoEntregar.onclick = function () {
  //Verificando se a fila está vazia
  if (pacotes.length === 0) {
    alert("Não há pacotes na fila! Adicione pacotes para entrega.");
    return; //obs.: o return para o código aqui. Não deixa o js continuar executando caso o array não tenha objetos
  }

  //Retirando o primeiro pacote da fila
  let pacoteRemovido = pacotes.shift();
  let listaEntregues = document.getElementById("listaEntregues");
  let itemListaEntregues = document.createElement("li"); //criando o elemento li (item da ol)
  itemListaEntregues.textContent =
    pacoteRemovido.destinatario + " - " + pacoteRemovido.endereco; //definindo o conteúdo do item da lista (li)
  listaEntregues.appendChild(itemListaEntregues); //adicionando o item da lista (li) dentro da lista (ol)

  console.log(pacotes); //imprimindo no console o array atualizado

  //Excluindo o pacote entregue da fila de pacotes para entrega
  let listaParaEntrega = document.getElementById("listaParaEntrega");
  let primeiroItem = listaParaEntrega.querySelector("li"); //pega o primeiro li da lista
  listaParaEntrega.removeChild(primeiroItem); //remove o primeiro li da lista ol do HTML

  //Animação no momento da entrega
  let entregador = document.getElementById("entregador");
  entregador.classList.remove("animando"); //verifica se tem algum elemento com classe entregador na tela e o exclui. Dessa forma, quando apertamos em Entregar pacote várias vezes, a animação reinicia a cada clique
  void entregador.offsetWidth; //uma estratégia para forçar o navegador a reparar que o elemento com classe entregador foi excluído. O navegador pode ignorar a "ordem" de exclusão e considerar só a de adição. O método offsetWidth retorna a largura do elemento (isso força o navegador a parar, para averiguar a informação pedida); e o avoid retorna undefined (não vamos usar o valor do método para nada)
  entregador.classList.add("animando");
};
