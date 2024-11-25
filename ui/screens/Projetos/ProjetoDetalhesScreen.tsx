
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function ProjetoDetalhesScreen({ route, navigation }) {
  const { projeto } = route.params;

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
      <TouchableOpacity
        onPress={() => navigation.navigate('Criar Tarefas')}
        style={styles.botaoAdicionar}
      >
        <AntDesign name="plus" size={32} color="#0079eb" />
      </TouchableOpacity>
        <Text style={styles.sectionTitle}>Tarefas</Text>
        {projeto.tarefas && projeto.tarefas.length > 0 ? (
          projeto.tarefas.map((tarefa, index) => (
            <Text key={index} style={styles.sectionContent}>
              - {tarefa}
            </Text>
          ))
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
 botaoAdicionar: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderWidth: 1,
    borderColor: '#0079eb',
    borderRadius: 16,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

/* import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProjetoDetalhesScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Projeto detalhes</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Criar Tarefas')}
        style={styles.botaoAdicionar}
      >
        <AntDesign name="plus" size={32} color="blue" />
      </TouchableOpacity>
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listaContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  botaoAdicionar: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 16,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
 */