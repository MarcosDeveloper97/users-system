const prompt = require("prompt-sync")();
const fs = require("fs");

let opcao = 0;
let usuario = [];

if (fs.existsSync("usuarios.json")) {
    usuario = JSON.parse(fs.readFileSync("usuarios.json"));
}

function mostrarMenu() {
    console.log("\n1- Cadastrar usuario");
    console.log("2- Listar usuarios");
    console.log("3- Buscar usuario");
    console.log("4- Excluir usuario");
    console.log("5- Editar usuario");
    console.log("6- Estatisticas");
    console.log("7- Relatório");
    console.log("8- Fazer Backup");
    console.log("9- Sair");
}

function salvarDados() {
    fs.writeFileSync("usuarios.json", JSON.stringify(usuario, null, 2));
}

function listarUsuarios() {

    if (usuario.length == 0) {
        console.log("Nenhum usuario cadastrado");
    } 
    
    else {

        console.log("\n1- Ordem A-Z");
        console.log("2- Menor idade");
        console.log("3- Mais recente");

        let ordem = Number(prompt("Escolha: "));

        if (ordem == 1) {
            usuario.sort((a, b) => a.nome.localeCompare(b.nome));
        }

        else if (ordem == 2) {
            usuario.sort((a, b) => a.idade - b.idade);
        }

        else if (ordem == 3) {
            usuario.sort((a, b) => b.id - a.id);
        }

        for (let i = 0; i < usuario.length; i++) {
            console.log(
                (i + 1) +
                " - ID: " + usuario[i].id +
                " | Nome: " + usuario[i].nome +
                " | Idade: " + usuario[i].idade
            );
        }
    }
}
function mostrarEstatisticas() {

    if (usuario.length == 0) {
        console.log("Nenhum usuario cadastrado");
        return;
    }

    let soma = 0;
    let maisVelho = usuario[0];
    let maisNovo = usuario[0];

    for (let i = 0; i < usuario.length; i++) {

        soma += usuario[i].idade;

        if (usuario[i].idade > maisVelho.idade) {
            maisVelho = usuario[i];
        }

        if (usuario[i].idade < maisNovo.idade) {
            maisNovo = usuario[i];
        }
    }

    let media = soma / usuario.length;

    console.log("Total usuarios:", usuario.length);
    console.log("Media idade:", media.toFixed(1));
    console.log("Mais velho:", maisVelho.nome, "-", maisVelho.idade);
    console.log("Mais novo:", maisNovo.nome, "-", maisNovo.idade);
}

function gerarRelatorio() {

    if (usuario.length == 0) {
        console.log("Nenhum usuario cadastrado");
        return;
    }

    let texto = "RELATORIO DE USUARIOS\n\n";
    let soma = 0;

    for (let i = 0; i < usuario.length; i++) {

        texto +=
            (i + 1) + " - " +
            usuario[i].nome +
            " - " +
            usuario[i].idade +
            " anos\n";

        soma += usuario[i].idade;
    }

    texto += "\nTotal usuarios: " + usuario.length;

    texto += "\nMedia idade: " + (soma / usuario.length).toFixed(1);

    fs.writeFileSync("relatorio.txt", texto);

    console.log("Relatorio gerado com sucesso!");
}

function fazerbackup(){
    if(usuario.length == 0){
        console.log("Nenhum arquivo para backup")
        return;
    }
    let data = new Date();
    let nomeArquivo =
    "backup_" +
    data.getFullYear() +"-"+
    (data.getMonth()+ 1)+"-"+
    data.getDate()+
    ".Json";

    fs.writeFileSync(nomeArquivo, JSON.stringify(usuario, null, 2));

    console.log("Backup criado:", nomeArquivo);


}

while (opcao != 9) {

    mostrarMenu();

    opcao = Number(prompt("Escolha: "));

    if (opcao == 1) {

       let nome = prompt("Digite seu nome: ");
       let idade = Number(prompt("Digite sua idade: "));

       let erro = false;

    if (nome.trim() == "") {
    console.log("Nome inválido");
    erro = true;
}

    if (isNaN(idade) || idade <= 0) {
    console.log("Idade inválida");
    erro = true;
}

    if (erro) {
    continue;
}
        usuario.push({
            id: Date.now(),
            nome: nome,
            idade: idade
        });

        salvarDados();

        console.log("Usuario cadastrado com sucesso");
    }

    else if (opcao == 2) {
        listarUsuarios();
    }

    else if (opcao == 3) {

        let busca = prompt("Digite o ID ou Nome: ").toLowerCase();
        let encontrado = false;

        for (let i = 0; i < usuario.length; i++) {

            if (
                usuario[i].id == Number(busca) ||
                usuario[i].nome.toLowerCase().includes(busca)
            ) {

                console.log("Usuario encontrado");
                console.log("ID:", usuario[i].id);
                console.log("Nome:", usuario[i].nome);
                console.log("Idade:", usuario[i].idade);
                console.log("--------------")

                encontrado = true;
                
            }
        }

        if (encontrado == false) {
            console.log("Usuario nao encontrado");
        }
    }

    else if (opcao == 4) {

    let excluir = Number(prompt("Digite o ID para excluir: "));
    let encontrado = false;

    for (let i = 0; i < usuario.length; i++) {

        if (usuario[i].id == excluir) {

            let confirmacao = prompt("Tem certeza que deseja excluir? (s/n): ");

            if (confirmacao.toLowerCase() == "s") {

                usuario.splice(i, 1);
                salvarDados();
                console.log("Usuario excluido");

            } else {
                console.log("Operacao cancelada");
            }

            encontrado = true;
            break;
        }
    }

    if (encontrado == false) {
        console.log("Usuario nao encontrado");
    }
}

    else if (opcao == 5) {

        let busca = Number(prompt("Digite o ID para editar: "));
        let encontrado = false;

        for (let i = 0; i < usuario.length; i++) {

           if (usuario[i].id == busca) {

    let confirmacao = prompt("Tem certeza que deseja editar? (s/n): ");

    if (confirmacao.toLowerCase() == "s") {

        let novoNome = prompt("Novo nome: ");
        let novaIdade = Number(prompt("Nova idade: "));

        usuario[i].nome = novoNome;
        usuario[i].idade = novaIdade;

        salvarDados();

        console.log("Usuario atualizado");

    } else {
        console.log("Edicao cancelada");
    }

    encontrado = true;
    break;
  }
}

        if (encontrado == false) {
            console.log("Usuario nao encontrado");
        }
    }

    else if (opcao == 6) {
        mostrarEstatisticas();
    }

    else if (opcao == 7) {
        gerarRelatorio();
    }

    else if (opcao == 8) {
        fazerbackup();
    }


    else if (opcao == 9) {
        console.log("Encerrar programa");
    }

    else {
        console.log("Opcao invalida");
    }
}