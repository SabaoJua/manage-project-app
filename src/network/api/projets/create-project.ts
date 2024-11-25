import { config } from "../../../../config";

export const createProjeto = async (projeto: { name: string; status: string; duration: number }) => {
  try {
    const endpoint = `${config.url}api/projects`;
    console.log('Enviando dados:', JSON.stringify(projeto)); 
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      console.error('Erro ao criar projeto - Detalhes:', errorText);
      throw new Error(`Erro ao criar projeto: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
    throw error;
  }
};
;