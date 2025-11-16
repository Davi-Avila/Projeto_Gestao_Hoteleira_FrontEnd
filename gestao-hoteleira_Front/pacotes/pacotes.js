// Array principal armazenado no navegador
let listaPacote = JSON.parse(localStorage.getItem('listaPacote')) || [];
localStorage.setItem('listaPacote', JSON.stringify(listaPacote));

document.addEventListener('DOMContentLoaded', function () {
    listar();

    document.querySelector('#bt-salvar').addEventListener('click', function () {
        // Pega os dados dos campos do formulário
        let id = document.querySelector('#campo-id').value;
        let nomeDoPacote = document.querySelector('#campo-nome-pacote').value.trim();
        let acomodacao = document.querySelector('#campo-acomodacao').value;
        let quantidadeDeDiarias = document.querySelector('#campo-quantidade-diarias').value;
        let valorDaDiaria = document.querySelector('#campo-valor-diaria').value;

        // Validações de campos
        if (nomeDoPacote === "") {
            alert("Nome do pacote é obrigatório!");
            return;
        } else if (acomodacao === "") {
            alert("Acomodação é obrigatória!");
            return;
        } else if (quantidadeDeDiarias === "") {
            alert("Quantidade de diárias é obrigatória!");
            return;
        } 
        // Cria objeto
        let pacote = {
            id: id ? parseInt(id) : getMaiorIdLista() + 1,
            nomeDoPacote,
            acomodacao,
            quantidadeDeDiarias,
            valorDaDiaria
        };

        // Altera ou adiciona
        if (id) {
            let indice = getIndiceListaPorId(id);
            listaPacote[indice] = pacote;
        } else {
            listaPacote.push(pacote);
        }

        // Atualiza localStorage
        localStorage.setItem('listaPacote', JSON.stringify(listaPacote));

        resetarForm();
        listar();
        alert("Pacote salvo com sucesso!");
    });

    document.querySelector('#bt-cancelar').addEventListener('click', function () {
        resetarForm();
    });
});

// Listagem
function listar() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = "";
    document.querySelector('#total-registros').textContent = listaPacote.length;

    listaPacote.forEach(function (objeto) {
        let htmlAcoes = `
        <button type="button" class="bt-tabela bt-editar" data-id="${objeto.id}" title="Editar"><i class="ph ph-pencil"></i></button>
        <button type="button" class="bt-tabela bt-excluir" data-id="${objeto.id}" title="Excluir"><i class="ph ph-trash"></i></button>
        `;


        let htmlLinha = `
            <tr id="linha-${objeto.id}">
                <td>${objeto.id}</td>
                <td>${objeto.nomeDoPacote}</td>
                <td>${objeto.acomodacao}</td>
                <td>${objeto.quantidadeDeDiarias}</td>
                <td>${objeto.valorDaDiaria}</td>
                <td>${htmlAcoes}</td>
            </tr>
        `;

        tbody.innerHTML += htmlLinha;
    });

    eventosListagem();
}

// Eventos de editar/excluir
function eventosListagem() {
    document.querySelectorAll('.bt-editar').forEach(function (botao) {
        botao.addEventListener('click', function () {
            let id = botao.dataset.id;
            let pacote = listaPacote.find(p => p.id == id);

            document.querySelector('#campo-id').value = pacote.id;
            document.querySelector('#campo-nome-pacote').value = pacote.nomeDoPacote;
            document.querySelector('#campo-acomodacao').value = pacote.acomodacao;
            document.querySelector('#campo-quantidade-diarias').value = pacote.quantidadeDeDiarias;
            document.querySelector('#campo-valor-diaria').value = pacote.valorDaDiaria;
        });
    });

    document.querySelectorAll('.bt-excluir').forEach(function (botao) {
        botao.addEventListener('click', function () {
            if (confirm("Deseja realmente excluir este pacote?")) {
                let id = botao.dataset.id;
                let indice = getIndiceListaPorId(id);
                listaPacote.splice(indice, 1);
                localStorage.setItem('listaPacote', JSON.stringify(listaPacote));
                listar();
            }
        });
    });
}

function getIndiceListaPorId(id) {
    return listaPacote.findIndex(p => p.id == id);
}

function getMaiorIdLista() {
    if (listaPacote.length > 0) {
        return Math.max(...listaPacote.map(p => p.id));
    } else {
        return 0;
    }
}

function resetarForm() {
    document.querySelector('#campo-id').value = "";
    document.querySelector('#campo-nome-pacote').value = "";
    document.querySelector('#campo-acomodacao').value = "";
    document.querySelector('#campo-quantidade-diarias').value = "";
    document.querySelector('#campo-valor-diaria').value = "";
}
