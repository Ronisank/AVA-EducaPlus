import { login } from "./auth.js";

const botaoEntrar = document.getElementById('btnEntrar');
const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const verSenha = document.getElementById('btn-senha');
const resetSenha = document.querySelector('.resetSenha');

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
        })
        .finally(() => {
            console.log("Verificação finalizada.");
        });
    
});
verSenha.innerHTML = '🙈';

verSenha.addEventListener('click', () => {
    if (senha.type === 'password') {
        senha.type = 'text';
        verSenha.innerHTML = '👁️'; // Mostra o olho aberto se a senha está visível
    } else {
        senha.type = 'password';
        verSenha.innerHTML = '🙈'; // Mostra o macaco se a senha escondeu
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