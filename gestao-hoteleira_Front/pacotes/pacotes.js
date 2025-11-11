// Script relacionado ao módulo de pessoas

// Array principal armazenado no navegador
if (localStorage.getItem('listaPacote') == null) {
    listaPacote = [];
    localStorage.setItem('listaPacote', JSON.stringify(listaPacote));
} else {
    listaPacote = JSON.parse(localStorage.getItem('listaPacote'));
}

// Aguarda o carregamento do HTML para ser executado
document.addEventListener('DOMContentLoaded', function () {

    // Chamadas
    listar();

    // Salva cadastro e edição
    document.querySelector('#bt-salvar').addEventListener('click', function () {
        // Pega os dados dos campos do formulário
        let nomeDoPacote = document.querySelector('#campo-nome-do-pacote').value;
        let acomodacao = document.querySelector('#campo-acomodacao').value;
        let QuantidadeDeDiarias = document.querySelector('#campo-Quantidade_de_Diarias').value;
        let valorDaDiaria = document.querySelector('#campo-valor_da_diaria').value;

        // Validações de campos
        if (acomodacao == "") {
            alert("acomodacão é um campo obrigatório!");
            return;
        } else if (QuantidadeDeDiarias == "") {
            alert("quantidade de diárias é um campo obrigatório!");
            return;
        } else if (valorDaDiaria == "") {
            alert("valor da diária é um campo obrigatório!");
            return;
        }

        // Cria objeto
        let pacote = {
            id: (id != "") ? id : getMaiorIdLista() + 1,
            nomeDoPacote: nomeDoPacote,
            acomodacao: acomodacao,
            QuantidadeDeDiarias: QuantidadeDeDiarias,
            valorDaDiaria: valorDaDiaria,
        };

        // Altera ou insere uma posição no array principal
        if (id != "") {
            listapacote[indice] = pacote;
        } else {
            listapacote.push(pacote);
        }

        // Armazena a lista atualizada no navegador
        localStorage.setItem('listaPacote', JSON.stringify(listaPacote));

        // Reseta o formulário e recarrega a tabela de listagem
        this.blur();
        resetarForm()

        // Recarrega listagem
        carregar("Salvo com sucesso!");
        listar();
    });

    // Cancelamento de edição
    document.querySelector('#bt-cancelar').addEventListener('click', function () {
        resetarForm();
    });

});

// Funções

function listar() {
    document.querySelector('table tbody').innerHTML = "";
    document.querySelector('#total-registros').textContent = listaPacote.length;
    listaPessoas.forEach(function (objeto) {
        // Cria string html com os dados da lista
        let htmlAcoes = "";
        htmlAcoes += '<button class="bt-tabela bt-editar" title="Editar"><i class="ph ph-pencil"></i></button>';
        htmlAcoes += '<button class="bt-tabela bt-excluir" title="Excluir"><i class="ph ph-trash"></i></button>';

        let htmlColunas = "";
        htmlColunas += "<td>" + objeto.nomeDoPacote + "</td>";
        htmlColunas += "<td>" + objeto.acomodacao + "</td>";
        htmlColunas += "<td>" + objeto.QuantidadeDeDiarias + "</td>";
        htmlColunas += "<td>" + objeto.valorDaDiaria + "</td>";
        htmlColunas += "<td>" + htmlAcoes + "</td>";

        // Adiciona a linha ao corpo da tabela
        let htmlLinha = '<tr id="linha-' + objeto.id + '">' + htmlColunas + '</tr>';
        document.querySelector('table tbody').innerHTML += htmlLinha;
    });

    eventosListagem();
    carregar();
}

function eventosListagem() {
    // Ação de editar objeto
    document.querySelectorAll('.bt-editar').forEach(function (botao) {
        botao.addEventListener('click', function () {
            // Pega os dados do objeto que será alterado
            let linha = botao.parentNode.parentNode;
            let colunas = linha.getElementsByTagName('td');
            let nomeDoPacote = colunas[1].textContent;
            let acomodacao = colunas[2].textContent;
            let QuantidadeDeDiarias = colunas[3].textContent;
            let valorDaDiaria = colunas[4].textContent;

            // Popula os campos do formulário
            document.querySelector('#campo-nome-do-pacote').value = nomeDoPacote;
            document.querySelector('#campo-acomodacao').value = acomodacao;
            document.querySelector('#campo-quantidade-de-diarias').value = QuantidadeDeDiarias;
            document.querySelector('#campo-valor-da-diaria').value = valorDaDiaria;

            // Exibe botão de cancelar edição
            document.querySelector('#bt-cancelar').style.display = 'flex';
        });
    });

    // Ação de excluir objeto
    document.querySelectorAll('.bt-excluir').forEach(function (botao) {
        botao.addEventListener('click', function () {
            if (confirm("Deseja realmente excluir?")) {
                // Remove objeto da lista
                let linha = botao.parentNode.parentNode;
                let id = linha.id.replace('linha-', '');
                let indice = getIndiceListaPorId(id);
                listaPacote.splice(indice, 1);

                // Armazena a lista atualizada no navegador
                localStorage.setItem('listaPacote', JSON.stringify(listaPacote));

                // Recarrega a listagem
                listar();
            }
        });
    });
}

function getIndiceListaPorId(id) {
    indiceProcurado = null;
    listaPessoas.forEach(function (objeto, indice) {
        if (id == objeto.id) {
            indiceProcurado = indice;
        }
    });
    return indiceProcurado;
}

function getMaiorIdLista() {
    if (listaPessoas.length > 0) {
        return parseInt(listaPessoas[listaPessoas.length - 1].id);
    } else {
        return 0;
    }
}

function resetarForm() {
    document.querySelector('#bt-cancelar').style.display = 'none';
    document.querySelector('#campo-id').value = "";
    document.querySelector('#campo-nome-do-pacote').value = "";
    document.querySelector('#campo-acomodacao').value = "";
    document.querySelector('#campo-quantidade-de-diarias').value = "";
    document.querySelector('#campo-valor-da-diaria').value = "";
}