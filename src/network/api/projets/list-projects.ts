import { config } from "../../../../config";
export const fetchProjetos = async () => {
  try {
    const endpoint = `${config.url}api/projects`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data.reverse(); 
  } catch (error) {
    console.error('Erro ao buscar os projetos:', error);
    throw error; 
  }
};
