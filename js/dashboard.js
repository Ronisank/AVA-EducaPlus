import { listarCursos } from "./cursos.js";

const dashboard = document.getElementById('dashboard');
const sair = document.getElementById('sair');
const usuario = document.querySelector('.nomeUsuario');
const cursos = document.getElementById('cursos');
const cadastroAlunos = document.getElementById('cadastro');
const erroCursos = document.querySelector('.erroCursos');

const usuarioString = sessionStorage.getItem('usuario');

const usuarioSession = JSON.parse(usuarioString);

usuario.textContent = usuarioSession.nome;

dashboard.addEventListener('click', () => window.location.href = '../dashboard/dashboard.html');


cadastroAlunos.addEventListener('click', () => {
    navigation.navigate('../cadastro-alunos/cadastroAluno.html');
})

sair.addEventListener('click', () => {
    sessionStorage.removeItem('usuario');
    navigation.navigate('../login/login.html');

});

function exibirCursos() {
    return listarCursos(usuarioSession)
        .then((dados) => {
            dados.forEach(curso => {
                cursos.innerHTML += `<div class="card-curso">
                <h3>${curso.nomeCurso}</h3>
                <p>Início: ${curso.dataInicio}</p>
                <p>Fim: ${curso.dataFim}</p>
            </div>`;
            });

        })
        .catch((erro) => {
            erroCursos.innerHTML = `<div class="erroCursos"><p class="hidden">${erro}</p></div>`
            console.error(`Erro: ${erro}`);

        })
        .finally(() => {
            console.log("Verificação finalizada.");
        });
}
exibirCursos();