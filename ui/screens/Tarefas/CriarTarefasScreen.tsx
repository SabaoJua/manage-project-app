import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function CriarTarefasScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('Backlog');
  const [dataEntrega, setDataEntrega] = useState(new Date());
  const [responsavel, setResponsavel] = useState('');
  const [tag, setTag] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSaveTask = () => {
    console.log({
      nome,
      status,
      dataEntrega: dataEntrega.toLocaleDateString(),
      responsavel,
      tag,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Tarefa</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Tarefa"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Status</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Backlog" value="Backlog" />
          <Picker.Item label="To Do" value="To Do" />
          <Picker.Item label="In Progress" value="In Progress" />
          <Picker.Item label="Review" value="Review" />
          <Picker.Item label="Done" value="Done" />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          Data de Entrega: {dataEntrega.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataEntrega}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDataEntrega(selectedDate);
            }
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Responsável"
        placeholderTextColor="#aaa"
        value={responsavel}
        onChangeText={setResponsavel}
      />

      <TextInput
        style={styles.input}
        placeholder="Tag (ex: urgente, design)"
        placeholderTextColor="#aaa"
        value={tag}
        onChangeText={setTag}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
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
