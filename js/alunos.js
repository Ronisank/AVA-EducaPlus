import { alunos } from '../dados/listagem-alunos.js';

export function CadastrarAluno(aluno) {
    return new Promise((resolve, reject) => {
        if (aluno) {
            const maiorId = alunos.reduce((maiorIdAteAgora, idAtual) => {
                return idAtual.id > maiorIdAteAgora ? idAtual.id : maiorIdAteAgora;
            }, 0);
            aluno.id = maiorId + 1;

            alunos.push(aluno);

            resolve('Aluno cadastrado com sucesso!');
        } else {

            reject("Erro ao cadastrar o aluno");
        }


        console.table(alunos);
    })
};