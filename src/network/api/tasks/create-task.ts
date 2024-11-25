
import { config } from "../../../../config";

export const createTask = async (
  id: string,
  task: {
    name: string;
    status: string | 'backlog' | 'todo' | 'in progress' | 'review' | 'done';
    date: string;
    responsible: string;
    tag: string;
  }
) => {
  try {
    const endpoint = `${config.url}api/projects/${id}/tasks`;
    console.log('Enviando dados da tarefa:', JSON.stringify(task));

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    console.log(response)

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro ao criar tarefa - Detalhes:', errorText);
      throw new Error(`Erro ao criar tarefa: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar a tarefa:', error);
    throw error;
  }
};
