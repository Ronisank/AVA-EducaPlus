import { login } from "./auth.js";

const botaoEntrar = document.getElementById('btnEntrar');
const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const verSenha = document.getElementById('btn-senha');
const resetSenha = document.querySelector('.resetSenha');
const msgErro = document.getElementById('divErro');
const imagemSenhaOculta = `<img src="../assets/imagens/olho-fechado-senha.png"></img>`;
const imagemSenhaVisivel = `<img src="../assets/imagens/olho-aberto-senha.png"></img>`;


botaoEntrar.addEventListener('click', () => {
    const txtUsuario = usuario.value;
    const txtSenha = senha.value;

    login(txtUsuario, txtSenha)
        .then((mensagem) => {
            console.log(`Sucesso: ${mensagem}`);
            window.location.href = '../dashboard/dashboard.html'
        })
        .catch((erro) => {
            console.error(`Erro: ${erro}`);
            msgErro.innerHTML = `<p class="hidden">${erro}</p>`;
        })
        .finally(() => {
            console.log("Verificação finalizada.");
        });
    
});
verSenha.innerHTML = imagemSenhaOculta;

verSenha.addEventListener('click', () => {
    if (senha.type === 'password') {
        senha.type = 'text';
        verSenha.innerHTML = imagemSenhaVisivel; // Mostra o olho aberto se a senha está visível
    } else {
        senha.type = 'password';
        verSenha.innerHTML = imagemSenhaOculta; // Mostra o macaco se a senha escondeu
    }

})

usuario.onchange = validaCampos;
senha.onchange = validaCampos;

function validaCampos() {
    if (usuario.value && senha.value) { //Validação dos valores dos inputs
        botaoEntrar.disabled = false;
    } else {
        botaoEntrar.disabled = true;
    }
}
resetSenha.addEventListener('click', () => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "A funcionalidade está em construção.",
        footer: "<a href=\"#\">Why do I have this issue?</a>"
    });
});