import axios from "axios";

export const api = axios.create({
  baseURL: "http://35.184.203.56:8009/",
  // baseURL: "http://localhost:8080/",
});

const acessToken = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${acessToken}`,
  },
};

export const postTermoResp = (userId, configuracao) => {
  return api.post(
    "usuario/termoDeResponsabilidade",
    {
      termo:
        "TERMO DE RESPONSABILIDADE\n\n1. Condição Física e Saúde\n1.1 Declaro que estou ciente de que a prática de exercícios físicos envolve riscos inerentes, e afirmo estar em condições físicas adequadas para participar das atividades propostas no Site.\n1.2 Comprometo-me a informar imediatamente o Site sobre qualquer alteração na minha condição de saúde que possa afetar minha capacidade de realizar os exercícios propostos.\n\n2. Conhecimento das Instruções\n2.1 Reconheço ter recebido e lido todas as instruções fornecidas pelo Site, incluindo vídeos, textos e orientações sobre a execução correta dos exercícios.\n2.2 Comprometo-me a seguir rigorosamente as instruções fornecidas pelo Site e a realizar os exercícios de forma segura.\n\n3. Responsabilidade Pessoal\n3.1 Entendo que a prática de exercícios físicos online é de minha inteira responsabilidade, e assumo os riscos associados a ela.\n3.2 Isento o Site, seus colaboradores, instrutores e proprietários de qualquer responsabilidade por lesões, danos, ou outros inconvenientes que possam ocorrer durante ou após a prática de exercícios propostos pelo Site.\n\n4. Aconselhamento Médico\n4.1 Reconheço a importância de buscar a orientação de um profissional de saúde antes de iniciar qualquer programa de exercícios, especialmente se tenho alguma condição médica pré-existente.\n4.2 Comprometo-me a consultar um profissional de saúde antes de iniciar qualquer programa de exercícios, caso tenha dúvidas sobre minha condição física.\n\n5. Uso Adequado de Equipamentos\n5.1 Comprometo-me a utilizar corretamente qualquer equipamento indicado pelo Site, seguindo as instruções de segurança e manutenção.\n5.2 Isento o Site de qualquer responsabilidade por danos ou lesões resultantes do uso inadequado de equipamentos.\n\n6. Menores de Idade\n6.1 Caso o praticante seja menor de idade, o responsável legal declara estar ciente dos termos deste documento e assume integralmente a responsabilidade pelos atos do praticante.\n\n7. Aceitação dos Termos\n7.1 Ao utilizar o Site e participar dos programas de exercícios, declaro ter lido, compreendido e aceito todos os termos e condições deste termo de responsabilidade.",
      usuario: userId,
    },
    configuracao
  );
};

export const getPerfis = (configuracao) => {
  return api.get("perfis", configuracao);
};
export const postPerfil = (body, configuracao) => {
  return api.post("perfis", body, configuracao);
};

export const getTiposDeficiencia = (configuracao) => {
  return api.get("tipo_deficiencia", configuracao);
};

export const getUsuarios = (configuracao) => {
  return api.get("usuarios", configuracao);
};

export const getUsuariosById = (userId, configuracao) => {
  return api.get(`usuarios/${userId}`, configuracao);
};

export const postLogin = (username, password) => {
  return api.post("login", {
    username: username,
    password: password,
  });
};

export const getObjetivos = (configuracao) => {
  return api.get("objetivo", configuracao);
};

export const getObjetivosById = (objetivoId, configuracao) => {
  return api.get(`objetivo/${objetivoId}`, configuracao);
};

export const atualizarObjetivo = (objetivoId, objeto, configuracao) => {
  return api.put(`objetivo/${objetivoId}`, objeto, configuracao);
};

export const getTreinosByObjetivos = (objetivo, userId, configuracao) => {
  return api.get(`objetivo/${objetivo}/exercicios/${userId}`, configuracao);
};

export const getMedidas = (configuracao) => {
  return api.get("usuario/medidas", configuracao);
};

export const getLaudos = (configuracao) => {
  return api.get("usuario/laudo", configuracao);
};

export const deleteUserById = (userId, configuracao) => {
  return api.delete(`usuarios/${userId}`, configuracao);
};

export const sendCode = (configuracao) => {
  return api.get("usuarios/send-code", configuracao);
};

export const validateCode = (userId, code, configuracao) => {
  return api.get(`usuarios/${userId}/validateCode?code=${code}`, configuracao);
};

export const postObjetivos = (body, configuracao) => {
  return api.post("objetivo", body, configuracao);
};

export const postExercicio = (body, configuracao) =>{
  return api.post("exercicio", body, configuracao);
}

export const atualizarExercicio = (exercicioId, objeto, configuracao) =>{
  return api.put(`exercicio/${exercicioId}`, objeto, configuracao);
}

export const getExercicioById = (exercicioId, configuracao) =>{
  return api.get(`exercicio/${exercicioId}`, configuracao)
}

export const postDeficiencia = (body, configuracao) => {
  return api.post("tipo_deficiencia", body, configuracao);
};

export const atualizarDeficiencia = (deficienciaId, objeto, configuracao) =>{
  return api.put(`tipo_deficiencia/${deficienciaId}`, objeto, configuracao);
};

export const getDeficiencias = (configuracao) =>{
  return api.get("tipo_deficiencia", configuracao);
}

export const getDeficienciasById = (deficienciaId, configuracao) =>{
  return api.get(`tipo_deficiencia/${deficienciaId}`, configuracao)
}