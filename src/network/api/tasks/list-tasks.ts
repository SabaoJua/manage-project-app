
import { config } from "../../../../config";

export const listTasks = async (projectId: string) => {
  try {
    const endpoint = `${config.url}api/projects/${projectId}/tasks`;
    console.log("Fetching tasks from:", endpoint);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao buscar tarefas - Detalhes:", errorText);
      throw new Error(`Erro ao buscar tarefas: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error);
    throw error;
  }
};
