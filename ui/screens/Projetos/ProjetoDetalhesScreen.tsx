import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { listTasks } from '../../../src/network/api/tasks/list-tasks';

export default function ProjetoDetalhesScreen({ route, navigation }) {
  const { projeto } = route.params;
  const { id } = projeto; // Recebe o ID do projeto
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
          const fetchAndSetTasks = async () => {
      try {
        console.log("id: ", projeto.id);
        const data = await listTasks(projeto.id);
        setTasks(data.items);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetTasks();
    });
    return unsubscribe;

  }, [id]);;

  const renderTask = ({ item }) => (
    <TouchableOpacity
    onPress={()=>{navigation.navigate('Editar Tarefa', {
      task: item,
    })}}
    >
 <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.name}</Text>
      <Text style={styles.taskTag}>{item.status}</Text>
      <Text style={styles.taskDate}>📅 {item.date}</Text>
      <Text style={styles.taskResponsible}>👤 {item.responsible}</Text>
    </View>     
    </TouchableOpacity>
    
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.projectTitle}>{projeto.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.sectionContent}>
          {projeto.descricao || 'Sem descrição disponível.'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <Text style={styles.status}>{projeto.status || 'Não definido'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsável</Text>
        <Text style={styles.sectionContent}>
          {projeto.responsavel || 'Sem responsável atribuído'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data de Criação</Text>
        <Text style={styles.sectionContent}>
          {projeto.dataCriacao || 'Não definida'}
        </Text>
      </View>

      <View style={styles.section}>
      <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', alignItems:'center'}}>

        <Text style={styles.sectionTitle}>Tarefas</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Criar Tarefas', { projetoId: projeto.id })}
          style={styles.botaoAdicionar}
        >
          <AntDesign name="plus" size={24} color="#0079eb" />
        </TouchableOpacity>
      </View>


        {loading ? (
          <Text style={styles.sectionContent}>Carregando tarefas...</Text>
        ) : tasks.length > 0 ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.taskList}
          />
        ) : (
          <Text style={styles.sectionContent}>Sem tarefas associadas.</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() => navigation.navigate('EditarProjeto', { projeto })}
      >
        <Text style={styles.botaoTexto}>Editar Projeto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  status: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  taskList: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  taskCard: {
    backgroundColor: '#0079eb',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    gap: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  taskTag: {
    fontSize: 14,
    color: '#d1f7ff',
    marginBottom: 8,
  },
  taskDate: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  taskResponsible: {
    fontSize: 14,
    color: '#fff',
  },
  botaoAdicionar: {
    borderWidth: 1,
    borderColor: '#0079eb',
    borderRadius: 16,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  botaoEditar: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
