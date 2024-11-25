import { config } from "../../../../config";

export const editTask = async (

    id: string,
    task: {
      status: string | 'backlog' | 'to do' | 'in progress' | 'review' | 'done';
      responsible: string;
    }
) => {

    console.log(task.status);
    try {
        const endpointStatus = `${config.url}api/tasks/${id}/status`;
        console.log('Enviando dados da tarefa:', JSON.stringify(task));

        const status = {

            "status": task.status
        };

        const responseStatus = await fetch(endpointStatus, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
        });
        console.log(responseStatus)

        const responsible = {

            "responsible": task.responsible
        };

        const endpointResponsible = `${config.url}api/tasks/${id}/responsible`;
        const responseResponsible = await fetch(endpointResponsible, {

            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(responsible),
        });
        console.log(endpointResponsible);

        if (!responseStatus.ok || !responseResponsible.ok) {
            const errorText = await responseStatus.text();
            console.error('Erro ao editar tarefa - Detalhes:', errorText);
            throw new Error(`Erro ao editar tarefa: ${responseStatus.status}`);
        };

        const data = await responseStatus.json();
        return data;
    } catch (error) {
        console.error('Erro ao criar a tarefa:', error);
        throw error;
    }

};
