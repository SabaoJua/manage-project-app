import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { editTask } from '../../../src/network/api/tasks/edit-tasks';

export default function EditarTarefasScreen({ navigation }) {

  const route = useRoute();

  const taskId = route.params.task.id;
  
  const [status, setStatus] = useState(route.params.task.status);
  const [responsavel, setResponsavel] = useState(route.params.task.responsible);

  const handleUpdateTask = async () => {
    try {
      const taskData = {
        status: status,
        responsible: responsavel,
      };

      const result = await editTask(taskId , taskData);
      console.log('Tarefa criada com sucesso:', result);
      alert("Tarefa editada com sucesso")
      navigation.goBack();  
    } catch (error) {
      console.error('Erro ao editar a tarefa:', error);
      alert('Erro ao editar a tarefa. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarefa</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Status</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Backlog" value="backlog" />
          <Picker.Item label="To Do" value="to do" />
          <Picker.Item label="In Progress" value="in progress" />
          <Picker.Item label="Review" value="review" />
          <Picker.Item label="Done" value="done" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Responsável"
        placeholderTextColor="#aaa"
        value={responsavel}
        onChangeText={setResponsavel}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTask}>
        <Text style={styles.saveButtonText}>Salvar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  datePicker: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#0079eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
