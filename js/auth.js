import { usuarios } from '../js/listagem-usuarios.js';

let usuarioLogado;

export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
        // Verifica se o nome existe e não está vazio (removendo espaços em branco)
        const usuarioEncontrado = usuarios.find((item) => {

            return item.email === usuario && item.senha === senha;
        });
        if (usuarioEncontrado) {
            resolve('Cadastro encontrado')
            usuarioLogado = ({
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            });
            console.log(usuarioLogado);
            sessionStorage.setItem('usuario', JSON.stringify(usuarioLogado))
        } else {

            reject("Dados incorretos. Favor verificar e tentar novamente.");
        }

    });
};