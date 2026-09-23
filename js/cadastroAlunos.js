import { Aluno } from "./aluno.js";
import { CadastrarAluno } from "./alunos.js";

const dashboard = document.getElementById('dashboard');
const cep = document.getElementById('cep');
const nome = document.getElementById('nome');
const genero = document.getElementById('genero');
const dtNascimento = document.getElementById('dtNascimento');
const cpf = document.getElementById('cpf');
const fone = document.getElementById('fone');
const email = document.getElementById('email');
const numero = document.getElementById('numero');
const complemento = document.getElementById('complemento');
const btnSalvar = document.querySelector('.btnSalvar');

//* \/---campos preenchidos pela API ViaCep---\/

const bairro = document.getElementById('bairro');
const logradouro = document.getElementById('logradouro');
const estado = document.getElementById('estado');
const cidade = document.getElementById('cidade');


const camposObrigatorios = [cep, nome, genero, dtNascimento, cpf, fone, email, numero, bairro, cidade, logradouro, estado];

btnSalvar.disabled = true;

function validaCampos() {
    const todosPreenchidos = camposObrigatorios.every(input => input.value.trim() !== '');
    if (!todosPreenchidos || !validaDataNascimento()) {
        btnSalvar.disabled = true;
    } else {
        btnSalvar.disabled = false;
    }
}

const camposDigitados = [cep, nome, genero, dtNascimento, cpf, fone, email, numero];

camposDigitados.forEach(input => {
    input.addEventListener('input', validaCampos);
    if (input.tagName === 'SELECT') {
        input.addEventListener('change', validaCampos);
    }
});

async function buscarCEP() {
    const valorCep = cep.value.replace(/\D/g, '');
    if (valorCep.length === 8) {
        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${valorCep}/json/`);
            const dados = await resposta.json();
            if (!dados.erro) {
                logradouro.value = dados.logradouro;
                bairro.value = dados.bairro;
                cidade.value = dados.localidade;
                estado.value = dados.estado;

                validaCampos();
                console.log(camposDigitados, camposObrigatorios)
            } else {
                alert('CEP não encontrado');
            }

        } catch (erro) {
            console.error("Erro ao buscar o usuário:", erro);
        }
    } else {
        alert('cep precisa de 8 digitos')
        cep.value = '';
    }

}
cep.addEventListener('blur', buscarCEP);

// * \/---VALIDAÇÃO DA DATA DE NASCIMENTO COM O MOMENT.JS----\/


let dataFormatada;

function validaDataNascimento() {

    const dataNascimento = moment(
        dtNascimento.value,
        "YYYY-MM-DD",
        true
    );

    const dataMinima = moment(
        "31/12/1899",
        "DD/MM/YYYY",
        true
    );

    const dataAtual = moment();

    if (!dataNascimento.isValid()) {

        console.log("Informe uma data válida no formato DD/MM/YYYY");
        return false;
    } else if (!dataNascimento.isAfter(dataMinima)) {

        console.log("A data deve ser posterior a 31/12/1899");
        return false;
    } else if (!dataNascimento.isBefore(dataAtual, 'day')) {

        console.log("A data deve ser anterior à data atual");
        return false;
    } else {
        dataFormatada = dataNascimento.format('DD/MM/YYYY');
        console.log("Data válida!", dataNascimento);
        return true;
    }
};

btnSalvar.addEventListener('click', () => {
    const novoAluno = new Aluno(
        nome.value,
        genero.value,
        dataFormatada,
        cpf.value,
        fone.value,
        email.value,
        cep.value,
        cidade.value,
        estado.value,
        logradouro.value,
        numero.value,
        complemento.value,
        bairro.value
    );
    CadastrarAluno(novoAluno);
    console.log(novoAluno);
});

dashboard.addEventListener('click', () => window.location.href = '../dashboard/dashboard.html');