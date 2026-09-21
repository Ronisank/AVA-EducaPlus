import { cursos } from "../dados/listagem-cursos.js";

const usuarioString = sessionStorage.getItem('usuario');

const usuarioSession = JSON.parse(usuarioString);

// const usuarioEmail = usuarioSession.email;

let cursosUsuario;

export function listarCursos(usuario) {
    return new Promise((resolve, reject) => {
        console.log(usuario, 'dentro da função listarcurso')
        const cursoEncontrado = cursos.filter((item) => {

            return item.emailProfessor === usuario.email;
        });
        if (cursoEncontrado.length > 0) {
            cursosUsuario = cursoEncontrado.map((index) => {
                return ({
                    nomeCurso: index.nomeCurso,
                    dataInicio: index.dataInicio,
                    dataFim: index.dataFim
                });
            })

            resolve(cursosUsuario)
        } else {

            reject("Não há cursos cadastrados para esse usuário.");
        }
    }
    )
};
// listarCursos(usuarioEmail);
