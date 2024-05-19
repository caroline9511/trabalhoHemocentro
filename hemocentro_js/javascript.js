const readline = require('readline-sync');  // para chamar a pergunta no console

// Array para armazenar os doadores
let doadores = [];



// Função principal
function menu() {
    let opcao;
    while (opcao !== '5') {
        console.log("===== SISTEMA DE CADASTRO DE DOADORES DE SANGUE =====");
        console.log("1. Cadastrar doador");
        console.log("2. Listar doadores");
        console.log("3. Buscar doador por tipo sanguíneo");
        console.log("4. Buscar doador por data da última doação");
        console.log("5. Sair");
        opcao = readline.question("Escolha uma opcao: ");

        switch (opcao) {
            case '1':
                cadastrarDoador();
                break;
            case '2':
                listarDoadores();
                break;
            case '3':
                buscarPorTipoSanguineo();
                break;
            case '4':
                buscarPorDataUltimaDoacao();
                break;
            case '5':
                console.log("\nEncerrando o programa...\n");
                break;
            default:
                console.log("\nOpção inválida. Tente novamente.\n");
        }
    }
}

// Chamada da função principal para iniciar o programa
menu();

module.exports = doadores;

// Função para cadastrar um doador
function cadastrarDoador() {
    let doador = {};
    let continuarCadastro = true;  //s escolher a opção1, (verdadeiro) completa o cadastro.

    while (continuarCadastro) {  // loop para o cadastro.
        console.log("===== CADASTRO DE DOADOR =====");

        let nome = readline.question("\nDigite 'S' para cancelar: \nNome:").toUpperCase();

        if (nome === 'S') {   //se digitar s sai da opção escolhida e volta ao menu
            console.log('Encerrando cadastro de usuário...');
            continuarCadastro = false;
        } else {    // se não digitar o s, preencher os dadods do doador.
            let idade = readline.question("Idade: ");
            let peso = readline.question("Peso: ");
            let tipoSanguineo = readline.question("Tipo Sanguineo: ").toUpperCase();
            let ultimaDoacao = readline.question("Data da ultima Doacao (dd/mm/aaaa): ");

            if (idade < 18 || idade > 69) {
                console.log("\nDesculpe, apenas pessoas com mais de 18 anos e menos de 69 anos podem se cadastrar como doadores.\n");
            } else if (peso < 50) {
                console.log('\nDoador não cadastrado, abaixo do peso.\n');
            } else {
                doador = {   // objeto para armazenar os dados do doador cadastrado
                    nome: nome,
                    idade: idade,
                    peso: peso,
                    tipoSanguineo: tipoSanguineo,
                    ultimaDoacao: ultimaDoacao
                };

                doadores.push(doador);  //adiciona o objeto do doador cadastrado no array
                console.log("\nDoador cadastrado com sucesso!\n");
            }
        }
    }
}

// Função para listar todos os doadores
function listarDoadores() {
    imprimirResultados(doadores);
}

// Função para imprimir os resultados da busca
function imprimirResultados(doadoresEncontrados) {
    console.log("------------------------");
    console.log("RESULTADO DA BUSCA:");
    console.log("------------------------");
    console.log("NOME             | IDADE | PESO | TIPO SANGUÍNEO | ÚLTIMA DOAÇÃO");
    console.log("-----------------------------------------------------------------");
    doadoresEncontrados.forEach(doador => { //forEach para executar o doador 
        console.log(`${doador.nome.padEnd(16)}| ${doador.idade.toString().padEnd(6)}| ${doador.peso.toString().padEnd(5)}| ${doador.tipoSanguineo.padEnd(15)}| ${doador.ultimaDoacao}`);
    });
    console.log("-----------------------------------------------------------------");
}

// Função para buscar doador por tipo sanguíneo
function buscarPorTipoSanguineo() {
    const tiposSanguineosValidos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']; //array de tipos sanguineos

    let continuarBusca = true;  //se escolhido a opção3 (verdadeiro)

    while (continuarBusca) {  // loop para buscar tipo sanguineo
        console.log("===== BUSCA POR TIPO SANGUÍNEO =====");

        let tipoSanguineo = readline.question("\nDigite 'S' para SAIR: \nDigite o tipo sanguineo desejado:").toUpperCase();

        if (tipoSanguineo === 'S') {
            console.log('Saindo do programa...'); // se digitar 's' sai da opção3 e volta para o menu
            continuarBusca = false;
        } else {
            if (!tiposSanguineosValidos.includes(tipoSanguineo)) { //includes para verificar se o tipo sanguineo digitado é valido
                console.log("\nTipo sanguíneo inválido. Por favor, digite um dos seguintes tipos: " + tiposSanguineosValidos.join(', ') + "\n"); // vai imprimir as opções de tipo sanguineo validos
            } else {
                let doadoresEncontrados = doadores.filter(doador => doador.tipoSanguineo === tipoSanguineo);

                if (doadoresEncontrados.length === 0) {
                    console.log(`\nTipo sanguíneo '${tipoSanguineo}' não encontrado\n`);
                } else {
                    imprimirResultados(doadoresEncontrados);
                }
            }
        }
    }
}
// Função para buscar doador por data da última doação
function buscarPorDataUltimaDoacao() {
    let continuarBusca = true;

    while (continuarBusca) {
        console.log("===== BUSCA POR DATA DA ÚLTIMA DOAÇÃO =====");
        let dataDesejada = readline.question("\nDigite 'S' para cancelar: \nDigite a data desejada (dd/mm/aaaa)");
        const data = dataDesejada.split('/').reverse().join('/') // para inverter a data desejada
    
        if (dataDesejada.toUpperCase() === 'S') {
            console.log("Cancelando busca...");
            continuarBusca = false;
        } else {
            let doadoresEncontrados = doadores.filter(doador => doador.ultimaDoacao <= data); // filtrar os doadores cadastrados 

            if (doadoresEncontrados.length === 0  ) { 
                console.log(`\nNenhum doador encontrado com data de última doação em ${dataDesejada}\n`);
        }else {
                imprimirResultados(doadoresEncontrados);
            }
        }
    }
}







