import { alunos } from '../dados/listagem-alunos.js';

export function CadastrarAluno(aluno) {
    return new Promise((resolve, reject) => {
        if (aluno) {
            const maiorId = alunos.reduce((maiorIdAteAgora, idAtual) => {
                return idAtual.id > maiorIdAteAgora ? idAtual.id : maiorIdAteAgora;
            }, 0);
            aluno.id = maiorId + 1;

            alunos.push(aluno);


            resolve(Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Aluno cadastrado com sucesso!",
                showConfirmButton: false,
                timer: 1500
            }));
        } else {

            reject(Swal.fire({
                title: "Erro ao cadastrar o aluno",
                icon: "error",
                draggable: true
            }));
        }


        console.table(alunos);
    })
};