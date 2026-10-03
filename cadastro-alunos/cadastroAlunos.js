import { Aluno } from "../js/aluno.js";
import { CadastrarAluno } from "../js/alunos.js";

const dashboard = document.getElementById('dashboard');
const usuario = document.querySelector('.nomeUsuario');
const sair = document.getElementById('sair');
const cep = document.getElementById('cep');
const nome = document.getElementById('nome');
const genero = document.getElementById('genero');
const dtNascimento = document.getElementById('dtNascimento');
const dataErro = document.querySelector('.dataErro');
const cpf = document.getElementById('cpf');
const fone = document.getElementById('fone');
const email = document.getElementById('email');
const numero = document.getElementById('numero');
const complemento = document.getElementById('complemento');
const btnSalvar = document.querySelector('.btnSalvar');
const formulario = document.querySelector(".formContainer");
const cepErro = document.querySelector('.cepErro');
const camposErros = document.querySelector('.obrigatorio')

const usuarioString = sessionStorage.getItem('usuario');

const usuarioSession = JSON.parse(usuarioString);

usuario.textContent = usuarioSession.nome;


//* \/---campos preenchidos pela API ViaCep---\/

const bairro = document.getElementById('bairro');
const logradouro = document.getElementById('logradouro');
const estado = document.getElementById('estado');
const cidade = document.getElementById('cidade');


const camposObrigatorios = [cep, nome, genero, dtNascimento, cpf, fone, email, numero, bairro, cidade, logradouro, estado];

btnSalvar.disabled = true;

let dataValida = false;

dtNascimento.addEventListener('input', () => {
    dataValida = validaDataNascimento();
    validaCampos();
});


function validaCampos() {

    const nomeValido = nome.value.trim().length >= 4 && nome.value.trim().length <= 80;
    if (!nomeValido) {
        nome.classList.add('erroNome');
        camposErros.innerHTML = 'O texto deve ter entre 4 e 80 caracteres.';
    }else{
        nome.classList.remove('erroNome');
        camposErros.innerHTML = '';
        }
    const valorCep = cep.value.replace(/\D/g, '');

    const cepValido = valorCep.length === 8;

    const todosPreenchidos = camposObrigatorios.every(input => input.value.trim() !== '');

    btnSalvar.disabled = !(
        todosPreenchidos &&
        cepValido &&
        dataValida &&
        nomeValido
    );
}

const camposDigitados = [cep, nome, genero, dtNascimento, cpf, fone, email, numero];

camposDigitados.forEach(input => {
    input.addEventListener('input', validaCampos);
    if (input.tagName === 'SELECT') {
        input.addEventListener('change', validaCampos);
    }
});

cep.addEventListener('input', () => {
    const valorCep = cep.value.replace(/\D/g, '');

    logradouro.value = '';
    bairro.value = '';
    cidade.value = '';
    estado.value = '';

    if (valorCep.length !== 8) {
        cep.classList.add('class', 'erroCep');
        cepErro.innerHTML = 'O cep precisa de 8 digitos';
    } else {
        cep.classList.remove('erroCep');
        cepErro.innerHTML = '';
        validaCampos();
    }
    validaCampos();
});

async function buscarCEP() {
    const valorCep = cep.value.replace(/\D/g, '');

    if (valorCep.length === 8) {
        cep.classList.remove('erroCep');
        cepErro.innerHTML = '';

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${valorCep}/json/`);
            const dados = await resposta.json();
            if (!dados.erro) {
                logradouro.value = dados.logradouro;
                bairro.value = dados.bairro;
                cidade.value = dados.localidade;
                estado.value = dados.estado;

                validaCampos();

            } else {
                cep.classList.add('erroCep');
                cepErro.innerHTML = 'CEP não encontrado';
                logradouro.value = '';
                bairro.value = '';
                cidade.value = '';
                estado.value = '';

            }

        } catch (erro) {
            console.error("Erro ao buscar o cep:", erro);
            logradouro.value = '';
            bairro.value = '';
            cidade.value = '';
            estado.value = '';
        }
    } else {
        cep.classList.add('class', 'erroCep');
        cepErro.innerHTML = 'O CEP precisa de 8 digitos';
        validaCampos();
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

        dtNascimento.classList.add('erroCep')
        dataErro.classList.add('erro');
        dataErro.innerHTML = "Informe uma data válida no formato DD/MM/YYYY";
        return false;

    } else if (!dataNascimento.isAfter(dataMinima)) {

        dtNascimento.classList.add('erroCep')
        dataErro.classList.add('erro');
        dataErro.innerHTML = "A data deve ser posterior a 31/12/1899";
        return false;

    } else if (!dataNascimento.isBefore(dataAtual, 'day')) {

        dtNascimento.classList.add('erroCep')
        dataErro.classList.add('erro');
        dataErro.innerHTML = "A data deve ser anterior à data atual";
        return false;

    } else {

        dtNascimento.classList.remove('erroCep')
        dataErro.classList.remove('erro');
        dataErro.innerHTML = "";
        dataFormatada = dataNascimento.format('DD/MM/YYYY');
        return true;
    }
};

btnSalvar.addEventListener('click', () => {
    validaCampos();
    if (btnSalvar.disabled) {
        return;
    }
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
    formulario.reset();
    btnSalvar.disabled = true;
});

dashboard.addEventListener('click', () => window.location.href = '../dashboard/dashboard.html');

sair.addEventListener('click', () => {
    sessionStorage.removeItem('usuario');
    navigation.navigate('../login/login.html');

});