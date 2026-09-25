import { listarCursos } from "./cursos.js";

const dashboard = document.getElementById('dashboard');
const sair = document.getElementById('sair');
const usuario = document.querySelector('.nomeUsuario');
const cursos = document.getElementById('cursos');
const totalCursos = document.getElementById('cardTotalCursos');
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
                const dtInicioFormatada = moment(curso.dataInicio).format('DD/MM/YYYY');
                const dtFimFormatada = moment(curso.dataFim).format('DD/MM/YYYY');

                cursos.innerHTML += `<div class="cardCurso">
                <h3>${curso.nomeCurso}</h3>
                <p>Início: ${dtInicioFormatada}</p>
                <p>Fim: ${dtFimFormatada}</p>
            </div>`;
            });
            totalCursos.innerHTML = `<div class="cursosTotal">
            <h2 class="cursosH2">Total de cursos</h2>
            <h3 class="cursos><h3">${dados.length}</h3>
            </div>`

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