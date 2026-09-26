import { listarCursos } from "./cursos.js";

const dashboard = document.getElementById('dashboard');
const sair = document.getElementById('sair');
const usuario = document.querySelector('.nomeUsuario');
const cursos = document.getElementById('cursosUsuario');
const totalCursos = document.querySelector('.conteudoContador');
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
            cursos.innerHTML = "";
            let totalCursosAtivos = 0;
            dados.forEach(curso => {

                const dtInicioFormatada = moment(curso.dataInicio).format('DD/MM/YYYY');
                const dtFimFormatada = moment(curso.dataFim).format('DD/MM/YYYY');

                moment(curso.dataFim).isAfter(moment(), 'day') ? totalCursosAtivos++ : 0;

                console.log(dados)
                cursos.innerHTML += `<div class="cardCurso">
                <div class="infoCurso">
                    <img class="iconeCurso" src="${curso.iconeUrl}" alt="LogoCurso">
                    <h3>${curso.nomeCurso}</h3>
                    <p>Início: ${dtInicioFormatada}</p>
                    <p>Fim: ${dtFimFormatada}</p>
                </div>
            </div>`;
            });
            totalCursos.innerHTML = `
            <div class="cardTotal">
            <h2>Total de cursos</h2>
            <span>${dados.length}</span>
            </div>
            <div class="cardTotal">
            <h2>Cursos Ativos</h2>
            <span>${totalCursosAtivos}</span>
            </div>
            `

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